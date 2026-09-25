import { useState } from 'react';
import {
    Building2,
    Users,
    Award,
    FileText,
    CheckCircle2,
    TrendingUp,
    Heart,
    Sparkles,
    Zap,
} from 'lucide-react';

export default function InsightsPage() {
    const [activeSubTab, setActiveSubTab] = useState('Overview');

    return (
        <div className="space-y-8">
            {/* Dark Hero Banner */}
            <section className="bg-[#0F172A] text-white py-12 px-6 rounded-2xl shadow-md">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 text-amber-400 text-xs px-3 py-1 rounded-full mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Data-Driven Placement Analytics</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Placement Insights
                    </h1>
                    <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto mb-6">
                        Explore trends, popular topics, company statistics, and placement patterns based on experiences shared by Sinhgad students and alumni.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {['Overview', 'Company Trends', 'Interview Insights', 'Popular Topics', 'Student Outcomes'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveSubTab(tab)}
                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSubTab === tab
                                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                                    : 'bg-slate-800/80 text-slate-300 border border-slate-700 hover:bg-slate-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
                    <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-slate-900">120</p>
                        <p className="text-xs text-slate-500">Companies Covered</p>
                        <span className="text-[10px] font-bold text-emerald-600">↑ 15% vs last year</span>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center font-bold">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-slate-900">2,500+</p>
                        <p className="text-xs text-slate-500">Placement Experiences</p>
                        <span className="text-[10px] font-bold text-emerald-600">↑ 28% vs last year</span>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-slate-900">580+</p>
                        <p className="text-xs text-slate-500">Students & Alumni Contributed</p>
                        <span className="text-[10px] font-bold text-emerald-600">↑ 32% vs last year</span>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-100 text-purple-800 rounded-xl flex items-center justify-center font-bold">
                        <Award className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-slate-900">3.6 / 5</p>
                        <p className="text-xs text-slate-500">Average Difficulty Rating</p>
                        <span className="text-[10px] font-bold text-amber-600">Moderate Overall</span>
                    </div>
                </div>
            </div>

            {/* Main Charts & Breakdown Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Charts */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Top Companies Chart Card */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="font-bold text-slate-900 text-base">Top Companies by Shared Experiences</h3>
                                <p className="text-xs text-slate-500">Most active campus recruiters in recent drives</p>
                            </div>
                            <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-semibold">
                                Batch 2025 - 2026
                            </span>
                        </div>

                        <div className="space-y-3">
                            {[
                                { name: 'TCS', count: 428, color: 'bg-blue-600', max: 500 },
                                { name: 'Infosys', count: 356, color: 'bg-sky-500', max: 500 },
                                { name: 'Accenture', count: 312, color: 'bg-purple-600', max: 500 },
                                { name: 'Persistent', count: 198, color: 'bg-orange-600', max: 500 },
                                { name: 'Capgemini', count: 174, color: 'bg-cyan-600', max: 500 },
                                { name: 'Wipro', count: 162, color: 'bg-teal-600', max: 500 },
                                { name: 'Cognizant', count: 138, color: 'bg-indigo-600', max: 500 },
                                { name: 'Tech Mahindra', count: 110, color: 'bg-red-600', max: 500 },
                            ].map((item) => (
                                <div key={item.name} className="space-y-1">
                                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                                        <span>{item.name}</span>
                                        <span>{item.count} posts</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${item.color} rounded-full transition-all duration-500`}
                                            style={{ width: `${(item.count / item.max) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interview Round Analysis Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Rounds Distribution */}
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                            <h3 className="font-bold text-slate-900 text-sm mb-4">Interview Round Breakdown</h3>
                            <div className="space-y-3">
                                {[
                                    { round: 'Aptitude Test', pct: '88%', label: 'First Filter Round' },
                                    { round: 'Technical Interview', pct: '92%', label: 'Core Concepts & Projects' },
                                    { round: 'Coding Assessment', pct: '64%', label: 'DSA & Algorithms' },
                                    { round: 'HR / Behavioral', pct: '78%', label: 'Culture & Communication' },
                                    { round: 'System Design', pct: '24%', label: 'Advanced Roles' },
                                ].map((r, i) => (
                                    <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                                        <div>
                                            <p className="text-xs font-bold text-slate-800">{r.round}</p>
                                            <p className="text-[10px] text-slate-400">{r.label}</p>
                                        </div>
                                        <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                                            {r.pct}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Student Outcomes */}
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                            <h3 className="font-bold text-slate-900 text-sm mb-4">Shared Student Outcomes</h3>
                            <div className="space-y-3">
                                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <CheckCircle2 className="w-4 h-4 text-amber-700" />
                                        <span className="text-xs font-bold text-amber-900">Selected / Offered</span>
                                    </div>
                                    <span className="text-sm font-black text-amber-900">42%</span>
                                </div>

                                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <TrendingUp className="w-4 h-4 text-blue-700" />
                                        <span className="text-xs font-bold text-blue-900">Interview Completed</span>
                                    </div>
                                    <span className="text-sm font-black text-blue-900">32%</span>
                                </div>

                                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        <Heart className="w-4 h-4 text-rose-700" />
                                        <span className="text-xs font-bold text-rose-900">Rejected / Feedback Shared</span>
                                    </div>
                                    <span className="text-sm font-black text-rose-900">26%</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Right Sidebar */}
                <div className="lg:col-span-4 space-y-6">

                    {/* Key Takeaways Card */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                        <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-amber-500" />
                            <span>Key Placement Takeaways</span>
                        </h3>
                        <ul className="space-y-2.5 text-xs text-slate-600">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                <span><strong>TCS, Infosys, and Accenture</strong> lead in the highest volume of shared experiences.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                <span><strong>SQL joins, OOPs principles, and Arrays/Strings DSA</strong> are the top 3 most repeated technical topics.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                <span>88% of candidates noted that clearing the <strong>time-bound Aptitude Round</strong> was crucial for shortlisting.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Popular Preparation Topics */}
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                        <h3 className="font-bold text-slate-900 text-sm mb-3">Popular Preparation Topics</h3>
                        <div className="space-y-2 text-xs">
                            {[
                                { name: 'Data Structures & Algorithms', count: '342 posts' },
                                { name: 'Aptitude & Logical Reasoning', count: '298 posts' },
                                { name: 'SQL & Database Management', count: '210 posts' },
                                { name: 'Object Oriented Programming (OOP)', count: '188 posts' },
                                { name: 'Operating Systems & Networks', count: '176 posts' },
                                { name: 'Resume & HR Preparation', count: '150 posts' },
                            ].map((topic, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                                    <span className="font-medium text-slate-700">{topic.name}</span>
                                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                                        {topic.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}