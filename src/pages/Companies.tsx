import { Building2, ArrowLeft, ExternalLink } from "lucide-react";
import Navbar, { type NavTab } from "../components/Navbar";

interface CompaniesProps {
  onViewCompany: (slug: string) => void;
  onNavigate: (tab: NavTab) => void;
}

const companies = [
  { slug: "tcs", name: "TCS", count: "120+ Experiences", tag: "Mass Recruiter" },
  { slug: "infosys", name: "Infosys", count: "95+ Experiences", tag: "IT Services" },
  { slug: "accenture", name: "Accenture", count: "80+ Experiences", tag: "Consulting & Tech" },
  { slug: "persistent", name: "Persistent", count: "55+ Experiences", tag: "Product Engineering" },
  { slug: "capgemini", name: "Capgemini", count: "48+ Experiences", tag: "Cloud & Digital" },
  { slug: "wipro", name: "Wipro", count: "62+ Experiences", tag: "Software Services" },
];

export default function Companies({ onViewCompany, onNavigate }: CompaniesProps) {
  return (
    <div className="min-h-screen bg-[#1a2332] text-[#faf7f0] flex flex-col font-sans">
      <Navbar activeTab="companies" onNavigate={onNavigate} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#faf7f0]">Recruiting Companies</h1>
            <p className="text-amber-100/80 text-sm mt-1">
              Explore placement processes and interview experiences from Sinhgad recruiters.
            </p>
          </div>
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#202b3c] text-amber-100 hover:text-[#c9a961] border border-[#2e3c50] text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {companies.map((c) => (
            <div
              key={c.slug}
              onClick={() => onViewCompany(c.slug)}
              className="rounded-2xl bg-[#202b3c] border border-[#2e3c50] hover:border-[#c9a961] p-6 cursor-pointer hover:-translate-y-1 transition-all shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-[#1a2332] border border-[#c9a961]/30 flex items-center justify-center text-[#c9a961] mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#faf7f0]">{c.name}</h3>
              <p className="text-xs text-amber-100/70 mt-1">{c.tag}</p>
              <div className="mt-4 pt-4 border-t border-[#2d3c52] flex items-center justify-between text-xs text-[#c9a961]">
                <span>{c.count}</span>
                <span className="flex items-center gap-1 font-semibold">
                  View details <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
