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
import Navbar, { type NavTab, type UserProfile } from './Navbar';
import Footer from './Footer';

interface InsightsProps {
    onNavigate?: (tab: NavTab) => void;
    user?: UserProfile | null;
    onLogout?: () => void;
}

type SubTab =
    | 'Overview'
    | 'Company Trends'
    | 'Interview Insights'
    | 'Popular Topics'
    | 'Student Outcomes';

const SUB_TABS: SubTab[] = [
    'Overview',
    'Company Trends',
    'Interview Insights',
    'Popular Topics',
    'Student Outcomes',
];

/** Identifiers for the stat cards, in render order. */
type StatKey = 'companies' | 'experiences' | 'students' | 'difficulty';

/** Identifiers for the content sections, in render order. */
type SectionKey =
    | 'companyChart'
    | 'roundBreakdown'
    | 'outcomes'
    | 'topics'
    | 'takeaways';

/**
 * Each sub-tab now scopes the view instead of only highlighting a button.
 * `stats` and `sections` list the cards shown for that tab, in order.
 */
const TAB_CONFIG: Record<SubTab, { stats: StatKey[]; sections: SectionKey[] }> = {
    Overview: {
        stats: ['companies', 'experiences', 'students', 'difficulty'],
        sections: ['companyChart', 'roundBreakdown', 'outcomes', 'topics', 'takeaways'],
    },
    'Company Trends': {
        stats: ['companies', 'experiences'],
        sections: ['companyChart', 'topics'],
    },
    'Interview Insights': {
        stats: ['difficulty', 'experiences'],
        sections: ['roundBreakdown', 'takeaways'],
    },
    'Popular Topics': {
        stats: ['experiences', 'students'],
        sections: ['topics', 'companyChart'],
    },
    'Student Outcomes': {
        stats: ['students', 'difficulty'],
        sections: ['outcomes', 'roundBreakdown'],
    },
};

const TOP_COMPANIES = [
    { name: 'TCS', count: 428, color: 'bg-brand-blue', max: 500 },
    { name: 'Infosys', count: 356, color: 'bg-sky-500', max: 500 },
    { name: 'Accenture', count: 312, color: 'bg-purple-600', max: 500 },
    { name: 'Persistent', count: 198, color: 'bg-[#c9a227]', max: 500 },
    { name: 'Capgemini', count: 174, color: 'bg-cyan-600', max: 500 },
    { name: 'Wipro', count: 162, color: 'bg-teal-600', max: 500 },
    { name: 'Cognizant', count: 138, color: 'bg-indigo-600', max: 500 },
    { name: 'Tech Mahindra', count: 110, color: 'bg-red-600', max: 500 },
];

const ROUND_BREAKDOWN = [
    { round: 'Aptitude Test', pct: '88%', label: 'First Filter Round' },
    { round: 'Technical Interview', pct: '92%', label: 'Core Concepts & Projects' },
    { round: 'Coding Assessment', pct: '64%', label: 'DSA & Algorithms' },
    { round: 'HR / Behavioral', pct: '78%', label: 'Culture & Communication' },
    { round: 'System Design', pct: '24%', label: 'Advanced Roles' },
];

const PREPARATION_TOPICS = [
    { name: 'Data Structures & Algorithms', count: '342 posts' },
    { name: 'Aptitude & Logical Reasoning', count: '298 posts' },
    { name: 'SQL & Database Management', count: '210 posts' },
    { name: 'Object Oriented Programming (OOP)', count: '188 posts' },
    { name: 'Operating Systems & Networks', count: '176 posts' },
    { name: 'Resume & HR Preparation', count: '150 posts' },
];

const OUTCOMES = [
    {
        label: 'Selected / Offered',
        pct: '42%',
        icon: CheckCircle2,
        box: 'bg-[#c9a227]/10 border-[#c9a227]/30',
        iconColor: 'text-[#c9a227]',
        textColor: 'text-[#c9a227]',
    },
    {
        label: 'Interview Completed',
        pct: '32%',
        icon: TrendingUp,
        box: 'bg-blue-50 border-blue-200',
        iconColor: 'text-brand-blue',
        textColor: 'text-blue-900',
    },
    {
        label: 'Rejected / Feedback Shared',
        pct: '26%',
        icon: Heart,
        box: 'bg-rose-50 border-rose-200',
        iconColor: 'text-rose-700',
        textColor: 'text-rose-900',
    },
];

