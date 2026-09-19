import { Search, Bell, GraduationCap } from "lucide-react";

export type NavTab =
  | "home"
  | "experiences"
  | "companies"
  | "ask-share"
  | "insights"
  | "about";

interface Props {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
}

const links: { key: NavTab; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "experiences", label: "Experiences" },
  { key: "companies", label: "Companies" },
  { key: "ask-share", label: "Ask & Share" },
  { key: "insights", label: "Insights" },
  { key: "about", label: "About" },
];

export default function Navbar({
  activeTab,
  onNavigate,
  onSearchClick,
  onNotificationClick,
}: Props) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3 hover:opacity-90 transition text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1a2332] flex items-center justify-center shadow-md shadow-slate-900/10">
            <GraduationCap className="w-5 h-5 text-[#c9a961]" />
          </div>
          <div className="leading-tight">
            <p className="font-bold text-[#1a2332] text-sm tracking-tight">
              Sinhgad Placement Hub
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              Learn · Share · Grow Together
            </p>
          </div>
        </button>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => onNavigate(l.key)}
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition relative ${
                activeTab === l.key
                  ? "text-[#1a2332] font-semibold"
                  : "text-slate-600 hover:text-[#1a2332] hover:bg-slate-50"
              }`}
            >
              {l.label}
              {activeTab === l.key && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#c9a961] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onSearchClick}
            title="Search"
            className="p-2 hover:bg-slate-100 rounded-full transition text-slate-600 hover:text-[#1a2332]"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            onClick={onNotificationClick}
            title="Notifications"
            className="relative p-2 hover:bg-slate-100 rounded-full transition text-slate-600 hover:text-[#1a2332]"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
          <div
            title="Profile"
            className="w-9 h-9 rounded-full bg-[#1a2332] flex items-center justify-center text-[#c9a961] font-bold text-sm cursor-pointer hover:opacity-90 transition shadow-sm ring-1 ring-slate-200"
          >
            SB
          </div>
        </div>
      </div>
    </nav>
  );
}
