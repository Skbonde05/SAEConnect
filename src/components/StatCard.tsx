import type { LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface Props {
    icon: LucideIcon;
    value: string | number;
    label: string;
    color?: string;
}

export default function StatCard({
    icon: Icon,
    value,
    label,
    color = "text-[#1a2332] bg-amber-100",
}: Props) {
    return (
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", color)}>
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xl font-bold text-[#1a2332] leading-tight">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
            </div>
        </div>
    );
}