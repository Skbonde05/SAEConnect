interface Props {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}

export default function Toggle({ enabled, onChange }: Props) {
    return (
        <button
            type="button"
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${enabled ? "bg-[#1a2332]" : "bg-slate-300"
                }`}
            aria-checked={enabled}
            role="switch"
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full transition-transform duration-200 ${enabled ? "translate-x-6 bg-amber-400" : "translate-x-1 bg-white"
                    } shadow-md`}
            />
        </button>
    );
}