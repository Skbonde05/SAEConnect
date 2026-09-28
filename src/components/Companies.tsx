import { useState, useMemo } from "react";
import {
  Building2,
  Search,
  ArrowLeft,
  ExternalLink,
  Star,
  TrendingUp,
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  X,
  ChevronRight,
  Clock,
  Sparkles,
} from "lucide-react";
import Navbar, { type NavTab, type UserProfile } from "./Navbar";
import Footer from "./Footer";

interface CompanyInfo {
  slug: string;
  name: string;
  category: "Mass Recruiter" | "IT Services" | "Product Engineering" | "Consulting & Tech" | "Cloud & Digital" | "Core Engineering";
  rating: number;
  experienceCount: number;
  avgPackage: string;
  topRoles: string[];
  location: string;
  rounds: string[];
  eligibility: string;
  sampleQuestions: string[];
  tips: string;
  logoColor: string;
  badge?: string;
}

const COMPANIES_DATA: CompanyInfo[] = [
  {
    slug: "tcs",
    name: "Tata Consultancy Services (TCS)",
    category: "Mass Recruiter",
    rating: 4.3,
    experienceCount: 142,
    avgPackage: "3.6 - 9.0 LPA (Ninja / Digital / Prime)",
    topRoles: ["Assistant System Engineer", "Digital Developer", "Prime Innovator"],
    location: "Pune, Mumbai, Pan-India",
    rounds: [
      "TCS NQT (Aptitude, Numerical, Reasoning, Verbal)",
      "Advanced Coding (2 questions - Arrays, Strings, DSA)",
      "Technical Interview (DSA, OOP, DBMS, Final Year Project)",
      "Managerial & HR Interview (Communication, Situational)",
    ],
    eligibility: "60% or 6.0 CGPA throughout 10th, 12th/Diploma, and Degree. Max 1 active backlog allowed at registration.",
    sampleQuestions: [
      "Explain the four pillars of OOP with real-life examples.",
      "How does indexing improve database query performance?",
      "Write code to reverse a linked list and detect a cycle.",
      "Explain your final year project architecture and role.",
    ],
    tips: "Focus heavily on TCS NQT foundation & advanced sections. Be thorough with whatever is on your resume.",
    logoColor: "#e21836",
    badge: "Top Recruiter",
  },
  {
    slug: "infosys",
    name: "Infosys",
    category: "IT Services",
    rating: 4.2,
    experienceCount: 118,
    avgPackage: "3.6 - 9.5 LPA (SE / DSE / Specialist)",
    topRoles: ["Systems Engineer", "Digital Specialist Engineer", "Specialist Programmer"],
    location: "Pune (Hinjawadi), Bengaluru, Mysuru",
    rounds: [
      "InfyTQ / Online Assessment (Reasoning, Tech Ability, Pseudocode, Python/Java)",
      "HackWithInfy Coding Round (for DSE & SP roles)",
      "Technical Interview (Programming logic, SQL, System basics)",
      "HR Interview (Culture fit, willingness to relocate)",
    ],
    eligibility: "Minimum 60% in 10th, 12th and 65% in B.E./B.Tech. No active backlogs during joining.",
    sampleQuestions: [
      "What is the difference between SQL and NoSQL databases?",
      "Solve: Given an array of integers, find the pair with sum equal to target.",
      "Explain normalization up to 3NF.",
      "What is polymorphism? Differentiate method overloading vs overriding.",
    ],
    tips: "Clear reasoning and pseudocode practice is essential. Practice on previous Infosys test pattern papers.",
    logoColor: "#007cc3",
    badge: "Popular",
  },
  {
    slug: "accenture",
    name: "Accenture",
    category: "Consulting & Tech",
    rating: 4.4,
    experienceCount: 96,
    avgPackage: "4.5 - 6.5 LPA (ASE / FSE)",
    topRoles: ["Associate Software Engineer", "Full Stack Engineer"],
    location: "Pune (Magarpatta/Yerwada), Mumbai, Bengaluru",
    rounds: [
      "Cognitive & Technical Assessment (Critical Thinking, English, Pseudocode, Networking)",
      "Coding Assessment (2 problems - moderate DSA)",
      "Communication Assessment (Voice-based audio test: repeat, reading, storytelling)",
      "Virtual Technical + HR Interview (Combined interview)",
    ],
    eligibility: "65% or 6.5 CGPA in current degree. No active backlogs.",
    sampleQuestions: [
      "What are abstract classes and interfaces in Java / C++?",
      "Explain Git branching and merge conflicts handling.",
      "Tell me about a challenging technical bug you resolved.",
      "How would you handle working on a technology stack you have never used before?",
    ],
    tips: "Do not neglect the Communication Assessment! It is an elimination round with strict voice analysis.",
    logoColor: "#a100ff",
    badge: "High Intake",
  },
  {
    slug: "persistent",
    name: "Persistent Systems",
    category: "Product Engineering",
    rating: 4.5,
    experienceCount: 68,
    avgPackage: "5.0 - 9.0 LPA",
    topRoles: ["Software Engineer", "Cloud & DevOps Intern"],
    location: "Pune (Senapati Bapat Rd / Hinjawadi), Hyderabad",
    rounds: [
      "Online Test (Aptitude, Core CS: OS, DBMS, Networks, 2 Coding)",
      "Technical Interview 1 (In-depth DSA, Data Structures, Complexity analysis)",
      "Technical Interview 2 (System Design basics, DB query optimization, Web tech)",
      "HR Interview (Values, Aspirations, Role expectations)",
    ],
    eligibility: "60% throughout academics. Strong core CS subjects required.",
    sampleQuestions: [
      "Explain deadlock conditions and prevention strategies in OS.",
      "Implement LRU Cache using Doubly Linked List and Hash Map.",
      "Explain RESTful API principles and idempotency.",
      "How do threads and processes differ in memory allocation?",
    ],
    tips: "Persistent puts high weightage on core CS fundamentals: OS, DBMS, Computer Networks, and clean code.",
    logoColor: "#f37021",
    badge: "High Growth",
  },
  {
    slug: "capgemini",
    name: "Capgemini",
    category: "Cloud & Digital",
    rating: 4.1,
    experienceCount: 74,
    avgPackage: "4.0 - 7.5 LPA",
    topRoles: ["Senior Analyst", "Cloud Software Engineer"],
    location: "Pune (Talwade / Hinjawadi), Mumbai",
    rounds: [
      "Technical Test & Pseudocode",
      "English Communication Test",
      "Game-Based Aptitude Assessment (Grid Challenge, Motion Challenge, etc.)",
      "Behavioral / Competency Profiling",
      "Technical & HR Interview",
    ],
    eligibility: "55% or 6.0 CGPA across degree and diploma/12th.",
    sampleQuestions: [
      "What is the difference between inner join, left join, and full outer join?",
      "Explain how DNS resolution works when you enter a URL.",
      "Explain the difference between call by value and call by reference.",
      "Where do you see yourself in the next 3 years?",
    ],
    tips: "Game-based aptitude tests test concentration and working memory. Practice mock games beforehand.",
    logoColor: "#0070ad",
  },
  {
    slug: "wipro",
    name: "Wipro",
    category: "IT Services",
    rating: 4.0,
    experienceCount: 82,
    avgPackage: "3.5 - 6.5 LPA (Elite / Turbo)",
    topRoles: ["Project Engineer", "Turbo Developer"],
    location: "Pune (Hinjawadi), Bengaluru, Chennai",
    rounds: [
      "Wipro NLTH (Aptitude, Logical, Verbal, Essay Writing)",
      "Coding Test (2 problems)",
      "Technical Interview (Fundamentals, Resume verification)",
      "HR Interview",
    ],
    eligibility: "60% or 6.0 CGPA from 10th onwards. Maximum 1 active backlog at application time.",
    sampleQuestions: [
      "Explain ACID properties of a database transaction.",
      "Find the missing number in an array of size n containing numbers from 1 to n+1.",
      "What is garbage collection in Java?",
      "Why should Wipro hire you over other candidates from your college?",
    ],
    tips: "The essay writing test requires good grammar, punctuation, and clear structure. Practice typing fast.",
    logoColor: "#ec1c24",
  },
  {
    slug: "cognizant",
    name: "Cognizant",
    category: "IT Services",
    rating: 4.2,
    experienceCount: 65,
    avgPackage: "4.0 - 7.0 LPA (GenC / GenC Elevate)",
    topRoles: ["Programmer Analyst Trainee", "GenC Next Developer"],
    location: "Pune (Hinjawadi), Coimbatore, Hyderabad",
    rounds: [
      "GenC Aptitude & Coding Round",
      "Technical Assessment & Skill Check",
      "Technical Interview (Live coding, debugging, OOP)",
      "HR Discussion",
    ],
    eligibility: "60% throughout. No current standing arrears/backlogs.",
    sampleQuestions: [
      "How to avoid SQL injection attacks?",
      "Write a function to check if two strings are anagrams.",
      "Difference between monolithic and microservices architecture.",
      "Explain the life cycle of a React component or HTTP request.",
    ],
    tips: "GenC Elevate candidates get higher packages; focus on DSA and clean coding practices.",
    logoColor: "#0066cc",
  },
  {
    slug: "hcl",
    name: "HCL Technologies",
    category: "IT Services",
    rating: 4.1,
    experienceCount: 52,
    avgPackage: "3.8 - 6.0 LPA",
    topRoles: ["Graduate Engineer Trainee", "Associate Engineer"],
    location: "Pune, Noida, Nagpur",
    rounds: [
      "Online Aptitude Test & Tech MCQs",
      "Coding Assessment",
      "Technical Interview",
      "HR Discussion",
    ],
    eligibility: "60% aggregate in B.Tech / B.E.",
    sampleQuestions: [
      "Explain how memory is managed in C++ or Java.",
      "What is the difference between TCP and UDP?",
      "Write a query to find the 2nd highest salary from an Employee table.",
    ],
    tips: "Review fundamental networking, basic SQL, and your resume projects thoroughly.",
    logoColor: "#006699",
  },
];

