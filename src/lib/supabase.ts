import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* =====================================================
   ENVIRONMENT CREDENTIALS

   Supabase renamed the browser-safe anon key to a
   "publishable key" (sb_publishable_...). Both names are
   accepted so older .env files keep working.
   ===================================================== */
const envSupabaseUrl = import.meta.env.VITE_SUPABASE_URL as
  | string
  | undefined;

const envSupabaseKey =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ??
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined);

// Placeholder values keep the client constructible when the project has
// not been configured yet, so the offline/demo fallback stays reachable
// instead of crashing at module load.
const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_KEY = "sb_publishable_placeholder_key";

/** True only when real, usable Supabase credentials are present. */
export const isSupabaseConfigured = Boolean(
  envSupabaseUrl &&
    envSupabaseKey &&
    envSupabaseUrl.startsWith("https://") &&
    !envSupabaseUrl.includes("your-project-id") &&
    envSupabaseKey !== PLACEHOLDER_KEY
);

if (!isSupabaseConfigured) {
  console.warn(
    "[supabase] VITE_SUPABASE_URL / key not configured — running in offline demo mode. " +
      "Copy .env.example to .env and fill in your project credentials to enable Supabase."
  );
}

/**
 * Supabase client.
 *
 * NOTE: createClient() throws when given an empty URL, so we always pass a
 * syntactically valid placeholder. Every call site must check
 * `isSupabaseConfigured` first (or handle a rejected promise) before talking
 * to the network.
 */
export const supabase: SupabaseClient = createClient(
  envSupabaseUrl && envSupabaseUrl.startsWith("https://")
    ? envSupabaseUrl
    : PLACEHOLDER_URL,
  envSupabaseKey || PLACEHOLDER_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  prn?: string;
  role: "student" | "alumni" | "faculty";
  branch?: string;
  graduationYear?: string;
  company?: string;
  avatarUrl?: string;
}

export interface DbExperience {
  id: string;
  company: string;
  companyLogo?: string;
  role: string;
  status: "Selected" | "Interview Completed" | "Rejected";
  year: string;
  roundsCount: number;
  review: string;
  tags: string[];
  authorName: string;
  authorBranch: string;
  authorBatch: string;
  likes: number;
  commentsCount: number;
  createdAt?: string;
}

export interface DbQuestion {
  id: string;
  questionText: string;
  company?: string;
  authorName: string;
  authorBranch: string;
  createdAt?: string;
}

/* =====================================================
   LOCAL STORAGE FALLBACK HELPERS (Seamless offline/demo mode)
===================================================== */
const LOCAL_STORAGE_SESSION_KEY = "sph_active_session";
const LOCAL_STORAGE_USERS_KEY = "sph_registered_users";
const LOCAL_STORAGE_EXPERIENCES_KEY = "sph_experiences";
const LOCAL_STORAGE_QUESTIONS_KEY = "sph_questions";

