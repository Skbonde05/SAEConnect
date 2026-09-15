import { ChevronRight } from "lucide-react";

const rounds = [
    { name: "Application", color: "bg-slate-400" },
    { name: "Aptitude", color: "bg-blue-500" },
    { name: "Coding", color: "bg-indigo-500" },
    { name: "Technical", color: "bg-purple-500" },
    { name: "HR", color: "bg-pink-500" },
    { name: "Final Result", color: "bg-emerald-500" },
];

export default function RoundTimeline() {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-[#1a2332] mb-5">Interview Round Timeline</h3>
            <div className="flex flex-wrap items-center gap-2">
                {rounds.map((r, i) => (
                    <div key={r.name} className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${r.color}`} />
                            <span className="text-sm font-medium text-slate-700">{r.name}</span>
                        </div>
                        {i < rounds.length - 1 && <ChevronRight className="w-4 h-4 text-slate-400" />}
                    </div>
                ))}
            </div>
        </div>
    );
}