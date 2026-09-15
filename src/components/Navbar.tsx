import { Search, Bell, GraduationCap } from "lucide-react";

type Tab = "home" | "experiences" | "companies" | "ask-share" | "insights" | "about";

interface Props {
    activeTab: Tab;
    onNavigate: (tab: Tab) => void;
}

const links: { key: Tab; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "experiences", label: "Experiences" },
    { key: "companies", label: "Companies" },
    { key: "ask-share", label: "Ask & Share" },
    { key: "insights", label: "Insights" },
    { key: "about", label: "About" },
];

export default function Navbar({ activeTab, onNavigate }: Props) {
    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo + Brand */}
                <button
                    onClick={() => onNavigate("home")}
                    className="flex items-center gap-2 hover:opacity-90 transition"
                >
                    <div className="w-9 h-9 rounded-lg bg-[#1a2332] flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="leading-tight text-left">
                        <p className="font-bold text-[#1a2332] text-sm">Sinhgad Placement Hub</p>
                        <p className="text-[10px] text-slate-500">Learn · Share · Grow Together</p>
                    </div>
                </button>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map((l) => (
                        <button
                            key={l.key}
                            onClick={() => onNavigate(l.key)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition relative ${activeTab === l.key
                                ? "text-[#1a2332]"
                                : "text-slate-600 hover:text-[#1a2332] hover:bg-slate-50"
                                }`}
                        >
                            {l.label}
                            {activeTab === l.key && (
                                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-amber-500 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-full transition">
                        <Search className="w-5 h-5 text-slate-600" />
                    </button>
                    <button className="relative p-2 hover:bg-slate-100 rounded-full transition">
                        <Bell className="w-5 h-5 text-slate-600" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                    <div className="w-9 h-9 rounded-full bg-[#1a2332] flex items-center justify-center text-amber-400 font-bold text-sm cursor-pointer hover:opacity-90 transition">
                        SB
                    </div>
                </div>
            </div>
        </nav>
    );
}