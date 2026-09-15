import { companies, platformStats } from "../lib/mockData";
import CompanyCard from "../components/CompanyCard";
import StatCard from "../components/StatCard";
import Navbar from "../components/Navbar";
import {
    Search, Building2, FileText, Users, Star, TrendingUp,
    Quote, Activity, Flame, MessageSquare
} from "lucide-react";

type NavTab = "home" | "experiences" | "companies" | "ask-share" | "insights" | "about";

interface Props {
    onViewCompany: (slug: string) => void;
    onNavigate: (tab: NavTab) => void;
}

const categories = [
    { label: "All Companies", count: 120, active: true },
    { label: "IT", count: 68 },
    { label: "Core", count: 18 },
    { label: "Product", count: 12 },
    { label: "Finance", count: 8 },
    { label: "Consulting", count: 6 },
    { label: "Startups", count: 10 },
    { label: "Other", count: 18 },
];

export default function Companies({ onViewCompany, onNavigate }: Props) {
    const topCompanies = [...companies].sort((a, b) => b.experiences - a.experiences).slice(0, 5);
    const trendingCompanies = [...companies].sort((a, b) => b.rating - a.rating).slice(0, 3);

    return (
        <div className="bg-stone-50 min-h-screen">
            {/* ═══════ NAVBAR ═══════ */}
            <Navbar activeTab="companies" onNavigate={onNavigate} />

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
                    <div className="text-center max-w-4xl mx-auto mb-8">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-amber-50 mb-4 tracking-tight leading-tight">
                            Companies
                        </h1>
                        <p className="text-lg md:text-xl text-amber-200/90 mb-3 font-medium">
                            Explore placement experiences company-wise
                        </p>
                        <p className="text-sm md:text-base text-amber-100/60 max-w-2xl mx-auto leading-relaxed">
                            Discover real interview experiences, rounds, questions, selection rates and preparation tips shared by Sinhgad students and alumni.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto">
                        <div className="flex bg-white rounded-2xl shadow-2xl border-2 border-amber-500/30 hover:border-amber-500/60 transition-all overflow-hidden">
                            <div className="flex items-center pl-5 text-amber-600">
                                <Search className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search companies (e.g. TCS, Infosys, Accenture...)"
                                className="flex-1 px-3 py-4 text-sm outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
                            />
                            <button className="bg-amber-600 hover:bg-amber-500 text-[#1a2332] px-8 text-sm font-bold transition">
                                Search
                            </button>
                        </div>
                    </div>


                </div>
            </section>

            {/* ═══════ LIVE ACTIVITY STRIP ═══════ */}
            <section className="bg-white border-b border-amber-100">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-medium text-slate-700">
                            <span className="font-bold text-[#1a2332]">87</span> students viewing now
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                            <Activity className="w-3.5 h-3.5 text-amber-600" />
                            <span className="font-semibold text-[#1a2332]">12</span> new experiences today
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-orange-500" />
                            Trending: <span className="font-semibold text-[#1a2332]">TCS, Infosys</span>
                        </span>
                    </div>
                </div>
            </section>

            {/* ═══════ FILTERS + SORT ═══════ */}
            <section className="bg-white border-b border-amber-100 sticky top-16 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((c) => (
                            <button
                                key={c.label}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${c.active
                                    ? "bg-[#1a2332] text-amber-100 shadow-sm"
                                    : "bg-white text-slate-700 border border-slate-200 hover:border-amber-500 hover:text-amber-700"
                                    }`}
                            >
                                {c.label} <span className="opacity-60">({c.count})</span>
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-500">Sort by:</span>
                        <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 font-medium outline-none focus:border-amber-500">
                            <option>Most Experiences</option>
                            <option>Highest Rating</option>
                            <option>Recently Added</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* ═══════ SECTION TITLE ═══════ */}
            <section className="max-w-7xl mx-auto px-6 pt-8">
                <div className="flex items-end justify-between mb-1">
                    <div>
                        <h2 className="text-2xl font-bold text-[#1a2332]">Explore Companies</h2>
                        <p className="text-sm text-slate-500 mt-1">
                            {companies.length} companies with placement experiences from Sinhgad students
                        </p>
                    </div>
                    <span className="text-xs text-slate-400 hidden md:block">
                        Updated daily by our community
                    </span>
                </div>
            </section>

            {/* ═══════ MAIN GRID + SIDEBAR ═══════ */}
            <section className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {companies.map((c) => (
                        <CompanyCard key={c.slug} company={c} onViewDetails={onViewCompany} />
                    ))}
                </div>

                <aside className="lg:col-span-1 space-y-5 lg:sticky lg:top-24 self-start">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <h3 className="font-bold text-[#1a2332] mb-4 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-amber-600" /> Company Insights
                        </h3>
                        <div className="space-y-2">
                            <StatCard icon={Building2} value={platformStats.companies} label="Companies" color="text-[#1a2332] bg-amber-100" />
                            <StatCard icon={FileText} value={`${platformStats.totalExperiences.toLocaleString()}+`} label="Total Experiences" color="text-emerald-600 bg-emerald-50" />
                            <StatCard icon={Users} value={`${platformStats.contributors}+`} label="Students & Alumni" color="text-[#1a2332] bg-amber-50" />
                            <StatCard icon={Star} value={`${platformStats.avgRating}/5`} label="Average Rating" color="text-amber-600 bg-amber-50" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <h3 className="font-bold text-[#1a2332] mb-4 text-sm flex items-center gap-2">
                            <Flame className="w-4 h-4 text-orange-500" /> Trending Now
                        </h3>
                        <div className="space-y-3">
                            {trendingCompanies.map((c) => (
                                <div key={c.slug} className="flex items-center gap-3 text-sm">
                                    <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c.logoColor }}>
                                        {c.name[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-800 truncate text-xs">{c.name}</p>
                                        <p className="text-[10px] text-slate-500">{c.rating}/5 · {c.experiences} exp</p>
                                    </div>
                                    <span className="text-xs">🔥</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <h3 className="font-bold text-[#1a2332] mb-4 text-sm">Top Companies</h3>
                        <ol className="space-y-3">
                            {topCompanies.map((c, i) => (
                                <li key={c.slug} className="flex items-center gap-3 text-sm">
                                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? "bg-amber-500 text-[#1a2332]" :
                                        i === 1 ? "bg-slate-200 text-slate-700" :
                                            i === 2 ? "bg-amber-200 text-amber-900" :
                                                "bg-slate-100 text-slate-500"
                                        }`}>{i + 1}</span>
                                    <span className="flex-1 font-medium text-slate-800 truncate">{c.name}</span>
                                    <span className="text-slate-500 font-semibold text-xs">{c.experiences}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="bg-[#1a2332] rounded-2xl p-5 text-amber-50 relative overflow-hidden">
                        <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
                        <Quote className="absolute top-3 right-3 w-8 h-8 text-amber-500/30" />
                        <p className="text-sm italic mb-3 leading-relaxed relative z-10 text-amber-100">
                            "Every company experience shared here helps someone prepare better tomorrow."
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