import {
    User, FileText, MessageSquare, Bookmark, Bell, Settings, LogOut
} from "lucide-react";

interface Props {
    activeTab?: string;
    onTabChange?: (tab: string) => void;
    onLogout?: () => void;
}

const navItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "experiences", label: "My Experiences", icon: FileText },
    { id: "questions", label: "My Questions", icon: MessageSquare },
    { id: "saved", label: "Saved", icon: Bookmark },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Settings", icon: Settings },
];

export default function SettingsSidebar({
    activeTab = "settings",
    onTabChange,
    onLogout,
}: Props) {
    return (
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
                {/* Profile */}
                <div className="flex flex-col items-center text-center pb-5 border-b border-slate-100 mb-4">
                    <div className="relative">
                        <img
                            src="https://i.pravatar.cc/120?img=47"
                            alt="Profile"
                            className="w-20 h-20 rounded-full object-cover ring-2 ring-amber-400 ring-offset-2"
                        />
                        <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#1a2332] flex items-center justify-center ring-2 ring-white hover:bg-amber-500 transition group">
                            <svg
                                className="w-3.5 h-3.5 text-amber-400 group-hover:text-[#1a2332]"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </button>
                    </div>
                    <p className="font-bold text-[#1a2332] text-base mt-3">
                        Shraddha Bonde
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                        BE Computer Engineering
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                        Sinhgad COE, Pune
                    </p>
                </div>

                {/* Nav */}
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange?.(item.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? "bg-amber-50 text-[#1a2332] border border-amber-200"
                                        : "text-slate-600 hover:bg-amber-50/40 hover:text-[#1a2332]"
                                    }`}
                            >
                                <Icon
                                    className={`w-4 h-4 ${isActive ? "text-amber-600" : "text-slate-500"
                                        }`}
                                />
                                {item.label}
                            </button>
                        );
                    })}

                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all mt-2"
                    >
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </button>
                </nav>
            </div>

            {/* Footer illustration card */}
            <div className="hidden lg:block bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200/60 p-6 text-center">
                <p className="text-lg font-bold text-[#1a2332] italic leading-tight mb-4">
                    "Better Opportunities
                    <br />
                    Brighter Futures"
                    <span className="text-red-500 ml-1 not-italic">❤</span>
                </p>
                <div className="flex justify-center">
                    <img
                        src="/images/image3.png"
                        alt="Community"
                        className="w-full max-w-[180px] rounded-xl object-cover shadow-sm ring-1 ring-amber-200"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
                    />
                </div>
            </div>

            {/* Bottom quote */}
            <div className="hidden lg:block bg-amber-50 rounded-2xl border border-amber-200/60 p-5 text-center">
                <div className="text-2xl mb-2">🌿</div>
                <p className="text-xs text-[#1a2332] italic leading-relaxed font-medium">
                    A stronger placement community grows together.
                </p>
            </div>
        </aside>
    );
}