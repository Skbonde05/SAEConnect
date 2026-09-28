-- ==============================================================================
-- SINHGAD PLACEMENT HUB (SPH) - SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. PROFILES TABLE (User information, PRN, branch, role)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  prn TEXT UNIQUE,
  role TEXT DEFAULT 'student',
  branch TEXT,
  graduation_year TEXT,
  company TEXT,
  job_role TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 2. EXPERIENCES TABLE (Interview experiences shared by students & alumni)
CREATE TABLE IF NOT EXISTS public.experiences (
  id TEXT PRIMARY KEY,
  company TEXT NOT NULL,
  company_logo TEXT,
  role TEXT NOT NULL,
  status TEXT NOT NULL,
  year TEXT DEFAULT '2024',
  rounds_count INTEGER DEFAULT 3,
  review TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  author_name TEXT DEFAULT 'Anonymous',
  author_branch TEXT DEFAULT 'Computer Engineering',
  author_batch TEXT DEFAULT 'Batch 2024',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  likes INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for experiences
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;

-- Experiences Policies
CREATE POLICY "Anyone can read experiences" 
ON public.experiences FOR SELECT 
USING (true);

CREATE POLICY "Anyone authenticated can create experiences" 
ON public.experiences FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own experiences or likes" 
ON public.experiences FOR UPDATE 
USING (true);

-- 3. QUESTIONS / DOUBTS TABLE (Community Q&A)
CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  question_text TEXT NOT NULL,
  company TEXT,
  author_name TEXT DEFAULT 'Anonymous',
  author_branch TEXT DEFAULT 'Computer Engineering',
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  upvotes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for questions
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read questions" 
ON public.questions FOR SELECT 
USING (true);

CREATE POLICY "Anyone can submit questions" 
ON public.questions FOR INSERT 
WITH CHECK (true);

-- ==============================================================================
-- INITIAL SAMPLE DATA (Optional: Insert some sample experiences)
-- ==============================================================================

INSERT INTO public.experiences (id, company, company_logo, role, status, year, rounds_count, review, tags, author_name, author_branch, author_batch, likes, comments_count)
VALUES 
  ('exp-1', 'TCS', 'tcs', 'Software Developer', 'Selected', '2024', 3, 'Aptitude was moderate, technical round focused on DSA and OOP. HR was friendly.', ARRAY['DSA', 'OOP', 'Aptitude'], 'Aarav Patil', 'Computer Engineering', 'Batch 2024', 24, 5),
  ('exp-2', 'Infosys', 'infosys', 'Specialist Programmer', 'Selected', '2024', 4, 'HackWithInfy route: 2 coding questions on dynamic programming. Interview tested system design and SQL joins.', ARRAY['DP', 'SQL', 'HackWithInfy'], 'Rohan Deshmukh', 'IT', 'Batch 2024', 31, 8),
  ('exp-3', 'Accenture', 'accenture', 'Associate Software Engineer', 'Selected', '2024', 3, 'Cognitive and tech assessment was key. Technical interview asked basics of cloud and web development.', ARRAY['Cloud', 'Web', 'Cognitive'], 'Sneha Kulkarni', 'AIDS', 'Batch 2024', 19, 3)
ON CONFLICT (id) DO NOTHING;

-- ==============================================================================
-- 4. NEWSLETTER SUBSCRIBERS (Footer "Stay Updated" form)
-- Referenced by src/components/Footer.tsx
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Only INSERT is needed. Anon-key visitors submit the form before signing in,
-- so the insert policy is intentionally open; reading the list is not.
CREATE POLICY "Anyone can subscribe to the newsletter"
  ON public.newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- ==============================================================================
-- PRN LOGIN LOOKUP  (REQUIRED — src/lib/supabase.ts calls this via supabase.rpc)
--
-- The login screen accepts an email OR a PRN. Supabase auth only understands
-- email, so the PRN is resolved to an email through this SECURITY DEFINER
-- function. Without it, every PRN login fails with
-- "No account found with PRN ...".
--
-- SECURITY: the function is SECURITY DEFINER and returns ONLY the email
-- string. It is not granted to `anon` directly — `authenticated` is enough,
-- and it deliberately exposes no other profile columns.
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.get_email_by_prn(prn_input TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  found_email TEXT;
BEGIN
  IF prn_input IS NULL OR btrim(prn_input) = '' THEN
    RETURN NULL;
  END IF;

  SELECT lower(p.email) INTO found_email
  FROM public.profiles p
  WHERE lower(p.prn) = lower(btrim(prn_input))
  LIMIT 1;

  RETURN found_email;
END;
$$;

-- Allow signed-in users to resolve their PRN to an email address.
-- Remove the anon grant if you want PRN login to require a prior session.
GRANT EXECUTE ON FUNCTION public.get_email_by_prn(TEXT) TO authenticated;

-- Also expose it to the PostgREST schema cache.
COMMENT ON FUNCTION public.get_email_by_prn(TEXT) IS
  'Resolves a student PRN to its registered email for Supabase password login. Returns NULL when unknown.';

-- ==============================================================================
-- AUTH STATE HELPER  (sign out users whose profile was deleted)
-- Optional but recommended: keeps auth.users rows tidy.
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'fullName', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data ->> 'role', 'student')
  )
  ON CONFLICT (id) DO UPDATE
    SET email = EXCLUDED.email,
        updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

