import { useState } from "react";
import {
  Search,
  Bell,
  GraduationCap,
  LogOut,
  User as UserIcon,
  Menu,
  X,
} from "lucide-react";
import Brand from "./Brand";

export type NavTab =
  | "home"
  | "experiences"
  | "companies"
  | "ask-share"
  | "insights"
  | "about";

export interface UserProfile {
  id?: string;
  email?: string;
  fullName?: string;
  prn?: string;
  branch?: string;
  role?: string;
}

interface Props {
  activeTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  user?: UserProfile | null;
  onLogout?: () => void;
  onSearchClick?: () => void;
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
  user,
  onLogout,
  onSearchClick,
}: Props) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const getInitials = (name?: string, email?: string) => {
    if (name && name.trim().length > 0) {
      const parts = name.trim().split(/\s+/).filter(Boolean);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0] ? parts[0].slice(0, 2).toUpperCase() : "SB";
    }
    if (email && email.length > 0) {
      return email.slice(0, 2).toUpperCase();
    }
    return "SB";
  };

  const displayName = user?.fullName || (user?.email ? user.email.split("@")[0] : "Sinhgad Student");
  const initials = getInitials(user?.fullName, user?.email);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => {
            onNavigate("home");
            setIsMobileMenuOpen(false);
          }}
          className="hover:opacity-90 transition text-left cursor-pointer"
        >
          <Brand size="sm" tone="plain" />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => {
                onNavigate(l.key);
                setIsMobileMenuOpen(false);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition relative cursor-pointer ${
                activeTab === l.key
                  ? "text-[#0f2747]"
                  : "text-slate-600 hover:text-[#0f2747] hover:bg-canvas"
              }`}
            >
              {l.label}
              {activeTab === l.key && (
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#c9a227] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSearchClick}
            title="Search"
            className="p-2 hover:bg-slate-100 rounded-full transition cursor-pointer"
          >
            <Search className="w-5 h-5 text-slate-600" />
          </button>
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotificationsOpen((v) => !v);
                setIsProfileMenuOpen(false);
              }}
              title="Notifications"
              aria-label="Notifications"
              aria-expanded={isNotificationsOpen}
              className="p-2 hover:bg-slate-100 rounded-full transition cursor-pointer"
            >
              <Bell className="w-5 h-5 text-slate-600" />
            </button>

            {isNotificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsNotificationsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <p className="px-4 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Notifications
                  </p>
                  <div className="px-4 py-6 text-center">
                    <Bell className="w-7 h-7 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-700">
                      You&apos;re all caught up
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Replies to your questions and new experiences will show
                      up here.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Avatar with dropdown */}
          <div className="relative">
            <div
              onClick={() => {
                setIsProfileMenuOpen(!isProfileMenuOpen);
                setIsNotificationsOpen(false);
              }}
              className="w-9 h-9 rounded-full bg-[#0f2747] flex items-center justify-center text-[#c9a227] font-bold text-sm cursor-pointer hover:opacity-90 transition select-none"
              title={displayName}
            >
              {initials}
            </div>

            {isProfileMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900 truncate">
                      {displayName}
                    </p>
                    {user?.email && (
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {user.email}
                      </p>
                    )}
                    {user?.prn && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold bg-[#c9a227]/10 text-[#c9a227] rounded-full">
                        PRN: {user.prn}
                      </span>
                    )}
                    {user?.branch && (
                      <p className="text-[11px] text-slate-500 mt-1">
                        {user.branch}
                      </p>
                    )}
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onNavigate("experiences");
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-canvas flex items-center gap-2 cursor-pointer"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      My Experiences
                    </button>
                    <button
                      onClick={() => {
                        onNavigate("about");
                        setIsProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-canvas flex items-center gap-2 cursor-pointer"
                    >
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      About SAEConnect
                    </button>
                  </div>

                  {onLogout && (
                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => {
                onNavigate(l.key);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 text-sm font-medium rounded-lg transition ${
                activeTab === l.key
                  ? "bg-slate-100 text-[#0f2747] font-semibold"
                  : "text-slate-600 hover:bg-canvas"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
