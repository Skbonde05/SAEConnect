import { useState, useMemo, useEffect, type FormEvent } from "react";
import {
  Search,
  Building2,
  Users,
  FileText,
  Star,
  BookOpen,
  PenTool,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  Calendar,
  Heart,
  MessageCircle,
  X,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ChevronRight,
  Layers,
  Send,
  AlertTriangle,
} from "lucide-react";
import Navbar, { type NavTab, type UserProfile } from "./Navbar";
import Footer from "./Footer";
import ExperiencesPage from "./Experiences";
import Companies from "./Companies";
import InsightsPage from "./Insights";
import AboutPage from "./About";
import AsknShare from "./AsknShare";
import {
  getDbExperiences,
  saveDbExperience,
  saveDbQuestion,
  isSupabaseConfigured,
  supabase,
} from "../lib/supabase";

/* =====================================================
   TYPES & INTERFACES
===================================================== */

export interface ExperienceItem {
  id: string;
  company: string;
  companyLogo: "tcs" | "infosys" | "accenture" | "persistent" | "capgemini" | "wipro" | "cognizant" | "hcl";
  role: string;
  status: "Selected" | "Interview Completed" | "Rejected";
  year: string;
  roundsCount: number;
  review: string;
  tags: string[];
  author: {
    name: string;
    branch: string;
    batch: string;
  };
  likes: number;
  commentsCount: number;
}

interface HomeDashboardProps {
  onNavigateTab?: (tab: NavTab) => void;
  user?: UserProfile | null;
  onLogout?: () => void;
}

/* =====================================================
   COMPANY LOGOS (Clean SVGs)
===================================================== */

export const CompanyLogo = ({
  name,
  className = "h-7 w-auto",
}: {
  name: string;
  className?: string;
}) => {
  const normalized = name.toLowerCase();

  if (normalized.includes("tcs")) {
    return (
      <div className={`flex items-center gap-1 font-bold ${className}`}>
        <span className="text-[#e21836] font-black text-xl tracking-tight">tcs</span>
      </div>
    );
  }

  if (normalized.includes("infosys")) {
    return (
      <div className={`flex items-center font-bold text-[#007cc3] text-xl tracking-tight ${className}`}>
        Infosys
      </div>
    );
  }

  if (normalized.includes("accenture")) {
    return (
      <div className={`flex items-center gap-1 font-bold text-[#ffffff] text-lg tracking-tight ${className}`}>
        <span className="text-[#a100ff] font-extrabold text-xl">&gt;</span>
        <span className="font-semibold text-white">accenture</span>
      </div>
    );
  }

  if (normalized.includes("persistent")) {
    return (
      <div className={`flex items-center gap-1 font-semibold text-[#ffffff] ${className}`}>
        <div className="w-5 h-5 rounded-full border-2 border-[#f37021] border-t-transparent animate-spin-slow flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#009fda]" />
        </div>
        <span className="text-sm font-medium text-[#ffffff]">Persistent</span>
      </div>
    );
  }

  if (normalized.includes("capgemini")) {
    return (
      <div className={`flex items-center gap-1.5 font-bold ${className}`}>
        <svg className="w-5 h-5 text-[#0070ad] fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-5.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z" />
        </svg>
        <span className="text-[#ffffff] text-sm font-semibold">Capgemini</span>
      </div>
    );
  }

  if (normalized.includes("wipro")) {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <div className="flex -space-x-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ec1c24]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f68b1f]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#7ac143]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#00a8b5]" />
        </div>
        <span className="text-[#ffffff] text-sm font-semibold tracking-wide">wipro</span>
      </div>
    );
  }

  if (normalized.includes("cognizant")) {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        <div className="w-4 h-4 rounded-full border-2 border-[#0066cc] border-r-transparent flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#1db954]" />
        </div>
        <span className="text-[#ffffff] text-sm font-semibold">Cognizant</span>
      </div>
    );
  }

  if (normalized.includes("hcl")) {
    return (
      <div className={`flex items-center font-black italic text-[#006699] text-lg tracking-widest ${className}`}>
        HCL
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 font-bold text-[#ffffff] text-sm ${className}`}>
      <Building2 className="w-4 h-4 text-[#c9a227]" />
      <span>{name}</span>
    </div>
  );
};

/* =====================================================
   INITIAL MOCK EXPERIENCES
===================================================== */

const initialExperiences: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "TCS",
    companyLogo: "tcs",
    role: "Software Developer",
    status: "Selected",
    year: "2024",
    roundsCount: 3,
    review:
      "Aptitude was moderate, technical round focused on DSA and OOP. HR was friendly.",
    tags: ["DSA", "OOP", "Aptitude"],
    author: {
      name: "Anonymous",
      branch: "CSE",
      batch: "Batch 2024",
    },
    likes: 24,
    commentsCount: 5,
  },
  {
    id: "exp-2",
    company: "Infosys",
    companyLogo: "infosys",
    role: "System Engineer",
    status: "Interview Completed",
    year: "2024",
    roundsCount: 3,
    review:
      "Questions were mostly from core CS subjects. Good experience overall.",
    tags: ["DBMS", "CN", "Aptitude"],
    author: {
      name: "Anonymous",
      branch: "ENTC",
      batch: "Batch 2024",
    },
    likes: 18,
    commentsCount: 3,
  },
  {
    id: "exp-3",
    company: "Accenture",
    companyLogo: "accenture",
    role: "Application Developer",
    status: "Rejected",
    year: "2024",
    roundsCount: 4,
    review:
      "Technical round was tricky. Focus more on problem-solving and system design.",
    tags: ["DSA", "System Design", "DBMS"],
    author: {
      name: "Anonymous",
      branch: "IT",
      batch: "Batch 2024",
    },
    likes: 32,
    commentsCount: 7,
  },
];

