import { useState, useMemo } from "react";
import {
  Search,
  MessageSquare,
  TrendingUp,
  Users,
  Star,
  CheckCircle2,
  Plus,
  Award,
  Quote,
  Flame,
  ShieldCheck,
  MessageCircle,
  X,
  Send,
} from "lucide-react";
import {
  INITIAL_POSTS,
  topContributors,
  trendingTopics,
  communityStats,
  type Post,
  type PostType,
} from "../lib/askShareData";
import PostCard from "./PostCard";
import Navbar, { type NavTab, type UserProfile } from "./Navbar";
import Footer from "./Footer";
import { saveDbQuestion } from "../lib/supabase";

interface Props {
  onNavigate: (tab: NavTab) => void;
  user?: UserProfile | null;
  onLogout?: () => void;
}

const filters = [
  { label: "All Posts" },
  { label: "Questions" },
  { label: "Experiences" },
  { label: "Discussions" },
];

/** Most-used tags first, capped at 7. Derived from the actual post list so a
 *  chip can never point at a topic that does not exist. */
function topTags(posts: Post[], limit = 7): string[] {
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tag]) => tag);
}

export default function AsknShare({ onNavigate, user, onLogout }: Props) {
  const [activeFilter, setActiveFilter] = useState("All Posts");
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [postsList, setPostsList] = useState<Post[]>(INITIAL_POSTS);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postType, setPostType] = useState<PostType>("Question");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const filteredPosts = useMemo(() => {
    return postsList.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      let matchesFilter = true;
      if (activeFilter === "Questions") matchesFilter = p.type === "Question";
      else if (activeFilter === "Experiences") matchesFilter = p.type === "Experience";
      else if (activeFilter === "Discussions") matchesFilter = p.type === "Discussion";

      const matchesChip = selectedChip ? p.tags.includes(selectedChip) : true;

      return matchesSearch && matchesFilter && matchesChip;
    });
  }, [postsList, searchQuery, activeFilter, selectedChip]);

  const categoryChips = useMemo(() => topTags(postsList), [postsList]);

  /** Commit the typed query: reveal the results list below the hero. */
  const handleSearchSubmit = () => {
    document
      .getElementById("asknshare-results")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /** Close the composer and discard any half-typed draft. */
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setBody("");
    setTagsInput("");
    setPostType("Question");
  };

  const handleVote = (id: number | string, delta: 1 | -1) => {
    setPostsList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, votes: Math.max(0, item.votes + delta) }
          : item
      )
    );
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setSubmitting(true);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // One id is shared by the local post and the Supabase row so the two
    // stay in sync and React keys cannot collide.
    const postId = Date.now();

    const newPost: Post = {
      id: postId,
      type: postType,
      title: title.trim(),
      body: body.trim(),
      tags: tags.length > 0 ? tags : ["General", "Placement"],
      author: {
        name: user?.fullName || "Sinhgad Student",
        initials: user?.fullName
          ? user.fullName
              .trim()
              .split(/\s+/)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()
          : "SS",
        role: user?.branch || "Engineering Student",
        batch: "Batch 2026",
        avatarColor: "#0f766e",
      },
      timeAgo: "Just now",
      answers: 0,
      views: 1,
      votes: 0,
    };

    // Save to Supabase backend.
    // `company` is a company name column — tags are passed through the
    // question text instead of being written into it.
    await saveDbQuestion({
      id: `post-${postId}`,
      questionText: `[${newPost.type}] ${newPost.title} — ${newPost.body} (tags: ${newPost.tags.join(", ")})`,
      company: undefined,
      authorName: newPost.author.name,
      authorBranch: newPost.author.role,
    });

    // Functional updater: `postsList` here is the value captured before the
    // await above, so a vote cast during the write would be lost.
    setPostsList((prev) => [newPost, ...prev]);
    setSubmitting(false);
    setIsModalOpen(false);
    setTitle("");
    setBody("");
    setTagsInput("");
    setPostType("Question");
  };

  return (
    <div className="bg-canvas min-h-screen text-slate-900 font-sans flex flex-col justify-between">
      <Navbar
        activeTab="ask-share"
        onNavigate={onNavigate}
        user={user}
        onLogout={onLogout}
        onSearchClick={() => document.getElementById("asknshare-search")?.focus()}
      />

      {/* NAVY HERO */}
      <section className="relative overflow-hidden bg-[#0f2747] border-b border-[#c9a227]/20">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#c9a227]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-14">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 bg-[#c9a227]/10 backdrop-blur-md border border-[#c9a227]/30 rounded-full px-4 py-1.5 mb-5">
                <MessageSquare className="w-3.5 h-3.5 text-[#dcb443]" />
                <span className="text-xs font-medium text-[#fef3c7]/80">
                  Student-driven knowledge exchange
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#dcb443] mb-3 tracking-tight leading-tight">
                Ask & Share
              </h1>
              <p className="text-base sm:text-xl text-[#fef3c7]/90 mb-3 font-medium">
                Questions. Discussions. Experiences.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-[#fef3c7]/60 max-w-2xl leading-relaxed mb-6">
                Ask your doubts, share your interview experiences, and help your peers — whether you are a current
                student or an alumnus. Every question and experience matters!
              </p>

              <div className="flex bg-white rounded-2xl shadow-2xl border-2 border-[#c9a227]/30 hover:border-[#c9a227]/60 transition-all overflow-hidden max-w-xl">
                <div className="flex items-center pl-5 text-[#c9a227]">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  id="asknshare-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearchSubmit();
                    }
                  }}
                  placeholder="Search questions, interview discussions, topics..."
                  className="flex-1 px-3 py-3.5 text-xs sm:text-sm outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="bg-[#c9a227] hover:bg-[#dcb443] text-[#0f2747] px-6 text-xs sm:text-sm font-bold transition cursor-pointer"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 hidden lg:flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-[#dcb443]/20 to-[#c9a227]/10 rounded-3xl rotate-3" />
                <div className="relative bg-gradient-to-br from-[#c9a227]/20 to-[#c9a227]/10 backdrop-blur-sm border border-[#c9a227]/30 rounded-3xl p-8 text-center">
                  <div className="flex justify-center gap-3 mb-4">
                    <MessageSquare className="w-10 h-10 text-[#dcb443]" />
                    <MessageCircle className="w-10 h-10 text-[#dcb443]" />
                  </div>
                  <p className="text-[#dcb443] font-bold text-lg mb-1">Ask. Discuss. Grow.</p>
                  <p className="text-xs text-[#fef3c7]/70">
                    Help each other succeed — one question at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STRIP */}
      <section className="bg-white border-b border-[#c9a227]/30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-700">
              <span className="font-bold text-[#0f2747]">42</span> questions answered today
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#c9a227]" />
              <span className="font-semibold text-[#0f2747]">156</span> posts this month
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#c9a227]" />
              Trending: <span className="font-semibold text-[#0f2747]">TCS Interview, Resume Review</span>
            </span>
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="bg-white border-b border-[#c9a227]/30 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => {
              const count =
                f.label === "All Posts"
                  ? postsList.length
                  : postsList.filter((p) => p.type === f.label.slice(0, -1)).length;

              return (
                <button
                  key={f.label}
                  onClick={() => setActiveFilter(f.label)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
                    activeFilter === f.label
                      ? "bg-[#0f2747] text-[#dcb443] shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-[#c9a227] hover:text-[#c9a227]"
                  }`}
                >
                  {f.label}
                  <span
                    className={`ml-1.5 text-[10px] ${
                      activeFilter === f.label ? "text-[#c9a227]/80" : "text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#c9a227] hover:bg-[#dcb443] text-[#0f2747] font-bold text-xs sm:text-sm transition shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Ask or Share
          </button>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-2 mb-5">
            {categoryChips.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedChip(selectedChip === c ? null : c)}
                className={`px-3 py-1 text-xs font-medium rounded-full border transition cursor-pointer ${
                  selectedChip === c
                    ? "bg-[#0f2747] text-[#c9a227] border-[#0f2747]"
                    : "bg-white border-slate-200 text-slate-600 hover:border-[#c9a227]/60 hover:text-[#c9a227]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-4" id="asknshare-results">
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No posts found</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Try another keyword or be the first to start a discussion!
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 px-4 py-2 bg-[#0f2747] text-white text-xs font-semibold rounded-lg hover:bg-[#22406A] transition cursor-pointer"
                >
                  Create Post
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onVote={handleVote} />
              ))
            )}
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:col-span-1 space-y-5 lg:sticky lg:top-24 self-start">
          <div className="space-y-2">
            <button
              onClick={() => {
                setPostType("Question");
                setIsModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#0f2747] hover:bg-[#22406a] text-[#dcb443] font-bold py-3 rounded-xl transition shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Ask a Question
            </button>
            <button
              onClick={() => {
                setPostType("Experience");
                setIsModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#c9a227] hover:bg-[#dcb443] text-[#0f2747] font-bold py-3 rounded-xl transition shadow-lg cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Share Your Experience
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-[#0f2747] mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#c9a227]" /> Community at a Glance
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#c9a227]/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-[#c9a227]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#0f2747] leading-tight">{communityStats.totalPosts}</p>
                  <p className="text-xs text-slate-500">Total Posts</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#0f2747] leading-tight">
                    {(communityStats.totalAnswers / 1000).toFixed(1)}K
                  </p>
                  <p className="text-xs text-slate-500">Answers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="w-5 h-5 text-brand-blue" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#0f2747] leading-tight">{communityStats.students}</p>
                  <p className="text-xs text-slate-500">Students & Alumni</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#c9a227]/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#c9a227] fill-[#c9a227]" />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#0f2747] leading-tight">
                    {communityStats.helpfulPercentage}%
                  </p>
                  <p className="text-xs text-slate-500">Helpful Responses</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-[#0f2747] mb-4 text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-[#c9a227]" /> Top Contributors
            </h3>
            <ol className="space-y-3">
              {topContributors.map((c) => (
                <li key={c.name} className="flex items-center gap-3 text-sm">
                  <span className="text-lg">{c.badge}</span>
                  <span className="flex-1 font-medium text-slate-800 truncate">{c.name}</span>
                  <span className="text-xs text-slate-500">{c.answers}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-[#0f2747] mb-4 text-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#c9a227]" /> Trending Topics
            </h3>
            <ol className="space-y-3">
              {trendingTopics.map((t, i) => (
                <li key={t.name} className="flex items-center gap-3 text-sm">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    i === 0 ? "bg-[#c9a227] text-[#0f2747]" :
                    i === 1 ? "bg-slate-200 text-slate-700" :
                    i === 2 ? "bg-[#c9a227]/20 text-[#c9a227]" :
                    "bg-slate-100 text-slate-500"
                  }`}>{i + 1}</span>
                  <span className="flex-1 font-medium text-slate-800 truncate">{t.name}</span>
                  <span className="text-xs text-slate-500">{t.posts}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-bold text-[#0f2747] mb-4 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Community Guidelines
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                Be respectful and supportive
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                Share honest and genuine experiences
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                Avoid sharing sensitive information
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                Help others grow
              </li>
            </ul>
          </div>

          <div className="bg-[#0f2747] rounded-2xl p-5 text-[#dcb443] relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#c9a227]/20 rounded-full blur-3xl" />
            <Quote className="absolute top-3 right-3 w-8 h-8 text-[#c9a227]/30" />
            <p className="text-sm italic mb-3 leading-relaxed relative z-10 text-[#fef3c7]/80">
              "A supportive community builds brighter futures."
            </p>
            <p className="text-xs text-[#fef3c7]/80 font-semibold tracking-wide">
              — SAEConnect
            </p>
          </div>
        </aside>
      </section>

      {/* FOOTER */}
      <Footer onNavigate={onNavigate} />

      {/* CREATE POST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#0f2747]">
                Create a Community Post
              </h3>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Post Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Question", "Experience", "Discussion"] as PostType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPostType(type)}
                      className={`py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                        postType === type
                          ? "bg-[#0f2747] text-[#dcb443] border-[#0f2747]"
                          : "bg-canvas text-slate-600 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. TCS Technical Round Experience or DBMS Queries asked"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-[#c9a227] focus:ring-2 focus:ring-[#c9a227]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Description / Body
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Share details, interview rounds, questions asked, or specific doubts..."
                  rows={4}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-[#c9a227] focus:ring-2 focus:ring-[#c9a227]/20 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. TCS, Technical, DSA, DBMS"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm outline-none focus:border-[#c9a227] focus:ring-2 focus:ring-[#c9a227]/20"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#0f2747] text-[#dcb443] font-bold text-xs hover:bg-[#22406A] transition shadow-md cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? "Posting..." : "Publish Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}