function getLocalUsers(): UserProfile[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalUsers(users: UserProfile[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Failed to save local users:", err);
  }
}

/* =====================================================
   AUTH FUNCTIONS
===================================================== */

/**
 * Check if a session already exists (either from Supabase or local storage fallback)
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  if (isSupabaseConfigured) {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error || !session?.user) {
        return null;
      }

      // Fetch profile from profiles table if available
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profile) {
        return {
          id: profile.id,
          email: profile.email || session.user.email || "",
          fullName:
            profile.full_name ||
            session.user.user_metadata?.fullName ||
            "Sinhgad Student",
          prn: profile.prn || session.user.user_metadata?.prn,
          role:
            profile.role || session.user.user_metadata?.role || "student",
          branch: profile.branch || session.user.user_metadata?.branch,
          graduationYear:
            profile.graduation_year ||
            session.user.user_metadata?.graduationYear,
          company: profile.company || session.user.user_metadata?.company,
        };
      }

      return {
        id: session.user.id,
        email: session.user.email || "",
        fullName:
          session.user.user_metadata?.fullName ||
          session.user.email?.split("@")[0] ||
          "Sinhgad Student",
        prn: session.user.user_metadata?.prn,
        role: session.user.user_metadata?.role || "student",
        branch: session.user.user_metadata?.branch,
        graduationYear: session.user.user_metadata?.graduationYear,
        company: session.user.user_metadata?.company,
      };
    } catch (e) {
      console.warn("Supabase auth check failed:", e);
      return null;
    }
  } else {
    // Local demo / fallback mode
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}
    return null;
  }
}

/**
 * Sign in using Email or PRN + Password.
 *
 * SECURITY NOTE:
 * When the identifier is a PRN (no "@"), we do NOT query the `profiles`
 * table directly. Instead we call a SECURITY DEFINER Postgres function
 * `get_email_by_prn(text)` which runs on the server and returns ONLY the
 * email string — no other columns are exposed.
 *
 * The user-facing login is the officially documented method:
 *   supabase.auth.signInWithPassword({ email, password })
 */
export async function signInUser(
  emailOrPrn: string,
  password: string
): Promise<{ user: UserProfile | null; error: string | null }> {
  const trimmed = emailOrPrn.trim();

  if (isSupabaseConfigured) {
    try {
      let emailToUse = trimmed;

      /* --------------------------------------------------
         PRN path → resolve email via secure RPC
      -------------------------------------------------- */
      if (!trimmed.includes("@")) {
        const { data: resolvedEmail, error: rpcError } = await supabase.rpc(
          "get_email_by_prn",
          { prn_input: trimmed }
        );

        if (rpcError) {
          // The function is shipped in supabase-schema.sql. If it is missing
          // the deployment has not been applied yet.
          console.error("get_email_by_prn RPC failed:", rpcError);
          return {
            user: null,
            error: `PRN login is unavailable right now (${rpcError.message}). Please sign in with your email address instead.`,
          };
        }

        if (!resolvedEmail) {
          return {
            user: null,
            error: `No account found with PRN "${trimmed}". Please use your registered email or register first.`,
          };
        }

        emailToUse = resolvedEmail as string;
      }

      /* --------------------------------------------------
         The official Supabase password login call
      -------------------------------------------------- */
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailToUse,
        password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (!data.user) {
        return {
          user: null,
          error: "Failed to sign in. Please verify your credentials.",
        };
      }

      /* --------------------------------------------------
         Hydrate profile (RLS may return null — fall back
         to the auth user's metadata)
      -------------------------------------------------- */
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .maybeSingle();

      const meta = data.user.user_metadata ?? {};

      const userProfile: UserProfile = {
        id: data.user.id,
        email: data.user.email || emailToUse,
        fullName:
          profile?.full_name || meta.fullName || emailToUse.split("@")[0],
        prn: profile?.prn || meta.prn,
        role: (profile?.role || meta.role || "student") as UserProfile["role"],
        branch: profile?.branch || meta.branch,
        graduationYear: profile?.graduation_year || meta.graduationYear,
        company: profile?.company || meta.company,
      };

      return { user: userProfile, error: null };
    } catch (err: any) {
      return {
        user: null,
        error: err.message || "An unexpected error occurred during sign in.",
      };
    }
  } else {
    // Local offline/demo mode
    const users = getLocalUsers();
    let found = users.find(
      (u) =>
        u.email.toLowerCase() === trimmed.toLowerCase() ||
        (u.prn && u.prn.toLowerCase() === trimmed.toLowerCase())
    );

    if (!found) {
      // Create a default session for demo/offline testing
      const isEmail = trimmed.includes("@");
      found = {
        id: "demo-user-" + Date.now(),
        email: isEmail ? trimmed : `${trimmed.toLowerCase()}@sinhgad.edu`,
        fullName: isEmail
          ? trimmed.split("@")[0].toUpperCase()
          : `Student (${trimmed})`,
        prn: isEmail ? "72109823B" : trimmed,
        role: "student",
        branch: "Computer Engineering",
        graduationYear: "2025",
      };
      users.push(found);
      saveLocalUsers(users);
    }

    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(found));
    return { user: found, error: null };
  }
}

/**
 * Sign up a new user with full details & store in Supabase.
 *
 * IMPORTANT (email confirmation):
 * - If Supabase has email confirmation ENABLED, signUp() succeeds but
 *   `session` is null. We must NOT log the user in that case. Instead we
 *   return the sentinel error "ACCOUNT_CREATED_VERIFY_EMAIL" so the UI can
 *   display a "verify your email" screen.
 * - If email confirmation is DISABLED, `session` is populated and we return
 *   the user profile normally.
 */