const CATEGORIES = [
  "All Companies",
  "Mass Recruiter",
  "Product Engineering",
  "IT Services",
  "Consulting & Tech",
  "Cloud & Digital",
] as const;

interface CompaniesProps {
  onViewCompany?: (slug: string) => void;
  onNavigate: (tab: NavTab) => void;
  user?: UserProfile | null;
  onLogout?: () => void;
}

export default function Companies({
  onViewCompany,
  onNavigate,
  user,
  onLogout,
}: CompaniesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Companies");
  const [sortBy, setSortBy] = useState<"experiences" | "rating" | "name">("experiences");
  const [activeModalCompany, setActiveModalCompany] = useState<CompanyInfo | null>(null);

  const filteredCompanies = useMemo(() => {
    return COMPANIES_DATA.filter((comp) => {
      const matchSearch =
        comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.topRoles.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase())) ||
        comp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comp.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === "All Companies" || comp.category === selectedCategory;

      return matchSearch && matchCategory;
    }).sort((a, b) => {
      if (sortBy === "experiences") return b.experienceCount - a.experienceCount;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const topRecruiters = useMemo(() => {
    return [...COMPANIES_DATA].sort((a, b) => b.experienceCount - a.experienceCount).slice(0, 5);
  }, []);

  const totalExperiences = useMemo(() => {
    return COMPANIES_DATA.reduce((acc, c) => acc + c.experienceCount, 0);
  }, []);

  const handleOpenDetails = (company: CompanyInfo) => {
    setActiveModalCompany(company);
    onViewCompany?.(company.slug);
  };

  return (
    <div className="min-h-screen bg-canvas text-slate-900 flex flex-col font-sans selection:bg-[#c9a227] selection:text-[#0f2747]">
      {/* ═══════ NAVBAR ═══════ */}
      <Navbar
        activeTab="companies"
        onNavigate={onNavigate}
        user={user}
        onLogout={onLogout}
        onSearchClick={() => {
          document.getElementById("company-search-input")?.focus();
        }}
      />

      {/* ═══════ HERO BANNER ═══════ */}
      <section className="relative overflow-hidden bg-[#0f2747] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#3a6199]">
        <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-[#c9a227]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-brand-blue/10 blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#22406A] border border-[#c9a227]/40 text-[#c9a227] text-xs font-semibold px-3 py-1.5 rounded-full mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sinhgad Campus Recruiting Partners</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#ffffff] mb-3">
            Recruiting Companies
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Discover interview processes, selection rounds, average packages, and authentic experiences shared by Sinhgad students and alumni.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl p-2 shadow-2xl border border-slate-200 focus-within:border-[#c9a227] focus-within:ring-2 focus-within:ring-[#c9a227]/30 transition-all">
              <Search className="ml-3 h-5 w-5 text-slate-400 shrink-0" />
              <input
                id="company-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company (TCS, Infosys...), role, or city..."
                className="w-full bg-transparent px-3 py-2 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-slate-400 hover:text-slate-700 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ LIVE STATS STRIP ═══════ */}
      <section className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>
              <strong className="text-slate-900">{COMPANIES_DATA.length}+</strong> Companies registered with SAEConnect
            </span>
          </div>

          <div className="flex items-center gap-6 text-slate-600">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-brand-blue" />
              <strong className="text-slate-900">{totalExperiences}+</strong> Experiences Documented
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#c9a227]" />
              Trending: <strong className="text-slate-900">TCS, Infosys, Accenture</strong>
            </span>
          </div>
        </div>
      </section>

      {/* ═══════ FILTERS & CONTROLS ═══════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0f2747] text-[#c9a227] shadow-sm ring-1 ring-[#c9a227]/50"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-canvas"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 shrink-0 text-xs">
            <span className="text-slate-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 font-semibold text-slate-700 outline-none focus:border-[#c9a227] cursor-pointer"
            >
              <option value="experiences">Most Experiences</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Company Name (A-Z)</option>
            </select>
          </div>
        </div>
      </section>

      {/* ═══════ MAIN CONTENT GRID & SIDEBAR ═══════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Company Cards Grid (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900">
              Showing {filteredCompanies.length} Recruiters
            </h2>
            <button
              onClick={() => onNavigate("experiences")}
              className="text-xs font-semibold text-brand-blue hover:underline flex items-center gap-1 cursor-pointer"
            >
              View all student experiences <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {filteredCompanies.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No companies found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for a different keyword or resetting filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Companies");
                }}
                className="mt-4 px-4 py-2 bg-[#0f2747] text-white text-xs font-semibold rounded-lg hover:bg-[#22406A] transition cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredCompanies.map((c) => (
                <div
                  key={c.slug}
                  onClick={() => handleOpenDetails(c)}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-[#c9a227] p-5 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between cursor-pointer relative overflow-hidden"
                >
                  {c.badge && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#c9a227]/10 text-[#c9a227] border border-[#c9a227]/30">
                      {c.badge}
                    </span>
                  )}

                  <div>
                    {/* Top Row: Icon & Category */}
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-sm"
                        style={{ backgroundColor: c.logoColor }}
                      >
                        {c.name[0]}
                      </div>
                      <div className="min-w-0 pr-12">
                        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#0f2747] truncate">
                          {c.name}
                        </h3>
                        <span className="text-[11px] font-medium text-slate-500">
                          {c.category}
                        </span>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-1.5 text-xs text-slate-600 mb-4 bg-canvas rounded-xl p-3 border border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Package:</span>
                        <span className="font-semibold text-emerald-700">{c.avgPackage}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Location:</span>
                        <span className="font-medium text-slate-700 truncate max-w-[160px]">{c.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Rating:</span>
                        <span className="flex items-center gap-1 font-semibold text-[#c9a227]">
                          <Star className="w-3.5 h-3.5 fill-[#c9a227] text-[#c9a227]" />
                          {c.rating}/5.0
                        </span>
                      </div>
                    </div>

                    {/* Roles Tag */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {c.topRoles.slice(0, 2).map((role, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 text-[10px] bg-slate-100 text-slate-700 rounded-md font-medium"
                        >
                          {role}
                        </span>
                      ))}
                      {c.topRoles.length > 2 && (
                        <span className="px-1.5 py-0.5 text-[10px] bg-slate-100 text-slate-500 rounded-md">
                          +{c.topRoles.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-brand-blue" />
                      {c.experienceCount} Experiences
                    </span>
                    <span className="font-bold text-[#c9a227] group-hover:underline flex items-center gap-1">
                      Process Details <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Top Recruiters Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#c9a227]" /> Top Recruiters by Intake
              </h3>
              <span className="text-[10px] text-slate-400 font-medium">Sinhgad 2024-25</span>
            </div>

            <div className="space-y-3">
              {topRecruiters.map((c, i) => (
                <div
                  key={c.slug}
                  onClick={() => handleOpenDetails(c)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-canvas transition cursor-pointer border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        i === 0
                          ? "bg-[#c9a227] text-[#c9a227]"
                          : i === 1
                          ? "bg-slate-200 text-slate-800"
                          : i === 2
                          ? "bg-[#c9a227]/20 text-[#c9a227]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-xs text-slate-800 truncate">{c.name}</p>
                      <p className="text-[10px] text-slate-400">{c.category}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-700 shrink-0">
                    {c.experienceCount} exp
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Placement Drive Banner */}
          <div className="bg-[#0f2747] text-white rounded-2xl p-6 relative overflow-hidden shadow-lg border border-[#3a6199]">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#c9a227]/20 rounded-full blur-2xl" />
            <h4 className="text-base font-bold text-[#ffffff] mb-2 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#c9a227]" /> Interview Preparation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Browse real questions asked during technical and HR rounds, filter by company, and prepare with confidence.
            </p>
            <button
              onClick={() => onNavigate("experiences")}
              className="w-full py-2.5 px-4 bg-[#c9a227] hover:bg-[#dcb443] text-[#0f2747] font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              Browse Interview Questions <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>
        </aside>
      </main>

      {/* ═══════ FOOTER ═══════ */}
      <Footer onNavigate={onNavigate} />

      {/* ═══════ COMPANY DETAILS MODAL ═══════ */}
      {activeModalCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#0f2747] text-white p-6 border-b border-[#3a6199] flex items-center justify-between rounded-t-3xl z-10">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-base shadow-sm"
                  style={{ backgroundColor: activeModalCompany.logoColor }}
                >
                  {activeModalCompany.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {activeModalCompany.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                    <span className="text-[#c9a227] font-semibold">{activeModalCompany.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#c9a227]">
                      <Star className="w-3 h-3 fill-[#c9a227]" />
                      {activeModalCompany.rating} Rating
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveModalCompany(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 text-sm text-slate-700">
              {/* Key Details Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-canvas p-4 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Package (CTC)</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{activeModalCompany.avgPackage}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Location</span>
                  <span className="font-semibold text-slate-900 text-sm mt-0.5 block">{activeModalCompany.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Experiences</span>
                  <span className="font-semibold text-brand-blue text-sm mt-0.5 block">{activeModalCompany.experienceCount} Shared</span>
                </div>
              </div>

              {/* Eligibility */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Eligibility Criteria
                </h4>
                <p className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 text-xs leading-relaxed text-emerald-950 font-medium">
                  {activeModalCompany.eligibility}
                </p>
              </div>

              {/* Selection Rounds */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-blue" /> Selection Process & Rounds
                </h4>
                <div className="space-y-2">
                  {activeModalCompany.rounds.map((round, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-canvas border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-brand-blue font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-xs text-slate-800 font-medium">{round}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequently Asked Questions */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#c9a227]" /> Common Technical & Interview Questions
                </h4>
                <ul className="space-y-1.5">
                  {activeModalCompany.sampleQuestions.map((q, idx) => (
                    <li key={idx} className="text-xs bg-canvas p-2.5 rounded-xl border border-slate-100 flex items-start gap-2">
                      <span className="text-[#c9a227] font-bold">Q{idx + 1}.</span>
                      <span className="text-slate-800">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preparation Advice */}
              <div className="bg-[#c9a227]/10 border border-[#c9a227]/30 rounded-2xl p-4">
                <h5 className="font-bold text-[#c9a227] text-xs flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-[#c9a227]" /> Preparation Tip from Sinhgad Alumni
                </h5>
                <p className="text-xs text-[#c9a227] leading-relaxed">
                  {activeModalCompany.tips}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-canvas border-t border-slate-200 flex items-center justify-end gap-3 rounded-b-3xl">
              <button
                onClick={() => setActiveModalCompany(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveModalCompany(null);
                  onNavigate("experiences");
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0f2747] text-white hover:bg-[#22406A] transition flex items-center gap-1.5 cursor-pointer"
              >
                View Experiences for {activeModalCompany.name} <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
