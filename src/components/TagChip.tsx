import { cn } from "../lib/utils";

interface Props {
    label: string;
    variant?: "default" | "success" | "danger" | "amber";
}

export default function TagChip({ label, variant = "default" }: Props) {
    const styles = {
        default: "bg-[#1a2332]/5 text-[#1a2332] border-[#1a2332]/10",
        success: "bg-emerald-50 text-emerald-700 border-emerald-100",
        danger: "bg-red-50 text-red-700 border-red-100",
        amber: "bg-amber-50 text-amber-800 border-amber-200",
    };
    return (
        <span className={cn("px-2.5 py-1 text-xs font-medium rounded-full border", styles[variant])}>
            {label}
        </span>
    );
}