export async function signUpUser(data: {
  fullName: string;
  email: string;
  password: string;
  role: string;
  branch: string;
  year?: string;
  graduationYear?: string;
  prn?: string;
  designation?: string;
  employeeId?: string;
  officialEmail?: string;
  company?: string;
  jobRole?: string;
  industry?: string;
  linkedin?: string;
}): Promise<{ user: UserProfile | null; error: string | null }> {
  if (isSupabaseConfigured) {
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            emailRedirectTo: window.location.origin,

            // ✅ All registration fields stored as user_metadata
            data: {
              fullName: data.fullName,
              role: data.role,
              branch: data.branch,
              year: data.year,
              graduationYear: data.graduationYear,
              prn: data.prn,
              company: data.company,
              jobRole: data.jobRole,
              industry: data.industry,
              linkedin: data.linkedin,
              designation: data.designation,
              employeeId: data.employeeId,
              officialEmail: data.officialEmail,
            },
          },
        });

      if (authError) {
        return { user: null, error: authError.message };
      }

      /* ==================================================
         EMAIL VERIFICATION REQUIRED
         Supabase created the user, but no session exists yet.
         We must NOT log the user in.
      ================================================== */
      if (authData.user && !authData.session) {
        // Best-effort: try to create the profile row if the schema
        // allows inserts without a session (RLS may block it — the
        // metadata on the auth user is the source of truth).
        try {
          await supabase.from("profiles").upsert({
            id: authData.user.id,
            email: data.email,
            full_name: data.fullName,
            role: data.role,
            branch: data.branch,
            prn: data.prn || null,
            graduation_year: data.graduationYear || data.year || null,
            company: data.company || null,
            job_role: data.jobRole || null,
            created_at: new Date().toISOString(),
          });
        } catch (dbErr) {
          console.warn(
            "Could not pre-insert profile row (RLS may block unverified users):",
            dbErr
          );
        }

        return {
          user: null,
          error: "ACCOUNT_CREATED_VERIFY_EMAIL",
        };
      }

      /* ==================================================
         SIGNUP SUCCEEDED WITH SESSION
         (email confirmation is OFF)
      ================================================== */
      const userId = authData.user?.id;
      if (userId) {
        try {
          await supabase.from("profiles").upsert({
            id: userId,
            email: data.email,
            full_name: data.fullName,
            role: data.role,
            branch: data.branch,
            prn: data.prn || null,
            graduation_year: data.graduationYear || data.year || null,
            company: data.company || null,
            job_role: data.jobRole || null,
            created_at: new Date().toISOString(),
          });
        } catch (dbErr) {
          console.warn(
            "Could not insert profile record (table might not exist yet):",
            dbErr
          );
        }
      }

      const userProfile: UserProfile = {
        id: userId || `user-${Date.now()}`,
        email: data.email,
        fullName: data.fullName,
        prn: data.prn,
        role: (data.role as any) || "student",
        branch: data.branch,
        graduationYear: data.graduationYear || data.year,
        company: data.company,
      };

      return { user: userProfile, error: null };
    } catch (err: any) {
      return {
        user: null,
        error: err.message || "Failed to create account.",
      };
    }
  } else {
    // Local offline/demo mode — always "succeeds" and logs in
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      email: data.email,
      fullName: data.fullName,
      prn: data.prn,
      role: (data.role as any) || "student",
      branch: data.branch,
      graduationYear: data.graduationYear || data.year,
      company: data.company,
    };

    const users = getLocalUsers();
    users.push(newUser);
    saveLocalUsers(users);
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(newUser));

    return { user: newUser, error: null };
  }
}

/**
 * Sign out user
 */
export async function signOutUser(): Promise<void> {
  if (isSupabaseConfigured) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("Supabase sign out error:", e);
    }
  }
  try {
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
  } catch {}
}

/* =====================================================
   PASSWORD RESET
===================================================== */

/**
 * Sends a password reset email via Supabase.
 *
 * The email link returns the user to `${origin}/reset-password` with a
 * recovery token in the URL. Supabase's client auto-detects it
 * (detectSessionInUrl: true) and establishes a temporary session that
 * `updateUser()` can then use to change the password.
 */
export async function sendPasswordResetEmail(
  email: string
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured) {
    return {
      error:
        "Password reset is unavailable in offline/demo mode. Configure Supabase to enable it.",
    };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) return { error: error.message };
    return { error: null };
  } catch (err: any) {
    return { error: err.message || "Failed to send reset email." };
  }
}

/**
 * Sets a new password for the currently authenticated user.
 *
 * Must be called AFTER the user has landed on /reset-password and
 * Supabase has established the temporary recovery session.
 */
export async function updatePassword(
  newPassword: string
): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured) {
    return {
      error: "Password update is unavailable in offline/demo mode.",
    };
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) return { error: error.message };
    return { error: null };
  } catch (err: any) {
    return { error: err.message || "Failed to update password." };
  }
}

/**
 * Convenience helper: is the current URL a recovery link?
 * Supabase sets `type=recovery` when the user arrives from a reset email.
 */
export function isRecoveryFlow(): boolean {
  if (typeof window === "undefined") return false;
  const hash = window.location.hash || "";
  const search = window.location.search || "";
  return hash.includes("type=recovery") || search.includes("type=recovery");
}

/* =====================================================
   DATABASE FUNCTIONS (Experiences & Questions)
===================================================== */