export default function InsightsPage({
    onNavigate = () => {},
    user,
    onLogout,
}: InsightsProps) {
    const [activeSubTab, setActiveSubTab] = useState<SubTab>('Overview');

    const { stats, sections } = TAB_CONFIG[activeSubTab];
    const show = <K extends StatKey | SectionKey>(key: K, list: K[]) =>
        list.includes(key);

    return (
        <div className="min-h-screen bg-canvas text-slate-900 font-sans flex flex-col justify-between">
            <Navbar
                activeTab="insights"
                onNavigate={onNavigate}
                user={user}
                onLogout={onLogout}
                onSearchClick={() => onNavigate('experiences')}
            />

            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
                {/* Dark Hero Banner */}
                <section className="bg-[#0F2747] text-white py-12 px-6 rounded-2xl shadow-md">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 text-[#dcb443] text-xs px-3 py-1 rounded-full mb-4">
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
                            {SUB_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveSubTab(tab)}
                                    aria-pressed={activeSubTab === tab}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeSubTab === tab
                                        ? 'bg-[#c9a227] text-slate-950 shadow-sm'
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
                    {show('companies', stats) && (
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
                            <div className="w-12 h-12 bg-[#c9a227]/10 text-[#c9a227] rounded-xl flex items-center justify-center font-bold">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900">120</p>
                                <p className="text-xs text-slate-500">Companies Covered</p>
                                <span className="text-[10px] font-bold text-emerald-600">&uarr; 15% vs last year</span>
                            </div>
                        </div>
                    )}

                    {show('experiences', stats) && (
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center font-bold">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900">2,500+</p>
                                <p className="text-xs text-slate-500">Placement Experiences</p>
                                <span className="text-[10px] font-bold text-emerald-600">&uarr; 28% vs last year</span>
                            </div>
                        </div>
                    )}

                    {show('students', stats) && (
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900">580+</p>
                                <p className="text-xs text-slate-500">Students &amp; Alumni Contributed</p>
                                <span className="text-[10px] font-bold text-emerald-600">&uarr; 32% vs last year</span>
                            </div>
                        </div>
                    )}

                    {show('difficulty', stats) && (
                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-100 text-purple-800 rounded-xl flex items-center justify-center font-bold">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900">3.6 / 5</p>
                                <p className="text-xs text-slate-500">Average Difficulty Rating</p>
                                <span className="text-[10px] font-bold text-[#c9a227]">Moderate Overall</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Charts & Breakdown Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Charts */}
                    <div className="lg:col-span-8 space-y-6">

                        {/* Top Companies Chart Card */}
                        {show('companyChart', sections) && (
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
                                    {TOP_COMPANIES.map((item) => (
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
                        )}

                        {/* Interview Round Analysis Grid */}
                        {(show('roundBreakdown', sections) || show('outcomes', sections)) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Rounds Distribution */}
                                {show('roundBreakdown', sections) && (
                                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                                        <h3 className="font-bold text-slate-900 text-sm mb-4">Interview Round Breakdown</h3>
                                        <div className="space-y-3">
                                            {ROUND_BREAKDOWN.map((r) => {
                                                const value = parseInt(r.pct, 10);
                                                return (
                                                    <div key={r.round} className="p-2.5 rounded-lg bg-canvas border border-slate-100">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="text-xs font-bold text-slate-800">{r.round}</p>
                                                                <p className="text-[10px] text-slate-400">{r.label}</p>
                                                            </div>
                                                            <span className="text-xs font-black text-[#c9a227] bg-[#c9a227]/10 px-2 py-1 rounded border border-[#c9a227]/30">
                                                                {r.pct}
                                                            </span>
                                                        </div>
                                                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-2">
                                                            <div
                                                                className="h-full bg-[#c9a227] rounded-full transition-all duration-500"
                                                                style={{ width: `${value}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Student Outcomes */}
                                {show('outcomes', sections) && (
                                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                                        <h3 className="font-bold text-slate-900 text-sm mb-4">Shared Student Outcomes</h3>
                                        <div className="space-y-3">
                                            {OUTCOMES.map(({ label, pct, icon: Icon, box, iconColor, textColor }) => (
                                                <div key={label} className={`p-3 ${box} border rounded-lg flex justify-between items-center`}>
                                                    <div className="flex items-center space-x-2">
                                                        <Icon className={`w-4 h-4 ${iconColor}`} />
                                                        <span className={`text-xs font-bold ${textColor}`}>{label}</span>
                                                    </div>
                                                    <span className={`text-sm font-black ${textColor}`}>{pct}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                        )}

                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Key Takeaways Card */}
                        {show('takeaways', sections) && (
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                                <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-[#c9a227]" />
                                    <span>Key Placement Takeaways</span>
                                </h3>
                                <ul className="space-y-2.5 text-xs text-slate-600">
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] mt-1.5 shrink-0" />
                                        <span><strong>TCS, Infosys, and Accenture</strong> lead in the highest volume of shared experiences.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] mt-1.5 shrink-0" />
                                        <span><strong>SQL joins, OOPs principles, and Arrays/Strings DSA</strong> are the top 3 most repeated technical topics.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] mt-1.5 shrink-0" />
                                        <span>88% of candidates noted that clearing the <strong>time-bound Aptitude Round</strong> was crucial for shortlisting.</span>
                                    </li>
                                </ul>
                            </div>
                        )}

                        {/* Popular Preparation Topics */}
                        {show('topics', sections) && (
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                                <h3 className="font-bold text-slate-900 text-sm mb-3">Popular Preparation Topics</h3>
                                <div className="space-y-2 text-xs">
                                    {PREPARATION_TOPICS.map((topic) => (
                                        <div key={topic.name} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                                            <span className="font-medium text-slate-700">{topic.name}</span>
                                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                                                {topic.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>

            {/* Footer */}
            <Footer onNavigate={onNavigate} />
        </div>
    );
}
