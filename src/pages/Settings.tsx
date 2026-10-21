import { useState } from "react";
import {
    User, GraduationCap, Briefcase, Bell, Shield, Sun, Trash2,
    ChevronRight, Check, Camera
} from "lucide-react";
import Navbar, { type NavTab } from "../components/Navbar";
import SettingsSidebar from "../components/SettingsSidebar";
import Toggle from "../components/Toggle";

interface Props {
    onNavigate: (tab: NavTab) => void;
    onLogout?: () => void;
}

/* ═══════ REUSABLE SECTION CARD ═══════ */
function SectionCard({
    icon: Icon,
    title,
    subtitle,
    children,
}: {
    icon: any;
    title: string;
    subtitle: string;
    children: React.ReactNode;
}) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-100 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[#1a2332]">
                    <Icon className="w-5 h-5 text-amber-400" />
                </div>
                <div className="min-w-0">
                    <h3 className="font-bold text-[#1a2332] text-lg">{title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
                </div>
            </div>
            <div className="divide-y divide-slate-100">{children}</div>
        </div>
    );
}

/* ═══════ REUSABLE ROW ═══════ */
function SettingRow({
    label,
    value,
    showChevron = true,
}: {
    label: string;
    value: string;
    showChevron?: boolean;
}) {
    return (
        <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-amber-50/50 transition-colors text-left group">
            <span className="text-sm text-slate-600">{label}</span>
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#1a2332] text-right max-w-md truncate">
                    {value}
                </span>
                {showChevron && (
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                )}
            </div>
        </button>
    );
}

