import { useState } from "react";
import { Calendar, Users, BarChart3, ArrowRight } from "lucide-react";
import type { Company } from "../lib/mockData";
import TagChip from "./TagChip";

interface Props {
    company: Company;
    onViewDetails: (slug: string) => void;
}

export default function CompanyCard({ company, onViewDetails }: Props) {
    const [logoError, setLogoError] = useState(false);

    return (
        <div className="group relative bg-white rounded-2xl border-2 border-slate-200 p-6 shadow-sm hover:shadow-2xl hover:border-amber-500 hover:scale-[1.03] transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            <div className="relative">
                <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-2.5 overflow-hidden shadow-sm group-hover:shadow-md group-hover:border-amber-400 transition-all">
                        {!logoError ? (
                            <img
                                src={company.logoPath}
                                alt={`${company.name} logo`}
                                className="object-contain w-full h-full"
                                onError={() => setLogoError(true)}
                            />
                        ) : (
                            <div
                                className="w-full h-full rounded-xl flex items-center justify-center text-white font-bold text-lg"
                                style={{ backgroundColor: company.logoColor }}
                            >
                                {company.name[0]}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="font-bold text-[#1a2332] text-lg leading-tight group-hover:text-amber-700 transition-colors">
                            {company.name}
                        </p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{company.tagline}</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 mb-4 border-y border-slate-100">
                    <div className="text-center">
                        <div className="flex items-center justify-center text-slate-400 mb-1">
                            <Calendar className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-sm font-bold text-[#1a2332]">{company.experiences}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Experiences</p>
                    </div>
                    <div className="text-center border-x border-slate-100">
                        <div className="flex items-center justify-center text-emerald-500 mb-1">
                            <Users className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-sm font-bold text-[#1a2332]">{company.placed}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Placed</p>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center text-amber-500 mb-1">
                            <BarChart3 className="w-3.5 h-3.5" />
                        </div>
                        <p className="text-sm font-bold text-[#1a2332]">{company.rating}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Rating</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5 min-h-[52px]">
                    {company.tags.slice(0, 4).map((t) => (
                        <TagChip key={t} label={t} />
                    ))}
                </div>

                <button
                    onClick={() => onViewDetails(company.slug)}
                    className="w-full flex items-center justify-center gap-2 bg-[#1a2332] group-hover:bg-amber-600 text-amber-50 group-hover:text-[#1a2332] text-sm font-semibold py-2.5 rounded-lg transition-all shadow-sm group-hover:shadow-lg"
                >
                    View Experiences
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}