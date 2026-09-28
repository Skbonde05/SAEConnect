import { useState, useMemo, type SyntheticEvent } from 'react';
import {
    Search,
    Filter,
    Bookmark,
    ThumbsUp,
    MessageSquare,
    CheckCircle2,
    XCircle,
    Clock,
    Sparkles,
} from 'lucide-react';
import Navbar, { type NavTab, type UserProfile } from './Navbar';
import Footer from './Footer';
import { companyLogoDataUri } from '../lib/utils';

interface Experience {
    id: number;
    studentName: string;
    studentBranch: string;
    batch: string;
    company: string;
    companyLogo: string;
    role: string;
    location: string;
    type: string;
    year: string;
    outcome: 'Selected' | 'Rejected' | 'Interview Completed';
    difficulty: 'Easy' | 'Medium' | 'Hard';
    rounds: string[];
    summary: string;
    tags: string[];
    upvotes: number;
    commentsCount: number;
    isBookmarked: boolean;
    isUpvoted?: boolean;
}

const INITIAL_EXPERIENCES: Experience[] = [
    {
        id: 1,
        studentName: "Rahul S.",
        studentBranch: "CSE",
        batch: "2024",
        company: "TCS",
        companyLogo: companyLogoDataUri("TCS"),
        role: "Software Developer",
        location: "Pune",
        type: "On Campus",
        year: "2024",
        outcome: "Selected",
        difficulty: "Medium",
        rounds: ["Application", "Aptitude", "Coding", "Technical", "HR"],
        summary: "Aptitude was moderate, technical round focused on SQL joins and OOP. HR was friendly.",
        tags: ["DSA", "OOP", "Aptitude", "HR", "SQL"],
        upvotes: 24,
        commentsCount: 5,
        isBookmarked: false
    },
    {
        id: 2,
        studentName: "Priya S.",
        studentBranch: "IT",
        batch: "2023",
        company: "Infosys",
        companyLogo: companyLogoDataUri("Infosys"),
        role: "System Engineer",
        location: "Virtual",
        type: "Off Campus",
        year: "2023",
        outcome: "Interview Completed",
        difficulty: "Easy",
        rounds: ["Application", "Aptitude", "Technical", "HR"],
        summary: "Questions were mostly from core CS subjects. Good experience overall.",
        tags: ["DBMS", "OS", "CN", "Aptitude"],
        upvotes: 32,
        commentsCount: 4,
        isBookmarked: true
    },
    {
        id: 3,
        studentName: "Rohit K.",
        studentBranch: "ENTC",
        batch: "2024",
        company: "Accenture",
        companyLogo: companyLogoDataUri("Accenture"),
        role: "Application Developer",
        location: "Pune",
        type: "On Campus",
        year: "2024",
        outcome: "Rejected",
        difficulty: "Hard",
        rounds: ["Application", "Aptitude", "Coding", "Technical", "HR"],
        summary: "Technical round was tricky. Focus more on problem-solving and system design.",
        tags: ["DSA", "System Design", "DBMS"],
        upvotes: 18,
        commentsCount: 7,
        isBookmarked: false
    }
];

interface ExperiencesPageProps {
    onNavigate?: (tab: NavTab) => void;
    user?: UserProfile | null;
    onLogout?: () => void;
    onShareExperience?: () => void;
}