/**
 * Fetch experiences from Supabase table or local storage
 */
export async function getDbExperiences(): Promise<DbExperience[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          company: row.company,
          companyLogo: row.company_logo || row.company?.toLowerCase(),
          role: row.role,
          status: row.status,
          year: row.year || "2024",
          roundsCount: row.rounds_count || 3,
          review: row.review,
          tags: Array.isArray(row.tags) ? row.tags : [],
          authorName: row.author_name || "Anonymous",
          authorBranch: row.author_branch || "Computer Engineering",
          authorBatch: row.author_batch || "Batch 2024",
          likes: row.likes || 0,
          commentsCount: row.comments_count || 0,
          createdAt: row.created_at,
        }));
      }
    } catch (e) {
      console.warn("Failed to fetch experiences from Supabase:", e);
    }
  }

  // Fallback to local storage or empty
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_EXPERIENCES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

/** Uniform result shape for write operations. */
export interface SaveResult {
  /** True when the row reached Supabase. */
  persisted: boolean;
  /** True when the row was at least cached locally for offline use. */
  cached: boolean;
  error: string | null;
}

/**
 * Save an experience to Supabase.
 *
 * Always mirrors the row into local storage so the UI stays consistent while
 * offline, and reports the Supabase error instead of swallowing it.
 */
export async function saveDbExperience(
  exp: DbExperience
): Promise<SaveResult> {
  let persisted = false;
  let error: string | null = null;

  if (isSupabaseConfigured) {
    try {
      const { error: insertError } = await supabase
        .from("experiences")
        .insert({
          id: exp.id,
          company: exp.company,
          company_logo: exp.companyLogo,
          role: exp.role,
          status: exp.status,
          year: exp.year,
          rounds_count: exp.roundsCount,
          review: exp.review,
          tags: exp.tags,
          author_name: exp.authorName,
          author_branch: exp.authorBranch,
          author_batch: exp.authorBatch,
          likes: exp.likes,
          comments_count: exp.commentsCount,
        });

      if (insertError) {
        error = insertError.message;
        console.warn("Could not insert experience into Supabase:", error);
      } else {
        persisted = true;
      }
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      console.warn("Could not insert experience into Supabase:", e);
    }
  } else {
    error = "Supabase is not configured — saved to this browser only.";
  }

  // Also cache locally
  let cached = false;
  try {
    const list = await getDbExperiences();
    const updated = [exp, ...list.filter((x) => x.id !== exp.id)];
    localStorage.setItem(LOCAL_STORAGE_EXPERIENCES_KEY, JSON.stringify(updated));
    cached = true;
  } catch (e) {
    console.warn("Could not cache experience locally:", e);
  }

  return { persisted, cached, error };
}

/**
 * Save a question to Supabase.
 *
 * Reports the real outcome so the UI does not claim success when the insert
 * was rejected by RLS or the network.
 */
export async function saveDbQuestion(q: DbQuestion): Promise<SaveResult> {
  let persisted = false;
  let error: string | null = null;

  if (isSupabaseConfigured) {
    try {
      const { error: insertError } = await supabase.from("questions").insert({
        id: q.id,
        question_text: q.questionText,
        company: q.company ?? null,
        author_name: q.authorName,
        author_branch: q.authorBranch,
      });

      if (insertError) {
        error = insertError.message;
        console.warn("Could not insert question into Supabase:", error);
      } else {
        persisted = true;
      }
    } catch (e) {
      error = e instanceof Error ? e.message : String(e);
      console.warn("Could not insert question into Supabase:", e);
    }
  } else {
    error = "Supabase is not configured — saved to this browser only.";
  }

  let cached = false;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_QUESTIONS_KEY);
    const list: DbQuestion[] = raw ? JSON.parse(raw) : [];
    list.unshift(q);
    localStorage.setItem(LOCAL_STORAGE_QUESTIONS_KEY, JSON.stringify(list));
    cached = true;
  } catch (e) {
    console.warn("Could not cache question locally:", e);
  }

  return { persisted, cached, error };
}

/* =====================================================
   SESSION SYNC
   ===================================================== */

/**
 * Subscribe to Supabase auth-state changes.
 *
 * Needed so sign-out / token expiry / cross-tab sign-in is reflected in the
 * UI without a page reload. Returns an unsubscribe function that is safe to
 * call even when Supabase is not configured.
 */
export function onAuthStateChange(
  handler: (event: string, userId: string | null) => void
): () => void {
  if (!isSupabaseConfigured) {
    return () => {};
  }

  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    handler(event, session?.user?.id ?? null);
  });

  return () => {
    data.subscription.unsubscribe();
  };
}