import { companies, topTopics } from "../lib/mockData";
import TagChip from "../components/TagChip";
import StatCard from "../components/StatCard";
import RoundTimeline from "../components/RoundTimeline";
import {
    Calendar, Users, Building2, MapPin, Star,
    CheckCircle2, TrendingUp, ArrowLeft, Bookmark
} from "lucide-react";

interface Props {
    slug: string;
    onBack: () => void;
}

export default function CompanyDetails({ slug, onBack }: Props) {
    const company = companies.find((c) => c.slug === slug);

    if (!company) {
        return (
            <div className="bg-stone-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-bold text-[#1a2332] mb-4">Company not found</p>
                    <button
                        onClick={onBack}
                        className="bg-[#1a2332] text-amber-100 px-6 py-3 rounded-lg font-semibold"
                    >
                        Back to Companies
                    </button>
                </div>
            </div>
        );
    }

    const difficultyColors: Record<string, string> = {
        Easy: "bg-emerald-500",
        Medium: "bg-amber-500",
        Hard: "bg-red-500",
    };

    return (
        <div className="bg-stone-50 min-h-screen">
            {/* NAVY HERO */}
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

                <div className="relative max-w-7xl mx-auto px-6 py-10">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center gap-2 text-amber-200/80 hover:text-amber-400 text-sm mb-6 transition"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Companies
                    </button>

                    <div className="flex flex-wrap items-start gap-5">
                        <div className="w-20 h-20 rounded-2xl bg-white border-2 border-amber-500/30 flex items-center justify-center p-3 shadow-xl">
                            <img
                                src={company.logoPath}
                                alt={`${company.name} logo`}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <div className="flex-1 min-w-[240px]">
                            <h1 className="text-4xl font-bold text-amber-50 mb-1">{company.name}</h1>
                            <p className="text-amber-200/80 mb-4 italic">{company.tagline}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-amber-100/90">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-amber-400" />
                                    <span className="font-semibold text-amber-300">{company.experiences}</span> Experiences
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Users className="w-4 h-4 text-emerald-400" />
                                    <span className="font-semibold text-amber-300">{company.placed}</span> Placed
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    <span className="font-semibold text-amber-300">{company.rating}</span>/5
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-rose-400" />
                                    Pune / Pan India
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="bg-amber-500 hover:bg-amber-400 text-[#1a2332] font-bold px-5 py-2.5 rounded-lg text-sm transition shadow-lg">
                                Follow Company
                            </button>
                            <button className="bg-transparent border border-amber-500/40 hover:border-amber-500 hover:bg-amber-500/10 text-amber-200 font-semibold px-4 py-2.5 rounded-lg text-sm transition flex items-center gap-2">
                                <Bookmark className="w-4 h-4" /> Save
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAIN GRID */}
            <section className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <RoundTimeline />

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <h3 className="font-bold text-[#1a2332] mb-5 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-amber-600" /> Common Questions
                        </h3>
                        <div className="space-y-3">
                            {[
                                { q: "Explain SQL joins with examples", freq: 82 },
                                { q: "What is normalization? 1NF, 2NF, 3NF", freq: 74 },
                                { q: "Difference between OOP and Procedural programming", freq: 68 },
                                { q: "Write a program to reverse a linked list", freq: 61 },
                                { q: "Explain DBMS ACID properties", freq: 55 },
                            ].map((item) => (
                                <div key={item.q} className="border border-slate-200 rounded-lg p-3">
                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <p className="text-sm font-medium text-slate-800">{item.q}</p>
                                        <span className="text-xs font-semibold text-amber-700 whitespace-nowrap">
                                            {item.freq}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                                            style={{ width: `${item.freq}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <h3 className="font-bold text-[#1a2332] mb-5">Recent Experiences</h3>
                        <div className="space-y-4">
                            {[
                                { name: "Rahul S.", role: "Software Developer", outcome: "Selected", rating: 5, excerpt: "5 rounds. Technical focused on SQL joins and OOP. Coding was medium." },
                                { name: "Priya M.", role: "Systems Engineer", outcome: "Selected", rating: 4, excerpt: "Aptitude was easy but coding round had tricky DSA. HR was smooth." },
                                { name: "Aditya K.", role: "Digital Specialist", outcome: "Rejected", rating: 3, excerpt: "Got rejected in Technical round. Struggled with DBMS normalization." },
                            ].map((exp, i) => (
                                <div key={i} className="border border-slate-200 rounded-lg p-4 hover:border-amber-400/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-[#1a2332] flex items-center justify-center text-amber-300 font-bold text-xs">
                                                {exp.name.split(" ").map((n) => n[0]).join("")}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">{exp.name}</p>
                                                <p className="text-xs text-slate-500">{exp.role}</p>
                                            </div>
                                        </div>
                                        <span
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${exp.outcome === "Selected"
                                                    ? "bg-emerald-50 text-emerald-700"
                                                    : "bg-red-50 text-red-700"
                                                }`}
                                        >
                                            {exp.outcome}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 mb-3">{exp.excerpt}</p>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-amber-500">{"★".repeat(exp.rating)}{"☆".repeat(5 - exp.rating)}</span>
                                        <button className="text-xs font-semibold text-amber-700 hover:underline">
                                            Read full experience →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="lg:col-span-1 space-y-5">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <h3 className="font-bold text-[#1a2332] mb-4 text-sm">Quick Stats</h3>
                        <div className="space-y-3">
                            <StatCard icon={Building2} value={company.experiences} label="Experiences" />
                            <StatCard icon={CheckCircle2} value={company.placed} label="Students Placed" color="text-emerald-700 bg-emerald-50" />
                            <StatCard icon={Star} value={`${company.rating}/5`} label="Avg Rating" color="text-amber-700 bg-amber-50" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <h3 className="font-bold text-[#1a2332] mb-4 text-sm">Most Mentioned Topics</h3>
                        <ol className="space-y-3">
                            {topTopics.map((t, i) => (
                                <li key={t.name} className="flex items-center gap-3 text-sm">
                                    <span className="text-amber-600 font-bold w-4">{i + 1}</span>
                                    <span className="flex-1 font-medium text-slate-800">{t.name}</span>
                                    <span className="text-xs text-slate-500">{t.mentions}</span>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <h3 className="font-bold text-[#1a2332] mb-4 text-sm">Difficulty by Topic</h3>
                        <div className="space-y-3">
                            {topTopics.map((t) => (
                                <div key={t.name}>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="font-medium text-slate-700">{t.name}</span>
                                        <span className="text-slate-500">{t.difficulty}</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${difficultyColors[t.difficulty]}`}
                                            style={{
                                                width: t.difficulty === "Hard" ? "90%" : t.difficulty === "Medium" ? "60%" : "30%",
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5">
                        <h3 className="font-bold text-[#1a2332] mb-4 text-sm">Popular Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {company.tags.map((t) => (
                                <TagChip key={t} label={t} />
                            ))}
                        </div>
                    </div>
                </aside>
            </section>
        </div>
    );
}