const popularCompaniesList = [
  { name: "TCS", label: "TCS", logo: "tcs", count: "120+ Experiences" },
  { name: "Infosys", label: "Infosys", logo: "infosys", count: "95+ Experiences" },
  { name: "Accenture", label: "Accenture", logo: "accenture", count: "80+ Experiences" },
  { name: "Persistent", label: "Persistent", logo: "persistent", count: "55+ Experiences" },
  { name: "Capgemini", label: "Capgemini", logo: "capgemini", count: "48+ Experiences" },
  { name: "Wipro", label: "Wipro", logo: "wipro", count: "62+ Experiences" },
  { name: "Cognizant", label: "Cognizant", logo: "cognizant", count: "40+ Experiences" },
  { name: "HCL", label: "HCL", logo: "hcl", count: "35+ Experiences" },
];

/* =====================================================
   MAIN HOME DASHBOARD COMPONENT
===================================================== */

export default function HomeDashboard({
  onNavigateTab,
  user,
  onLogout,
}: HomeDashboardProps) {
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilterTag, setSelectedFilterTag] = useState<string | null>(null);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(initialExperiences);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Fetch initial experiences from Supabase database
  useEffect(() => {
    getDbExperiences().then((dbList) => {
      if (dbList && dbList.length > 0) {
        const mapped: ExperienceItem[] = dbList.map((db) => ({
          id: db.id,
          company: db.company,
          companyLogo: (db.companyLogo || "tcs") as any,
          role: db.role,
          status: db.status,
          year: db.year,
          roundsCount: db.roundsCount,
          review: db.review,
          tags: db.tags,
          author: {
            name: db.authorName,
            branch: db.authorBranch,
            batch: db.authorBatch,
          },
          likes: db.likes,
          commentsCount: db.commentsCount,
        }));
        setExperiences((prev) => {
          const ids = new Set(mapped.map((m) => m.id));
          const rest = prev.filter((p) => !ids.has(p.id));
          return [...mapped, ...rest];
        });
      }
    });
  }, []);

  // Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);

  // Submit / persistence feedback
  const [isSubmittingExperience, setIsSubmittingExperience] = useState(false);
  const [formNotice, setFormNotice] = useState<string | null>(null);

  // New Experience Form State
  const [newExpCompany, setNewExpCompany] = useState("");
  const [newExpRole, setNewExpRole] = useState("");
  const [newExpStatus, setNewExpStatus] = useState<"Selected" | "Interview Completed" | "Rejected">("Selected");
  const [newExpRounds, setNewExpRounds] = useState(3);
  const [newExpReview, setNewExpReview] = useState("");
  const [newExpBranch, setNewExpBranch] = useState("Computer Engineering");
  const [newExpTags, setNewExpTags] = useState("DSA, System Design");

  // Question Form State
  const [questionText, setQuestionText] = useState("");
  const [questionCompany, setQuestionCompany] = useState("");
  const [questionSubmitted, setQuestionSubmitted] = useState(false);


  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    onNavigateTab?.(tab);
  };

  const handleToggleLike = async (id: string) => {
    // The delta must be computed outside the updater. React StrictMode
    // double-invokes updater functions in development, so calling
    // setExperiences() from inside setLikedMap()'s updater incremented the
    // like count twice.
    const delta = likedMap[id] ? -1 : 1;

    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
    setExperiences((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, likes: Math.max(0, item.likes + delta) }
          : item
      )
    );

    // Persist the new total so the count survives a reload.
    const nextLikes = experiences.find((e) => e.id === id);
    if (nextLikes) {
      const updated = nextLikes.likes + delta;
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from("experiences")
          .update({ likes: Math.max(0, updated) })
          .eq("id", id);
        if (error) console.warn("Could not persist like:", error.message);
      }
    }
  };

  /** The search box filters the "Recent Experiences" list further down the
   *  page, so committing the query also brings that list into view. */
  const handleSearch = (term: string) => {
    setSearchQuery(term);
    setSelectedFilterTag(null);
    document
      .getElementById("recent-experiences")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleTagClick = (tag: string) => {
    if (selectedFilterTag === tag) {
      setSelectedFilterTag(null);
    } else {
      setSelectedFilterTag(tag);
      setSearchQuery("");
    }
  };

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        exp.company.toLowerCase().includes(q) ||
        exp.role.toLowerCase().includes(q) ||
        exp.review.toLowerCase().includes(q) ||
        exp.tags.some((t) => t.toLowerCase().includes(q));

      const matchesTag =
        !selectedFilterTag ||
        exp.company.toLowerCase() === selectedFilterTag.toLowerCase() ||
        exp.tags.some((t) => t.toLowerCase() === selectedFilterTag.toLowerCase());

      return matchesSearch && matchesTag;
    });
  }, [experiences, searchQuery, selectedFilterTag]);

  const handleShareSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newExpCompany || !newExpRole || !newExpReview) return;

    setIsSubmittingExperience(true);
    setFormNotice(null);

    const logoKey = (newExpCompany.toLowerCase().includes("tcs")
      ? "tcs"
      : newExpCompany.toLowerCase().includes("infosys")
        ? "infosys"
        : newExpCompany.toLowerCase().includes("accenture")
          ? "accenture"
          : newExpCompany.toLowerCase().includes("persistent")
            ? "persistent"
            : newExpCompany.toLowerCase().includes("capgemini")
              ? "capgemini"
              : newExpCompany.toLowerCase().includes("wipro")
                ? "wipro"
                : "tcs") as ExperienceItem["companyLogo"];

    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      company: newExpCompany,
      companyLogo: logoKey,
      role: newExpRole,
      status: newExpStatus,
      year: String(new Date().getFullYear()),
      roundsCount: Number(newExpRounds) || 3,
      review: newExpReview,
      tags: newExpTags.split(",").map((s) => s.trim()).filter(Boolean),
      author: {
        name: user?.fullName || "Anonymous Student",
        branch: user?.branch || newExpBranch,
        batch: "Batch 2024",
      },
      likes: 0,
      commentsCount: 0,
    };

    // Save to Supabase backend
    const { persisted, error } = await saveDbExperience({
      id: newExp.id,
      company: newExp.company,
      companyLogo: newExp.companyLogo,
      role: newExp.role,
      status: newExp.status,
      year: newExp.year,
      roundsCount: newExp.roundsCount,
      review: newExp.review,
      tags: newExp.tags,
      authorName: newExp.author.name,
      authorBranch: newExp.author.branch,
      authorBatch: newExp.author.batch,
      likes: 0,
      commentsCount: 0,
    });

    setIsSubmittingExperience(false);

    if (!persisted) {
      setFormNotice(
        error
          ? `Could not save to the server: ${error}`
          : "Could not save to the server. Your post is visible in this browser only."
      );
    }

    setExperiences((prev) => [newExp, ...prev]);
    setIsShareModalOpen(false);
    // Reset form
    setNewExpCompany("");
    setNewExpRole("");
    setNewExpReview("");
  };

  const handleQuestionSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!questionText) return;

    setFormNotice(null);

    // Save to Supabase backend
    const { persisted, error } = await saveDbQuestion({
      id: `q-${Date.now()}`,
      questionText,
      company: questionCompany || undefined,
      authorName: user?.fullName || "Anonymous Student",
      authorBranch: user?.branch || "Computer Engineering",
    });

    if (!persisted) {
      setFormNotice(
        error
          ? `Could not post your question: ${error}`
          : "Could not post your question to the server."
      );
    }

    setQuestionSubmitted(true);
    setTimeout(() => {
      setQuestionSubmitted(false);
      setIsQuestionModalOpen(false);
      setQuestionText("");
      setQuestionCompany("");
    }, 1800);
  };


  /* Render Sub-Pages based on activeTab */
  if (activeTab === "experiences") {
    return (
      <ExperiencesPage
        onNavigate={handleTabChange}
        user={user}
        onLogout={onLogout}
        onShareExperience={() => {
          setActiveTab("home");
          setIsShareModalOpen(true);
        }}
      />
    );
  }

  if (activeTab === "companies") {
    return (
      <Companies
        onNavigate={handleTabChange}
        user={user}
        onLogout={onLogout}
        onViewCompany={(slug) => {
          console.log("Viewing company details:", slug);
        }}
      />
    );
  }

  if (activeTab === "insights") {
    return (
      <InsightsPage
        onNavigate={handleTabChange}
        user={user}
        onLogout={onLogout}
      />
    );
  }

  if (activeTab === "about") {
    return (
      <AboutPage
        onNavigate={handleTabChange}
        user={user}
        onLogout={onLogout}
      />
    );
  }

  if (activeTab === "ask-share") {
    return (
      <AsknShare
        onNavigate={handleTabChange}
        user={user}
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-canvas text-slate-900 flex flex-col font-sans selection:bg-[#c9a227] selection:text-[#0f2747]">
      {/* ===================================================
          STICKY NAVBAR
      =================================================== */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleTabChange}
        user={user}
        onLogout={onLogout}
        onSearchClick={() => {
          const searchElem = document.getElementById("hero-search-input");
          searchElem?.focus();
        }}
      />

      <main className="flex-1 w-full">
        {/* =================================================
            HERO SECTION
        ================================================= */}
        <section className="relative overflow-hidden pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-[#3a6199]">
          {/* Subtle glowing radial gradient accents */}
          <div className="pointer-events-none absolute -top-28 left-1/4 h-96 w-96 rounded-full bg-[#c9a227]/10 blur-3xl" />
          <div className="pointer-events-none absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-[#1e5aa8]/10 blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

              {/* Left Column: Hero Text & Search */}
              <div className="lg:col-span-7 flex flex-col space-y-6 text-left">

                {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                  Real Experiences. <br />
                  <span className="text-[#c9a227] drop-shadow-sm">Stronger Together.</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-700 max-w-2xl leading-relaxed font-normal">
                  A community platform for Sinhgad students to share placement
                  experiences, ask questions, and learn from each other —
                  whether you got selected, rejected, or are still in the process.
                </p>

                {/* Search Bar Input */}
                <div className="pt-2">
                  <div className="relative flex items-center max-w-2xl rounded-2xl bg-white p-2 border border-slate-300 shadow-2xl focus-within:border-[#c9a227] focus-within:ring-2 focus-within:ring-[#c9a227]/30 transition-all">
                    <Search className="ml-3 h-5 w-5 text-slate-500 shrink-0" />
                    <input
                      id="hero-search-input"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search companies, interview topics, questions, experiences..."
                      className="w-full bg-transparent px-3.5 py-2.5 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="p-1 text-slate-400 hover:text-slate-900 mr-2"
                        title="Clear search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleSearch(searchQuery)}
                      className="shrink-0 rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-bold text-[#0f2747] shadow-md hover:bg-[#dcb443] active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <span>Search</span>
                    </button>
                  </div>

                  {/* Popular Tags */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 pt-1 text-xs sm:text-sm">
                    <span className="font-semibold text-slate-600">Popular:</span>
                    {["TCS", "Infosys", "Accenture", "Persistent", "Capgemini", "Wipro"].map((tag) => {
                      const isSelected = selectedFilterTag === tag;
                      return (
                        <button
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${isSelected
                              ? "bg-[#c9a227] text-[#0f2747] font-bold shadow-md ring-1 ring-[#c9a227]"
                              : "bg-white text-slate-600 border border-slate-300 hover:border-[#c9a227]/60 hover:text-slate-900"
                            }`}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Graphic / Sinhgad Campus Scene */}
              <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md lg:max-w-none">

                  {/* Outer glow container */}
                  <div className="relative rounded-3xl bg-gradient-to-b from-[#17335c]/90 to-[#0a1a30]/90 border border-[#c9a227]/30 p-4 sm:p-6 shadow-2xl backdrop-blur-sm overflow-hidden group">

                    {/* Background Sinhgad campus illustration backdrop */}
                    <div className="relative h-72 sm:h-80 w-full rounded-2xl bg-gradient-to-t from-[#0a1a30] via-[#17335c] to-[#22406A] overflow-hidden flex flex-col justify-between p-4 border border-[#3a6199]">

                      {/* Architectural outline header */}
                      <div className="text-center pt-2">
                        <div className="inline-block px-3 py-0.5 rounded-md bg-[#0f2747]/80 border border-[#c9a227]/40 text-[10px] font-bold tracking-widest text-[#c9a227] uppercase">
                          Sinhgad Group of Institutes
                        </div>
                      </div>

                      {/* Floating Badges */}
                      <div className="absolute top-4 left-4 z-20 animate-bounce-subtle">
                        <div className="bg-[#17335c]/95 border border-[#c9a227]/40 shadow-lg rounded-full px-3 py-1 text-[11px] font-medium text-[#fef3c7] flex items-center gap-1.5 backdrop-blur-md">
                          <span>Students helping Students</span>
                          <span className="text-rose-400">❤️</span>
                        </div>
                      </div>

                      <div className="absolute top-14 right-3 z-20">
                        <div className="bg-[#17335c]/95 border border-[#c9a227]/40 shadow-lg rounded-full px-3 py-1 text-[11px] font-medium text-[#c9a227] flex items-center gap-1.5 backdrop-blur-md">
                          <Sparkles className="w-3 h-3 text-[#c9a227]" />
                          <span>Same Campus, Bigger Opportunities</span>
                        </div>
                      </div>

                      {/* Campus Pillars & Neoclassical Silhouette */}
                      <div className="relative flex justify-center items-end h-full">
                        <svg className="w-full h-44 text-[#3a6199]/60 fill-current opacity-70" viewBox="0 0 400 180">
                          {/* Campus Dome & Pediment */}
                          <polygon points="120,70 200,25 280,70" fill="#c9a227" opacity="0.25" />
                          <rect x="130" y="70" width="140" height="10" fill="#3a6199" />
                          {/* Columns */}
                          <rect x="145" y="80" width="10" height="70" fill="#3A6199" />
                          <rect x="175" y="80" width="10" height="70" fill="#3A6199" />
                          <rect x="215" y="80" width="10" height="70" fill="#3A6199" />
                          <rect x="245" y="80" width="10" height="70" fill="#3A6199" />
                          {/* Main Base */}
                          <rect x="110" y="150" width="180" height="20" fill="#22406A" />
                          {/* Left Wing */}
                          <rect x="20" y="90" width="90" height="80" fill="#17335c" />
                          {/* Right Wing */}
                          <rect x="290" y="90" width="90" height="80" fill="#17335c" />
                        </svg>

                        {/* Interactive Students Group Card Representation */}
                        <div className="absolute bottom-2 inset-x-2 z-10 flex items-center justify-center gap-3">
                          <div className="flex -space-x-3 items-center">
                            <div className="w-12 h-12 rounded-full border-2 border-[#c9a227] bg-gradient-to-tr from-brand-blue to-navy flex items-center justify-center text-sm font-bold text-white shadow-lg">
                              👨‍💻
                            </div>
                            <div className="w-12 h-12 rounded-full border-2 border-[#c9a227] bg-gradient-to-tr from-amber-600 to-rose-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                              👩‍🎓
                            </div>
                            <div className="w-12 h-12 rounded-full border-2 border-[#c9a227] bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                              🧑‍💼
                            </div>
                            <div className="w-12 h-12 rounded-full border-2 border-[#c9a227] bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-sm font-bold text-white shadow-lg">
                              👩‍💻
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Pillar Banner */}
                      <div className="absolute bottom-3 right-3 z-30">
                        <div className="bg-[#0f2747]/95 border-2 border-[#c9a227] text-[#ffffff] rounded-xl px-3 py-2 text-center shadow-2xl">
                          <p className="text-[10px] font-black tracking-wider text-[#c9a227] uppercase leading-tight">
                            SHARE
                          </p>
                          <p className="text-[10px] font-black tracking-wider text-[#fef3c7] uppercase leading-tight">
                            LEARN
                          </p>
                          <p className="text-[10px] font-black tracking-wider text-white uppercase leading-tight">
                            DISCUSS
                          </p>
                          <p className="text-[10px] font-black tracking-wider text-[#c9a227] uppercase leading-tight">
                            GROW
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Micro Banner */}
                    <div className="mt-3 flex items-center justify-between px-2 text-xs text-[#fef3c7]/70">
                      <span className="flex items-center gap-1 text-[#c9a227]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a227]" /> Verified Sinhgad Community
                      </span>
                      <span className="text-[11px] font-medium text-[#fef3c7]/50">Updated Hourly</span>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =================================================
            STATS ROW
        ================================================= */}
        <section className="relative z-10 -mt-7 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

            {/* Stat 1 */}
            <div className="rounded-2xl bg-[#17335c] p-5 sm:p-6 border border-[#3a6199] hover:border-[#c9a227]/50 shadow-xl transition-all group flex items-start gap-4">
              <div className="rounded-xl bg-[#0f2747] p-3 text-[#c9a227] border border-[#c9a227]/20 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6 text-[#c9a227]" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] tracking-tight">
                  2,500+
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#fef3c7]/80 mt-0.5">
                  Placement Experiences
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="rounded-2xl bg-[#17335c] p-5 sm:p-6 border border-[#3a6199] hover:border-[#c9a227]/50 shadow-xl transition-all group flex items-start gap-4">
              <div className="rounded-xl bg-[#0f2747] p-3 text-[#c9a227] border border-[#c9a227]/20 group-hover:scale-110 transition-transform">
                <Building2 className="h-6 w-6 text-[#c9a227]" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] tracking-tight">
                  300+
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#fef3c7]/80 mt-0.5">
                  Companies Covered
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="rounded-2xl bg-[#17335c] p-5 sm:p-6 border border-[#3a6199] hover:border-[#c9a227]/50 shadow-xl transition-all group flex items-start gap-4">
              <div className="rounded-xl bg-[#0f2747] p-3 text-[#c9a227] border border-[#c9a227]/20 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-[#c9a227]" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] tracking-tight">
                  5,000+
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#fef3c7]/80 mt-0.5">
                  Sinhgad Students & Alumni
                </p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="rounded-2xl bg-[#17335c] p-5 sm:p-6 border border-[#3a6199] hover:border-[#c9a227]/50 shadow-xl transition-all group flex items-start gap-4">
              <div className="rounded-xl bg-[#0f2747] p-3 text-[#c9a227] border border-[#c9a227]/20 group-hover:scale-110 transition-transform">
                <Star className="h-6 w-6 text-[#c9a227]" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] tracking-tight">
                  95%
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#fef3c7]/80 mt-0.5">
                  Would Recommend
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* =================================================
            HOW IT WORKS SECTION
        ================================================= */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              A simple way to learn, share and grow together.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Card 1 */}
            <div className="rounded-2xl bg-[#17335c] p-6 border border-[#3a6199] hover:border-[#c9a227]/60 hover:-translate-y-1 transition-all shadow-lg flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#0f2747] border border-[#1e5aa8]/40 flex items-center justify-center text-[#1e5aa8] mb-5 shadow-sm">
                <BookOpen className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-lg font-bold text-[#ffffff] mb-2">
                Explore Experiences
              </h3>
              <p className="text-sm text-[#fef3c7]/80 leading-relaxed">
                Read real experiences shared by Sinhgad students and alumni —
                selected, rejected or ongoing.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-[#17335c] p-6 border border-[#3a6199] hover:border-[#c9a227]/60 hover:-translate-y-1 transition-all shadow-lg flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#0f2747] border border-[#16805c]/40 flex items-center justify-center text-[#16805c] mb-5 shadow-sm">
                <PenTool className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-[#ffffff] mb-2">
                Share Your Experience
              </h3>
              <p className="text-sm text-[#fef3c7]/80 leading-relaxed">
                Contribute your placement journey to help others, no matter the
                outcome.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-[#17335c] p-6 border border-[#3a6199] hover:border-[#c9a227]/60 hover:-translate-y-1 transition-all shadow-lg flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#0f2747] border border-[#a855f7]/40 flex items-center justify-center text-[#a855f7] mb-5 shadow-sm">
                <MessageSquare className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-[#ffffff] mb-2">
                Ask & Discuss
              </h3>
              <p className="text-sm text-[#fef3c7]/80 leading-relaxed">
                Ask questions and get answers from students and alumni who have
                been through it.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl bg-[#17335c] p-6 border border-[#3a6199] hover:border-[#c9a227]/60 hover:-translate-y-1 transition-all shadow-lg flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-[#0f2747] border border-[#c9a227]/40 flex items-center justify-center text-[#c9a227] mb-5 shadow-sm">
                <TrendingUp className="w-6 h-6 text-[#c9a227]" />
              </div>
              <h3 className="text-lg font-bold text-[#ffffff] mb-2">
                Gain Insights
              </h3>
              <p className="text-sm text-[#fef3c7]/80 leading-relaxed">
                Discover trends, frequently asked topics and company insights to
                prepare better.
              </p>
            </div>

          </div>
        </section>

        {/* =================================================
            RECENT EXPERIENCES SECTION
        ================================================= */}
        <section id="recent-experiences" className="py-14 bg-[#0a1a30] border-y border-[#3a6199] scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#ffffff] tracking-tight">
                  Recent Experiences
                </h2>
                <p className="text-sm sm:text-base text-[#fef3c7]/80 mt-1">
                  Latest placement experiences shared by the community.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {selectedFilterTag && (
                  <button
                    onClick={() => setSelectedFilterTag(null)}
                    className="text-xs bg-[#17335c] border border-[#c9a227] text-[#c9a227] rounded-full px-3 py-1 flex items-center gap-1 hover:bg-[#c9a227]/10"
                  >
                    Filtering: {selectedFilterTag} <X className="w-3 h-3" />
                  </button>
                )}
                <button
                  onClick={() => handleTabChange("experiences")}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#c9a227] hover:text-[#dcb443] transition-colors"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Layout: Left 3 Columns for Cards + Right 1 Column for Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Experiences Cards (Left 8 cols or 9 cols) */}
              <div className="lg:col-span-8 xl:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
                {filteredExperiences.length === 0 ? (
                  <div className="md:col-span-3 rounded-2xl bg-[#17335c] p-8 text-center border border-[#3a6199]">
                    <HelpCircle className="w-10 h-10 text-[#c9a227] mx-auto mb-3 opacity-80" />
                    <p className="text-[#ffffff] font-semibold text-lg">No experiences found</p>
                    <p className="text-[#fef3c7]/70 text-sm mt-1">
                      Try clearing search filters or be the first to share one!
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedFilterTag(null);
                      }}
                      className="mt-4 px-4 py-2 rounded-xl bg-[#c9a227] text-[#0f2747] font-bold text-sm"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  filteredExperiences.slice(0, 6).map((item) => {
                    const isLiked = likedMap[item.id] || false;
                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl bg-[#17335c] border border-[#3a6199] hover:border-[#c9a227]/50 p-5 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all"
                      >
                        <div>
                          {/* Card Header: Company Logo + Status Badge */}
                          <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#3a6199]">
                            <CompanyLogo name={item.company} />

                            <span
                              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${item.status === "Selected"
                                  ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                                  : item.status === "Interview Completed"
                                    ? "bg-sky-500/15 text-sky-300 border-sky-500/30"
                                    : "bg-rose-500/15 text-rose-300 border-rose-500/30"
                                }`}
                            >
                              {item.status}
                            </span>
                          </div>

                          {/* Role & Rounds Meta */}
                          <div className="mt-3">
                            <h3 className="font-bold text-[#ffffff] text-base leading-snug">
                              {item.role}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-[#fef3c7]/70 mt-1.5 font-medium">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-[#fef3c7]/60" /> {item.year}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Layers className="w-3.5 h-3.5 text-[#fef3c7]/60" /> {item.roundsCount} Rounds
                              </span>
                            </div>
                          </div>

                          {/* Review Quote */}
                          <p className="mt-3 text-xs sm:text-sm text-[#fef3c7]/90 leading-relaxed italic bg-[#0f2747]/50 p-3 rounded-xl border border-[#3a6199]/50">
                            "{item.review}"
                          </p>

                          {/* Skill Tags */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                              <button
                                key={tag}
                                onClick={() => handleTagClick(tag)}
                                className="text-[11px] px-2 py-0.5 rounded-md bg-[#0f2747] text-[#fef3c7]/80 border border-[#3a6199] hover:border-[#c9a227]/50 transition-colors"
                              >
                                {tag}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Author & Actions Footer */}
                        <div className="mt-5 pt-3 border-t border-[#3a6199] flex items-center justify-between text-xs text-[#fef3c7]/70">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#0f2747] border border-[#c9a227]/40 flex items-center justify-center text-[10px] text-[#c9a227] font-bold">
                              A
                            </div>
                            <div>
                              <p className="font-semibold text-[#ffffff] leading-tight">
                                {item.author.name}
                              </p>
                              <p className="text-[10px] text-[#fef3c7]/60">
                                {item.author.branch} | {item.author.batch}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleToggleLike(item.id)}
                              className={`flex items-center gap-1 transition-colors ${isLiked
                                  ? "text-rose-400 font-bold"
                                  : "text-[#fef3c7]/70 hover:text-rose-400"
                                }`}
                              title="Like experience"
                            >
                              <Heart
                                className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-400 text-rose-400" : ""
                                  }`}
                              />
                              <span>{item.likes}</span>
                            </button>

                            <div className="flex items-center gap-1 text-[#fef3c7]/70">
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{item.commentsCount}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

              {/* Right Side Action Prompt Cards (4 cols or 3 cols) */}
              <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-5">

                {/* Action Card 1: Share Experience */}
                <div className="rounded-2xl bg-gradient-to-br from-[#17335c] to-[#17335c] border border-[#c9a227]/30 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-[#0f2747] border border-[#c9a227]/40 flex items-center justify-center mb-4">
                      <FileText className="w-5 h-5 text-[#c9a227]" />
                    </div>
                    <h3 className="font-bold text-[#ffffff] text-lg leading-snug">
                      Have a placement experience to share?
                    </h3>
                    <p className="text-xs text-[#fef3c7]/80 mt-2 leading-relaxed">
                      Help your peers by sharing your interview rounds, questions, and insights.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="relative z-10 mt-6 w-full rounded-xl bg-[#c9a227] py-2.5 px-4 text-center text-sm font-bold text-[#0f2747] shadow-md hover:bg-[#dcb443] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Share Experience</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Action Card 2: Have a Question? */}
                <div className="rounded-2xl bg-gradient-to-br from-[#17335c] to-[#17335c] border border-[#3a6199] hover:border-[#c9a227]/40 p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#0f2747] border border-[#16805c]/40 flex items-center justify-center mb-4">
                      <MessageSquare className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="font-bold text-[#ffffff] text-lg leading-snug">
                      Have a question?
                    </h3>
                    <p className="text-xs text-[#fef3c7]/80 mt-2 leading-relaxed">
                      Ask the community and get answers from students and alumni who recently gave interviews.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsQuestionModalOpen(true)}
                    className="mt-6 w-full rounded-xl border-2 border-[#c9a227] py-2 px-4 text-center text-sm font-bold text-[#c9a227] hover:bg-[#c9a227]/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Ask a Question</span>
                    <HelpCircle className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =================================================
            POPULAR COMPANIES SECTION
        ================================================= */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Popular Companies
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-1">
                Explore experiences from top recruiters in Sinhgad.
              </p>
            </div>

            <button
              onClick={() => handleTabChange("companies")}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#c9a227] hover:text-[#dcb443] transition-colors"
            >
              View All Companies <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-4">
            {popularCompaniesList.map((company) => (
              <button
                key={company.name}
                onClick={() => handleTagClick(company.name)}
                className="group rounded-2xl bg-[#17335c] border border-[#3a6199] hover:border-[#c9a227] p-4 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 shadow-md hover:shadow-xl"
              >
                <div className="h-10 flex items-center justify-center">
                  <CompanyLogo name={company.name} />
                </div>
                <span className="mt-2 text-xs font-semibold text-[#ffffff] group-hover:text-[#c9a227] transition-colors">
                  {company.name}
                </span>
              </button>
            ))}

            {/* "View All" 9th card */}
            <button
              onClick={() => handleTabChange("companies")}
              className="group rounded-2xl bg-[#0a1a30] border border-[#c9a227]/40 hover:border-[#c9a227] p-4 flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 shadow-md hover:shadow-xl"
            >
              <div className="h-10 w-10 rounded-full bg-[#0f2747] border border-[#c9a227]/30 flex items-center justify-center text-[#c9a227] group-hover:bg-[#c9a227] group-hover:text-[#0f2747] transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
              <span className="mt-2 text-xs font-bold text-[#c9a227]">
                View All
              </span>
            </button>
          </div>
        </section>

        {/* =================================================
            COMMUNITY TESTIMONIAL BANNER
        ================================================= */}
        <section className="py-12 bg-[#0a1a30] border-t border-[#3a6199]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-gradient-to-r from-[#17335c] via-[#17335c] to-[#17335c] border border-[#c9a227]/30 p-6 sm:p-10 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                {/* Left Testimonial: Sneha K. */}
                <div className="lg:col-span-4 rounded-2xl bg-[#0f2747]/70 border border-[#3a6199] p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-rose-400 flex items-center justify-center font-bold text-white shadow-md">
                      SK
                    </div>
                    <div>
                      <p className="font-bold text-[#ffffff] text-sm">Sneha K.</p>
                      <p className="text-[11px] text-[#fef3c7]/70">TE Computer (Batch 2025)</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#fef3c7]/90 leading-relaxed italic">
                    "This platform really helped me understand what to expect in
                    interviews. The experiences are genuine and very helpful!"
                  </p>
                </div>

                {/* Center Manifesto Banner */}
                <div className="lg:col-span-4 text-center px-2">
                  <div className="inline-flex p-3 rounded-2xl bg-[#0f2747] border border-[#c9a227]/40 mb-3 shadow-md">
                    <Users className="w-6 h-6 text-[#c9a227]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#ffffff] leading-snug">
                    A Community by Sinhgad Students, <br />
                    for Sinhgad Students.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#fef3c7]/80 mt-2 font-medium">
                    Let's build a stronger placement culture together.
                  </p>
                </div>

                {/* Right Testimonial: Aditya P. */}
                <div className="lg:col-span-4 rounded-2xl bg-[#0f2747]/70 border border-[#3a6199] p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-navy flex items-center justify-center font-bold text-white shadow-md">
                      AP
                    </div>
                    <div>
                      <p className="font-bold text-[#ffffff] text-sm">Aditya P.</p>
                      <p className="text-[11px] text-[#fef3c7]/70">BE IT (Batch 2024)</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#fef3c7]/90 leading-relaxed italic">
                    "I shared my interview experience even though I wasn't
                    selected, and it still helped many students. That's what makes
                    this community special!"
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

      </main>

      {/* =================================================
          DARK NAVY FOOTER (SHARED)
      ================================================= */}
      <Footer onNavigate={handleTabChange} />

      {/* =================================================
          MODAL: SHARE YOUR EXPERIENCE
      ================================================= */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0f2747] border border-[#c9a227]/40 p-6 shadow-2xl text-[#ffffff] max-h-[90vh] overflow-y-auto dark-scroll">

            <div className="flex items-center justify-between pb-4 border-b border-[#3a6199]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#17335c] flex items-center justify-center text-[#c9a227]">
                  <PenTool className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-[#ffffff]">Share Placement Experience</h3>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-[#fef3c7]/60 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleShareSubmit} className="mt-4 space-y-4 text-left">
              {formNotice && (
                <div className="flex items-start gap-2 rounded-xl border border-[#c9a227]/40 bg-[#c9a227]/10 p-3 text-xs text-[#fef3c7]">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{formNotice}</span>
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-[#fef3c7]/80 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={newExpCompany}
                  onChange={(e) => setNewExpCompany(e.target.value)}
                  placeholder="e.g. TCS, Infosys, Barclays"
                  className="w-full rounded-xl bg-[#17335c] border border-[#3a6199] px-3.5 py-2 text-sm text-[#ffffff] placeholder:text-[#fef3c7]/30 focus:outline-none focus:border-[#c9a227]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#fef3c7]/80 mb-1">
                    Role / Profile *
                  </label>
                  <input
                    type="text"
                    required
                    value={newExpRole}
                    onChange={(e) => setNewExpRole(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    className="w-full rounded-xl bg-[#17335c] border border-[#3a6199] px-3.5 py-2 text-sm text-[#ffffff] placeholder:text-[#fef3c7]/30 focus:outline-none focus:border-[#c9a227]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#fef3c7]/80 mb-1">
                    Rounds Count
                  </label>
                  <select
                    value={newExpRounds}
                    onChange={(e) => setNewExpRounds(Number(e.target.value))}
                    className="w-full rounded-xl bg-[#17335c] border border-[#3a6199] px-3.5 py-2 text-sm text-[#ffffff] focus:outline-none focus:border-[#c9a227]"
                  >
                    <option value={1}>1 Round</option>
                    <option value={2}>2 Rounds</option>
                    <option value={3}>3 Rounds</option>
                    <option value={4}>4 Rounds</option>
                    <option value={5}>5+ Rounds</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#fef3c7]/80 mb-1">
                    Interview Outcome *
                  </label>
                  <select
                    value={newExpStatus}
                    onChange={(e) =>
                      setNewExpStatus(e.target.value as "Selected" | "Interview Completed" | "Rejected")
                    }
                    className="w-full rounded-xl bg-[#17335c] border border-[#3a6199] px-3.5 py-2 text-sm text-[#ffffff] focus:outline-none focus:border-[#c9a227]"
                  >
                    <option value="Selected">Selected</option>
                    <option value="Interview Completed">Interview Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#fef3c7]/80 mb-1">
                    Department / Branch
                  </label>
                  <select
                    value={newExpBranch}
                    onChange={(e) => setNewExpBranch(e.target.value)}
                    className="w-full rounded-xl bg-[#17335c] border border-[#3a6199] px-3.5 py-2 text-sm text-[#ffffff] focus:outline-none focus:border-[#c9a227]"
                  >
                    <option value="Computer">Computer</option>
                    <option value="IT">IT</option>
                    <option value="ENTC">ENTC</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#fef3c7]/80 mb-1">
                  Topics / Skills Tested (comma separated)
                </label>
                <input
                  type="text"
                  value={newExpTags}
                  onChange={(e) => setNewExpTags(e.target.value)}
                  placeholder="DSA, OOP, SQL, System Design"
                  className="w-full rounded-xl bg-[#17335c] border border-[#3a6199] px-3.5 py-2 text-sm text-[#ffffff] placeholder:text-[#fef3c7]/30 focus:outline-none focus:border-[#c9a227]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#fef3c7]/80 mb-1">
                  Interview Summary & Advice *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newExpReview}
                  onChange={(e) => setNewExpReview(e.target.value)}
                  placeholder="Share what questions were asked, difficulty level, and tips for juniors..."
                  className="w-full rounded-xl bg-[#17335c] border border-[#3a6199] px-3.5 py-2 text-sm text-[#ffffff] placeholder:text-[#fef3c7]/30 focus:outline-none focus:border-[#c9a227] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-[#fef3c7]/70 hover:text-[#ffffff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingExperience}
                  className="px-5 py-2 rounded-xl bg-[#c9a227] text-[#0f2747] font-bold text-sm hover:bg-[#dcb443] active:scale-95 transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmittingExperience ? "Posting..." : "Post Experience"}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* =================================================
          MODAL: ASK A QUESTION
      ================================================= */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-[#0f2747] border border-[#c9a227]/40 p-6 shadow-2xl text-[#ffffff]">

            <div className="flex items-center justify-between pb-3 border-b border-[#3a6199]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#17335c] flex items-center justify-center text-[#c9a227]">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold text-[#ffffff]">Ask the Community</h3>
              </div>
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="text-[#fef3c7]/60 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {questionSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <p className="font-bold text-lg text-[#ffffff]">Question Posted!</p>
                <p className="text-xs text-[#fef3c7]/80">
                  Students and alumni will be notified to answer.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="mt-4 space-y-4 text-left">
                {formNotice && (
                  <div className="flex items-start gap-2 rounded-xl border border-[#c9a227]/40 bg-[#c9a227]/10 p-3 text-xs text-[#fef3c7]">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>{formNotice}</span>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-[#fef3c7]/80 mb-1">
                    Related Company (Optional)
                  </label>
                  <input
                    type="text"
                    value={questionCompany}
                    onChange={(e) => setQuestionCompany(e.target.value)}
                    placeholder="e.g. TCS, Capgemini, or General"
                    className="w-full rounded-xl bg-[#17335c] border border-[#3a6199] px-3.5 py-2 text-sm text-[#ffffff] placeholder:text-[#fef3c7]/30 focus:outline-none focus:border-[#c9a227]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#fef3c7]/80 mb-1">
                    Your Question *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Ask about interview pattern, aptitude topics, difficulty level..."
                    className="w-full rounded-xl bg-[#17335c] border border-[#3a6199] px-3.5 py-2 text-sm text-[#ffffff] placeholder:text-[#fef3c7]/30 focus:outline-none focus:border-[#c9a227] resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsQuestionModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-[#fef3c7]/70 hover:text-[#ffffff]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#c9a227] text-[#0f2747] font-bold text-sm hover:bg-[#dcb443] active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Question</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