export default function ExperiencesPage({
    onNavigate = () => {},
    user,
    onLogout,
    onShareExperience,
}: ExperiencesPageProps) {
    const [experiences, setExperiences] = useState<Experience[]>(INITIAL_EXPERIENCES);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('All');
    const [selectedOutcome, setSelectedOutcome] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [selectedTopic, setSelectedTopic] = useState('All');

    const handleToggleBookmark = (id: number) => {
        setExperiences(prev => prev.map(item =>
            item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item
        ));
    };

    const handleToggleUpvote = (id: number) => {
        setExperiences(prev => prev.map(item =>
            item.id === id
                ? {
                    ...item,
                    isUpvoted: !item.isUpvoted,
                    upvotes: Math.max(0, item.upvotes + (item.isUpvoted ? -1 : 1)),
                }
                : item
        ));
    };

    const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        // Last-resort guard. Logos are now generated locally as inline SVG,
        // so this only fires if a caller supplies a broken custom URL.
        e.currentTarget.onerror = null;
        e.currentTarget.src = companyLogoDataUri('Unknown');
    };

    const allTopics = useMemo(
        () => [...new Set(experiences.flatMap(exp => exp.tags))].sort(),
        [experiences]
    );

    /* Derived, not stored: if the selected topic disappears from the data it
       falls back to 'All' for this render instead of forcing a setState in an
       effect. */
    const effectiveTopic =
        selectedTopic !== 'All' && !allTopics.includes(selectedTopic)
            ? 'All'
            : selectedTopic;

    const filteredExperiences = useMemo(() => {
        return experiences.filter(exp => {
            const matchesSearch =
                exp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exp.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesCompany = selectedCompany === 'All' || exp.company === selectedCompany;
            const matchesOutcome = selectedOutcome === 'All' || exp.outcome === selectedOutcome;
            const matchesDifficulty = selectedDifficulty === 'All' || exp.difficulty === selectedDifficulty;
            const matchesTopic = effectiveTopic === 'All' || exp.tags.includes(effectiveTopic);

            return matchesSearch && matchesCompany && matchesOutcome && matchesDifficulty && matchesTopic;
        });
    }, [experiences, searchQuery, selectedCompany, selectedOutcome, selectedDifficulty, effectiveTopic]);

    return (
        <div className="min-h-screen bg-canvas text-slate-900 font-sans flex flex-col justify-between">
            {/* Unified Sticky Navbar */}
            <Navbar
                activeTab="experiences"
                onNavigate={onNavigate}
                user={user}
                onLogout={onLogout}
                onSearchClick={() => {
                    document.getElementById("experiences-search-input")?.focus();
                }}
            />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#0f2747] text-white py-12 px-6 border-b border-[#3a6199]">
                <div className="pointer-events-none absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-[#c9a227]/15 blur-3xl" />
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-[#22406A] border border-[#c9a227]/40 text-[#c9a227] text-xs font-semibold px-3 py-1.5 rounded-full mb-4 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Authentic SAE Placement Database</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#ffffff] mb-3">
                        Placement Experiences Repository
                    </h1>
                    <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
                        Explore real interview rounds, coding problems, technical questions, and tips shared by Sinhgad students and alumni.
                    </p>

                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <input
                            id="experiences-search-input"
                            type="text"
                            placeholder="Search by company (TCS, Infosys), topic (DSA, SQL), round..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-2xl text-sm border border-slate-200 focus:border-[#c9a227] focus:ring-2 focus:ring-[#c9a227]/30 transition-all"
                        />
                        {onShareExperience && (
                            <button
                                onClick={onShareExperience}
                                className="absolute right-2 top-2 bottom-2 bg-[#c9a227] hover:bg-[#dcb443] text-[#0f2747] font-bold px-4 rounded-xl text-xs transition shadow-sm cursor-pointer"
                            >
                                + Share
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
                {/* Filters Bar */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center space-x-2 font-semibold text-sm">
                        <Filter className="w-4 h-4 text-[#16805C]" />
                        <span>Filters:</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm">
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="bg-canvas border border-slate-300 rounded-lg px-3 py-1.5"
                        >
                            <option value="All">All Companies</option>
                            <option value="TCS">TCS</option>
                            <option value="Infosys">Infosys</option>
                            <option value="Accenture">Accenture</option>
                        </select>
                        <select
                            value={selectedOutcome}
                            onChange={(e) => setSelectedOutcome(e.target.value)}
                            className="bg-canvas border border-slate-300 rounded-lg px-3 py-1.5"
                        >
                            <option value="All">All Outcomes</option>
                            <option value="Selected">Selected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Interview Completed">Interview Completed</option>
                        </select>
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="bg-canvas border border-slate-300 rounded-lg px-3 py-1.5"
                        >
                            <option value="All">All Difficulties</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <select
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            className="bg-canvas border border-slate-300 rounded-lg px-3 py-1.5"
                        >
                            <option value="All">All Topics</option>
                            {allTopics.map(topic => (
                                <option key={topic} value={topic}>{topic}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Experience Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredExperiences.map((exp) => (
                        <div key={exp.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all">
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={exp.companyLogo}
                                            alt={exp.company}
                                            className="w-10 h-10 object-contain rounded-lg border p-1 bg-canvas"
                                            onError={handleImageError}
                                        />
                                        <div>
                                            <h3 className="font-bold text-slate-900">{exp.company}</h3>
                                            <p className="text-xs text-slate-500">{exp.role}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${exp.outcome === 'Selected' ? 'bg-emerald-50 text-emerald-700' :
                                        exp.outcome === 'Rejected' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-brand-blue'
                                        }`}>
                                        {exp.outcome === 'Selected' && <CheckCircle2 className="w-3 h-3" />}
                                        {exp.outcome === 'Rejected' && <XCircle className="w-3 h-3" />}
                                        {exp.outcome === 'Interview Completed' && <Clock className="w-3 h-3" />}
                                        {exp.outcome}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                                    <span className="flex items-center gap-1.5">
                                        📅 {exp.year} • {exp.location}
                                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                                            {exp.type}
                                        </span>
                                    </span>
                                    <span className="font-semibold text-[#c9a227]">Difficulty: {exp.difficulty}</span>
                                </div>

                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-1">
                                        {exp.rounds.map((round, idx) => (
                                            <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                                                {round}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-xs text-slate-600 italic mb-4 bg-canvas p-2.5 rounded-lg border border-slate-100">
                                    "{exp.summary}"
                                </p>

                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {exp.tags.map((tag, i) => (
                                        <span key={i} className="px-2 py-0.5 rounded bg-emerald-50 text-[#16805C] text-xs font-medium">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                <div>
                                    <span className="font-semibold text-slate-700">{exp.studentName}</span>
                                    <span className="text-[10px] text-slate-400 block">{exp.studentBranch} | Batch {exp.batch}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => handleToggleUpvote(exp.id)}
                                        aria-pressed={exp.isUpvoted}
                                        title={exp.isUpvoted ? 'Remove upvote' : 'Upvote'}
                                        className={`flex items-center space-x-1 transition-colors cursor-pointer ${
                                            exp.isUpvoted
                                                ? 'text-[#16805C] font-semibold'
                                                : 'hover:text-[#16805C]'
                                        }`}
                                    >
                                        <ThumbsUp className="w-3.5 h-3.5" fill={exp.isUpvoted ? 'currentColor' : 'none'} />
                                        <span>{exp.upvotes}</span>
                                    </button>
                                    <span
                                        className="flex items-center space-x-1"
                                        title={`${exp.commentsCount} comments`}
                                    >
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        <span>{exp.commentsCount}</span>
                                    </span>
                                    <button
                                        onClick={() => handleToggleBookmark(exp.id)}
                                        aria-pressed={exp.isBookmarked}
                                        title={exp.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                                        className={`transition-colors cursor-pointer ${exp.isBookmarked ? 'text-[#16805C]' : 'hover:text-[#16805C]'}`}
                                    >
                                        <Bookmark className="w-4 h-4" fill={exp.isBookmarked ? "currentColor" : "none"} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <Footer onNavigate={onNavigate} />
        </div>
    );
}