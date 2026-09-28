import { useState, useRef, useEffect, type FormEvent } from "react";
import { Briefcase, Camera, Play } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { NavTab } from "./Navbar";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { BrandMark } from "./Brand";

interface FooterProps {
  onNavigate?: (tab: NavTab) => void;
}

/* lucide-react v1 dropped brand glyphs, so these use generic stand-ins. */
const SOCIALS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Briefcase },
  { label: "Instagram", href: "https://www.instagram.com/", icon: Camera },
  { label: "YouTube", href: "https://www.youtube.com/", icon: Play },
];

export default function Footer({ onNavigate }: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribedToast, setSubscribedToast] = useState(false);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* The footer unmounts on every tab switch, so the toast timer must be
     cleared or it fires against an unmounted component. */
  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email) return;

    setSubscribeError(null);

    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .upsert({ email: email.toLowerCase() }, { onConflict: "email" });

      if (error) {
        setSubscribeError(`Could not subscribe: ${error.message}`);
        return;
      }
    }

    setSubscribedToast(true);
    setNewsletterEmail("");
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setSubscribedToast(false);
    }, 3000);
  };

  const navLinks: { label: string; tab: NavTab }[] = [
    { label: "Home", tab: "home" },
    { label: "Experiences", tab: "experiences" },
    { label: "Companies", tab: "companies" },
    { label: "Ask & Share", tab: "ask-share" },
    { label: "Insights", tab: "insights" },
    { label: "About", tab: "about" },
  ];

  return (
    <footer className="bg-[#0A1A30] border-t border-[#3a6199] text-[#ffffff] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#22406A]">
          {/* Col 1: Brand & About (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => {
                onNavigate?.("home");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-left hover:opacity-90 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <BrandMark className="h-10 w-10 shrink-0" />
                <div>
                  <p className="font-extrabold tracking-tight text-[#ffffff] text-base">
                    SAEConnect
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#c9a227]">
                    SAE Placement Hub
                  </p>
                </div>
              </div>
            </button>

            <p className="text-xs sm:text-sm text-[#fef3c7]/80 leading-relaxed">
              A student-driven platform to collect, share and learn from
              placement experiences within the Sinhgad community.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-8 h-8 rounded-lg bg-[#0f2747] border border-[#3a6199] text-[#fef3c7]/60 hover:text-[#c9a227] hover:border-[#c9a227]/60 flex items-center justify-center transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-sm font-bold text-[#c9a227] tracking-wider uppercase">
              Quick Links
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#fef3c7]/70">
              {navLinks.map((item) => (
                <li key={item.tab}>
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate(item.tab);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="hover:text-[#c9a227] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-sm font-bold text-[#c9a227] tracking-wider uppercase">
              Resources
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#fef3c7]/70">
              {[
                { title: "Placement Preparation Tips", tab: "insights" as NavTab },
                { title: "Interview Experiences", tab: "experiences" as NavTab },
                { title: "Partner Companies", tab: "companies" as NavTab },
                { title: "Student Discussions", tab: "ask-share" as NavTab },
                { title: "About SAEConnect", tab: "about" as NavTab },
              ].map((res) => (
                <li key={res.title}>
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate(res.tab);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className="hover:text-[#c9a227] transition-colors cursor-pointer text-left"
                  >
                    {res.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Stay Updated Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-sm font-bold text-[#c9a227] tracking-wider uppercase">
              Stay Updated
            </p>
            <p className="text-xs text-[#fef3c7]/70 leading-relaxed">
              Subscribe to get the latest updates and placement insights.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="pt-1">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl bg-[#0f2747] border border-[#3a6199] px-3.5 py-2 text-xs sm:text-sm text-[#ffffff] placeholder:text-[#fef3c7]/40 focus:outline-none focus:border-[#c9a227]"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#c9a227] py-2 px-4 text-xs sm:text-sm font-bold text-[#0f2747] hover:bg-[#dcb443] active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  Subscribe
                </button>
              </div>
              {subscribeError && (
                <p className="text-[11px] text-rose-400 mt-2 font-medium">
                  {subscribeError}
                </p>
              )}
              {subscribedToast && (
                <p className="text-[11px] text-emerald-400 mt-2 font-medium">
                  ✓ Subscribed! You will receive new placement updates.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#fef3c7]/60">
          <p>&copy; {new Date().getFullYear()} SAEConnect (SAE Placement Hub). All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-rose-400">❤️</span> for the Sinhgad Community
          </p>
        </div>
      </div>
    </footer>
  );
}