/* ═══════ MAIN SETTINGS PAGE ═══════ */
export default function Settings({ onNavigate, onLogout }: Props) {
    const [notifReplies, setNotifReplies] = useState(true);
    const [notifMentions, setNotifMentions] = useState(true);
    const [notifExperiences, setNotifExperiences] = useState(true);
    const [notifUpdates, setNotifUpdates] = useState(false);
    const [notifWeekly, setNotifWeekly] = useState(true);
    const [notifProduct, setNotifProduct] = useState(true);
    const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
    const [language, setLanguage] = useState("English");

    return (
        <div className="bg-stone-50 min-h-screen">
            <Navbar activeTab="settings" onNavigate={onNavigate} />

            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-6">
                {/* LEFT SIDEBAR */}
                <SettingsSidebar
                    activeTab="settings"
                    onTabChange={(tab) => console.log("Switch to:", tab)}
                    onLogout={onLogout}
                />

                {/* MAIN CONTENT */}
                <main className="flex-1 space-y-5 min-w-0">
                    {/* ═══════ HERO BANNER — CREAM WITH NAVY TEXT ═══════ */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border border-amber-200/60">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-200/40 rounded-full blur-3xl" />
                        <div className="relative flex items-center justify-between gap-6 px-8 py-7">
                            <div>
                                <h1 className="text-4xl font-bold text-[#1a2332] mb-1">
                                    Settings
                                </h1>
                                <p className="text-sm text-slate-600">
                                    Manage your account, preferences and privacy settings.
                                </p>
                            </div>

                            {/* Right side illustration */}
                            <div className="hidden md:flex items-center gap-5">
                                <div className="text-right leading-tight">
                                    <p className="text-3xl font-bold text-[#1a2332] italic">
                                        Learn
                                        <br />
                                        Share
                                        <br />
                                        Grow
                                        <br />
                                        Together <span className="text-red-500 not-italic">❤</span>
                                    </p>
                                </div>
                                <img
                                    src="/images/image3.png"
                                    alt="Sinhgad campus"
                                    className="w-48 h-32 rounded-xl object-cover shadow-md ring-1 ring-amber-200"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = "none";
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* ═══════ ACCOUNT SETTINGS ═══════ */}
                    <SectionCard
                        icon={User}
                        title="Account Settings"
                        subtitle="Update your personal information and account details."
                    >
                        <SettingRow label="Full Name" value="Shraddha Bonde" />
                        <SettingRow
                            label="Email Address"
                            value="shraddha.bonde@sinhgad.edu"
                        />
                        <SettingRow label="Phone Number" value="+91 98765 43210" />
                        <SettingRow label="Password" value="•••••••••" />
                    </SectionCard>

                    {/* ═══════ ACADEMIC INFORMATION ═══════ */}
                    <SectionCard
                        icon={GraduationCap}
                        title="Academic Information"
                        subtitle="Manage your college and academic details."
                    >
                        <SettingRow
                            label="College"
                            value="Sinhgad College of Engineering, Pune"
                        />
                        <SettingRow label="Branch" value="Computer Engineering" />
                        <SettingRow label="Year of Study" value="Final Year (2026)" />
                        <SettingRow label="Roll Number" value="SCOE2023101" />
                    </SectionCard>

                    {/* ═══════ PLACEMENT PREFERENCES ═══════ */}
                    <SectionCard
                        icon={Briefcase}
                        title="Placement Preferences"
                        subtitle="Set your preferences to get more relevant opportunities."
                    >
                        <SettingRow
                            label="Preferred Roles"
                            value="Software Engineer, Cloud Engineer"
                        />
                        <SettingRow
                            label="Preferred Locations"
                            value="Pune, Bengaluru, Hyderabad, Remote"
                        />
                        <SettingRow
                            label="Expected Domain"
                            value="Software Development, Cloud, Product Based"
                        />
                        <SettingRow
                            label="Availability"
                            value="Open to Full-time opportunities"
                        />
                    </SectionCard>

                    {/* ═══════ NOTIFICATION SETTINGS ═══════ */}
                    <SectionCard
                        icon={Bell}
                        title="Notification Settings"
                        subtitle="Choose what notifications you want to receive."
                    >
                        <div className="flex items-center justify-between px-6 py-4">
                            <span className="text-sm text-slate-600">
                                New replies to my questions
                            </span>
                            <Toggle enabled={notifReplies} onChange={setNotifReplies} />
                        </div>
                        <div className="flex items-center justify-between px-6 py-4">
                            <span className="text-sm text-slate-600">Mentions and tags</span>
                            <Toggle enabled={notifMentions} onChange={setNotifMentions} />
                        </div>
                        <div className="flex items-center justify-between px-6 py-4">
                            <span className="text-sm text-slate-600">
                                New placement experiences
                            </span>
                            <Toggle
                                enabled={notifExperiences}
                                onChange={setNotifExperiences}
                            />
                        </div>
                        <div className="flex items-center justify-between px-6 py-4">
                            <span className="text-sm text-slate-600">Company updates</span>
                            <Toggle enabled={notifUpdates} onChange={setNotifUpdates} />
                        </div>
                        <div className="flex items-center justify-between px-6 py-4">
                            <span className="text-sm text-slate-600">
                                Weekly insights and newsletters
                            </span>
                            <Toggle enabled={notifWeekly} onChange={setNotifWeekly} />
                        </div>
                        <div className="flex items-center justify-between px-6 py-4">
                            <span className="text-sm text-slate-600">Product updates</span>
                            <Toggle enabled={notifProduct} onChange={setNotifProduct} />
                        </div>
                    </SectionCard>

                    {/* ═══════ PRIVACY & SECURITY ═══════ */}
                    <SectionCard
                        icon={Shield}
                        title="Privacy & Security"
                        subtitle="Manage your privacy and keep your account safe."
                    >
                        <SettingRow
                            label="Profile Visibility"
                            value="Visible to Sinhgad Community"
                        />
                        <SettingRow label="Show my email" value="Only to connections" />
                        <SettingRow label="Data & Privacy" value="Manage your data" />
                        <SettingRow label="Connected Accounts" value="Google, LinkedIn" />
                        <SettingRow
                            label="Two-Factor Authentication"
                            value="Enable 2FA"
                        />
                    </SectionCard>

                    {/* ═══════ APPEARANCE ═══════ */}
                    <SectionCard
                        icon={Sun}
                        title="Appearance"
                        subtitle="Customize your browsing experience."
                    >
                        {/* Theme row */}
                        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                            <span className="text-sm text-slate-600">Theme</span>
                            <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
                                {(["light", "dark", "system"] as const).map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${theme === t
                                                ? "bg-white text-[#1a2332] shadow-sm border border-amber-300"
                                                : "text-slate-500 hover:text-slate-700"
                                            }`}
                                    >
                                        {t === "light" && <Sun className="w-3.5 h-3.5" />}
                                        {t === "dark" && (
                                            <Sun className="w-3.5 h-3.5 rotate-180" />
                                        )}
                                        {t === "system" && <Shield className="w-3.5 h-3.5" />}
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Language row */}
                        <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                            <span className="text-sm text-slate-600">Language</span>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 min-w-[160px]"
                            >
                                <option>English</option>
                                <option>हिंदी (Hindi)</option>
                                <option>मराठी (Marathi)</option>
                            </select>
                        </div>
                    </SectionCard>

                    {/* ═══════ DANGER ZONE ═══════ */}
                    <SectionCard
                        icon={Trash2}
                        title="Danger Zone"
                        subtitle="Irreversible account actions."
                    >
                        <div className="px-6 py-5 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold text-[#1a2332]">
                                    Delete Account
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Permanently remove your account and all data
                                </p>
                            </div>
                            <button className="px-5 py-2.5 rounded-xl border-2 border-red-400 text-red-600 hover:bg-red-50 font-semibold text-sm transition">
                                Delete My Account
                            </button>
                        </div>
                    </SectionCard>

                    {/* ═══════ SAVE BUTTON ═══════ */}
                    <div className="flex justify-end pt-2">
                        <button className="inline-flex items-center gap-2 bg-[#1a2332] hover:bg-[#2a3450] text-amber-100 font-bold px-8 py-3 rounded-xl text-sm transition shadow-lg hover:shadow-xl">
                            <Check className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}