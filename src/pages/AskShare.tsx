import { useState } from "react";
import {
    Search, MessageSquare, TrendingUp, Users, Star, CheckCircle2,
    ArrowLeft, Plus, Award, Quote, Flame, ShieldCheck, HelpCircle,
    Lightbulb, MessageCircle, ArrowRight
} from "lucide-react";
import { posts, topContributors, trendingTopics, communityStats } from "../lib/askShareData";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

type NavTab = "home" | "experiences" | "companies" | "ask-share" | "insights" | "about";

interface Props {
    onBack: () => void;
    onNavigate: (tab: NavTab) => void;
}

const filters = [
    { label: "All Posts", count: 324 },
    { label: "Questions", count: 218 },
    { label: "Experiences", count: 76 },
    { label: "Discussions", count: 30 },
];

const categoryChips = [
    "Technical", "HR", "Aptitude", "Resume", "Coding",
    "Company-specific", "Preparation Tips"
];

export default function AskShare({ onBack, onNavigate }: Props) {
    const [activeFilter, setActiveFilter] = useState("All Posts");

    return (
        <div className="bg-stone-50 min-h-screen">
            {/* ═══════ NAVBAR ═══════ */}
            <Navbar activeTab="ask-share" onNavigate={onNavigate} />

            {/* ═══════ NAVY HERO ═══════ */}
            <section className="relative overflow-hidden bg-[#1a2332] border-b border-amber-500/20">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201, 169, 97, 0.5) 1px, transparent 0)",
                        backgroundSize: "24px 24px",
                    }}
                />

                <div className="relative max-w-7xl mx-auto px-6 py-14">
                    <div className="grid lg:grid-cols-5 gap-8 items-center">
                        {/* LEFT: Text + Search */}
                        <div className="lg:col-span-3">
                            <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-md border border-amber-500/30 rounded-full px-4 py-1.5 mb-5">
                                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-xs font-medium text-amber-200">
                                    Student-driven knowledge exchange
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold text-amber-50 mb-3 tracking-tight leading-tight">
                                Ask & Share
                            </h1>
                            <p className="text-lg md:text-xl text-amber-200/90 mb-3 font-medium">
                                Questions. Discussions. Experiences.
                            </p>
                            <p className="text-sm md:text-base text-amber-100/60 max-w-2xl leading-relaxed mb-6">
                                Ask your doubts, share your experiences, and help your peers — whether you are a current
                                student or an alumnus. Every question and experience matters!
                            </p>

                            {/* Search */}
                            <div className="flex bg-white rounded-2xl shadow-2xl border-2 border-amber-500/30 hover:border-amber-500/60 transition-all overflow-hidden max-w-xl">
                                <div className="flex items-center pl-5 text-amber-600">
                                    <Search className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search questions, discussions (e.g. TCS interview, resume tips...)"
                                    className="flex-1 px-3 py-4 text-sm outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
                                />
                                <button className="bg-amber-600 hover:bg-amber-500 text-[#1a2332] px-6 text-sm font-bold transition">
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* RIGHT: Illustration */}
                        <div className="lg:col-span-2 hidden lg:flex justify-center">
                            <div className="relative w-full max-w-sm">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-3xl rotate-3" />
                                <div className="relative bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur-sm border border-amber-500/30 rounded-3xl p-8 text-center">
                                    <div className="flex justify-center gap-3 mb-4">
                                        <MessageSquare className="w-10 h-10 text-amber-400" />
                                        <MessageCircle className="w-10 h-10 text-amber-300" />
                                    </div>
                                    <p className="text-amber-100 font-bold text-lg mb-1">Ask. Discuss. Grow.</p>
                                    <p className="text-xs text-amber-200/70">
                                        Help each other succeed — one question at a time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            </section>

            {/* ═══════ LIVE STRIP ═══════ */}
            <section className="bg-white border-b border-amber-100">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-medium text-slate-700">
                            <span className="font-bold text-[#1a2332]">42</span> questions answered today
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                            <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                            <span className="font-semibold text-[#1a2332]">156</span> posts this month
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-orange-500" />
                            Trending: <span className="font-semibold text-[#1a2332]">TCS Interview, Resume Review</span>
                        </span>
                    </div>
                </div>
            </section>

            {/* ═══════ FILTER TABS ═══════ */}
            <section className="bg-white border-b border-amber-100 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {filters.map((f) => (
                            <button
                                key={f.label}
                                onClick={() => setActiveFilter(f.label)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeFilter === f.label
                                        ? "bg-[#1a2332] text-amber-100 shadow-sm"
                                        : "bg-white text-slate-700 border border-slate-200 hover:border-amber-500 hover:text-amber-700"
                                    }`}
                            >
                                {f.label} <span className="opacity-60">({f.count})</span>
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-500">Sort by:</span>
                        <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 font-medium outline-none focus:border-amber-500">
                            <option>Most Recent</option>
                            <option>Most Votes</option>
                            <option>Unanswered</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* ═══════ MAIN CONTENT ═══════ */}
            <section className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-4 gap-6">
                {/* LEFT: Posts List */}
                <div className="lg:col-span-3">
                    {/* Category chips */}
                    <div className="flex flex-wrap gap-2 mb-5">
                        {categoryChips.map((c) => (
                            <button
                                key={c}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-white border border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-700 transition"
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    {/* Post Cards */}
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex items-center justify-center gap-2">
                        <button className="w-9 h-9 rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-600 transition text-sm">
                            ←
                        </button>
                        {[1, 2, 3, 4, 5].map((n) => (
                            <button
                                key={n}
                                className={`w-9 h-9 rounded-lg border text-sm font-semibold transition ${n === 1
                                        ? "bg-[#1a2332] text-amber-100 border-[#1a2332]"
                                        : "border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-600"
                                    }`}
                            >
                                {n}
                            </button>
                        ))}
                        <span className="text-slate-400 px-1">...</span>
                        <button className="w-9 h-9 rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-600 transition text-sm">
                            33
                        </button>
                        <button className="w-9 h-9 rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-600 transition text-sm">
                            →
                        </button>
                    </div>
                </div>

                {/* RIGHT: Sidebar */}
                <aside className="lg:col-span-1 space-y-5 lg:sticky lg:top-24 self-start">
                    {/* CTA Buttons */}
                    <div className="space-y-2">
                        <button className="w-full flex items-center justify-center gap-2 bg-[#1a2332] hover:bg-[#2a3450] text-amber-100 font-bold py-3 rounded-xl transition shadow-lg">
                            <Plus className="w-4 h-4" />
                            Ask a Question
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#1a2332] font-bold py-3 rounded-xl transition shadow-lg">
                            <Plus className="w-4 h-4" />
                            Share Your Experience
                        </button>
                    </div>

                    {/* Community Stats */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <h3 className="font-bold text-[#1a2332] mb-4 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-amber-600" /> Community at a Glance
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-amber-700" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-[#1a2332] leading-tight">{communityStats.totalPosts}</p>
                                    <p className="text-xs text-slate-500">Total Posts</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-[#1a2332] leading-tight">
                                        {(communityStats.totalAnswers / 1000).toFixed(1)}K
                                    </p>
                                    <p className="text-xs text-slate-500">Answers</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-[#1a2332] leading-tight">{communityStats.students}</p>
                                    <p className="text-xs text-slate-500">Students & Alumni</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-[#1a2332] leading-tight">
                                        {communityStats.helpfulPercentage}%
                                    </p>
                                    <p className="text-xs text-slate-500">Helpful Responses</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Contributors */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <h3 className="font-bold text-[#1a2332] mb-4 text-sm flex items-center gap-2">
                            <Award className="w-4 h-4 text-amber-600" /> Top Contributors
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

                    {/* Trending Topics */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <h3 className="font-bold text-[#1a2332] mb-4 text-sm flex items-center gap-2">
                            <Flame className="w-4 h-4 text-orange-500" /> Trending Topics
                        </h3>
                        <ol className="space-y-3">
                            {trendingTopics.map((t, i) => (
                                <li key={t.name} className="flex items-center gap-3 text-sm">
                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? "bg-amber-500 text-[#1a2332]" :
                                            i === 1 ? "bg-slate-200 text-slate-700" :
                                                i === 2 ? "bg-amber-200 text-amber-900" :
                                                    "bg-slate-100 text-slate-500"
                                        }`}>{i + 1}</span>
                                    <span className="flex-1 font-medium text-slate-800 truncate">{t.name}</span>
                                    <span className="text-xs text-slate-500">{t.posts}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    {/* Guidelines */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <h3 className="font-bold text-[#1a2332] mb-4 text-sm flex items-center gap-2">
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
                                No spam or promotional content
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                Help others grow
                            </li>
                        </ul>
                    </div>

                    {/* Quote */}
                    <div className="bg-[#1a2332] rounded-2xl p-5 text-amber-50 relative overflow-hidden">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
                        <Quote className="absolute top-3 right-3 w-8 h-8 text-amber-500/30" />
                        <p className="text-sm italic mb-3 leading-relaxed relative z-10 text-amber-100">
                            "A supportive community builds brighter futures."
                        </p>
                        <p className="text-xs text-amber-400 font-semibold tracking-wide">
                            — SINHGAD PLACEMENT HUB
                        </p>
                    </div>
                </aside>
            </section>
        </div>
    );
}