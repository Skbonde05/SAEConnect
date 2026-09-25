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
    Building2
} from 'lucide-react';

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
}

const INITIAL_EXPERIENCES: Experience[] = [
    {
        id: 1,
        studentName: "Rahul S.",
        studentBranch: "CSE",
        batch: "2024",
        company: "TCS",
        companyLogo: "https://logo.clearbit.com/tcs.com",
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
        companyLogo: "https://logo.clearbit.com/infosys.com",
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
        companyLogo: "https://logo.clearbit.com/accenture.com",
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

export default function ExperiencesPage() {
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

    const handleUpvote = (id: number) => {
        setExperiences(prev => prev.map(item =>
            item.id === id ? { ...item, upvotes: item.upvotes + 1 } : item
        ));
    };

    const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://via.placeholder.com/40?text=Co';
    };

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
            const matchesTopic = selectedTopic === 'All' || exp.tags.includes(selectedTopic);

            return matchesSearch && matchesCompany && matchesOutcome && matchesDifficulty && matchesTopic;
        });
    }, [experiences, searchQuery, selectedCompany, selectedOutcome, selectedDifficulty, selectedTopic]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">
            {/* Navigation Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="bg-[#16A34A] text-white p-2 rounded-lg font-bold flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        <span>Sinhgad Hub</span>
                    </div>
                </div>
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
                    <a href="#home" className="hover:text-[#16A34A] transition-colors">Home</a>
                    <a href="#experiences" className="text-[#16A34A] font-semibold border-b-2 border-[#16A34A] pb-1">Experiences</a>
                    <a href="#companies" className="hover:text-[#16A34A] transition-colors">Companies</a>
                    <a href="#ask" className="hover:text-[#16A34A] transition-colors">Ask & Share</a>
                    <a href="#insights" className="hover:text-[#16A34A] transition-colors">Insights</a>
                </nav>
                <div className="flex items-center space-x-3">
                    <button className="bg-[#16A34A] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#15803D] transition-all">
                        + Share Experience
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white py-10 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
                        Placement Experiences Repository
                    </h1>
                    <p className="text-emerald-100 text-sm mb-6">
                        Search interview rounds, questions, and insights shared by Sinhgad students & alumni.
                    </p>
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search TCS, SQL, Technical Round..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-24 py-3 rounded-xl text-slate-900 focus:outline-none shadow-lg text-sm"
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-[#16A34A] px-4 rounded-lg text-sm font-semibold">
                            Search
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Filters Bar */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center space-x-2 font-semibold text-sm">
                        <Filter className="w-4 h-4 text-[#16A34A]" />
                        <span>Filters:</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm">
                        <select
                            value={selectedCompany}
                            onChange={(e) => setSelectedCompany(e.target.value)}
                            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5"
                        >
                            <option value="All">All Companies</option>
                            <option value="TCS">TCS</option>
                            <option value="Infosys">Infosys</option>
                            <option value="Accenture">Accenture</option>
                        </select>
                        <select
                            value={selectedOutcome}
                            onChange={(e) => setSelectedOutcome(e.target.value)}
                            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5"
                        >
                            <option value="All">All Outcomes</option>
                            <option value="Selected">Selected</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Interview Completed">Interview Completed</option>
                        </select>
                        <select
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5"
                        >
                            <option value="All">All Difficulties</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                        <select
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5"
                        >
                            <option value="All">All Topics</option>
                            <option value="DSA">DSA</option>
                            <option value="SQL">SQL</option>
                            <option value="OOP">OOP</option>
                            <option value="DBMS">DBMS</option>
                            <option value="System Design">System Design</option>
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
                                            className="w-10 h-10 object-contain rounded-lg border p-1 bg-slate-50"
                                            onError={handleImageError}
                                        />
                                        <div>
                                            <h3 className="font-bold text-slate-900">{exp.company}</h3>
                                            <p className="text-xs text-slate-500">{exp.role}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${exp.outcome === 'Selected' ? 'bg-emerald-50 text-emerald-700' :
                                        exp.outcome === 'Rejected' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'
                                        }`}>
                                        {exp.outcome === 'Selected' && <CheckCircle2 className="w-3 h-3" />}
                                        {exp.outcome === 'Rejected' && <XCircle className="w-3 h-3" />}
                                        {exp.outcome === 'Interview Completed' && <Clock className="w-3 h-3" />}
                                        {exp.outcome}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                                    <span>📅 {exp.year} • {exp.location}</span>
                                    <span className="font-semibold text-amber-600">Difficulty: {exp.difficulty}</span>
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

                                <p className="text-xs text-slate-600 italic mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                    "{exp.summary}"
                                </p>

                                <div className="flex flex-wrap gap-1.5 mb-6">
                                    {exp.tags.map((tag, i) => (
                                        <span key={i} className="px-2 py-0.5 rounded bg-emerald-50 text-[#16A34A] text-xs font-medium">
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
                                    <button onClick={() => handleUpvote(exp.id)} className="flex items-center space-x-1 hover:text-[#16A34A]">
                                        <ThumbsUp className="w-3.5 h-3.5" />
                                        <span>{exp.upvotes}</span>
                                    </button>
                                    <button className="flex items-center space-x-1 hover:text-[#16A34A]">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        <span>{exp.commentsCount}</span>
                                    </button>
                                    <button onClick={() => handleToggleBookmark(exp.id)} className={`${exp.isBookmarked ? 'text-[#16A34A]' : ''}`}>
                                        <Bookmark className="w-4 h-4" fill={exp.isBookmarked ? "currentColor" : "none"} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}