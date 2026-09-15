import { useState } from "react";
import { MessageSquare, Eye, ChevronUp, HelpCircle, Lightbulb, MessageCircle } from "lucide-react";
import type { Post } from "../lib/askShareData";

interface Props {
    post: Post;
}

const typeStyles: Record<string, { bg: string; text: string; icon: any; label: string }> = {
    Question: { bg: "bg-amber-50", text: "text-amber-700", icon: HelpCircle, label: "Question" },
    Experience: { bg: "bg-purple-50", text: "text-purple-700", icon: Lightbulb, label: "Experience" },
    Discussion: { bg: "bg-blue-50", text: "text-blue-700", icon: MessageCircle, label: "Discussion" },
};

export default function PostCard({ post }: Props) {
    const [voted, setVoted] = useState(false);
    const type = typeStyles[post.type];
    const TypeIcon = type.icon;

    return (
        <div className="group bg-white rounded-2xl border border-slate-200 hover:border-amber-400/60 hover:shadow-lg transition-all p-6 flex gap-4">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${type.bg} ${type.text}`}>
                        <TypeIcon className="w-3 h-3" />
                        {type.label}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-[#1a2332] leading-tight mb-2 group-hover:text-amber-700 transition-colors cursor-pointer">
                    {post.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    {post.body}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((t) => (
                        <span
                            key={t}
                            className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#1a2332]/5 text-[#1a2332] border border-[#1a2332]/10 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200 transition-colors cursor-pointer"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                            style={{ backgroundColor: post.author.avatarColor }}
                        >
                            {post.author.initials}
                        </div>
                        <div className="text-xs">
                            <span className="font-semibold text-slate-800">{post.author.name}</span>
                            <span className="text-slate-400"> · </span>
                            <span className="text-slate-500">{post.author.role}</span>
                            <span className="text-slate-400"> · </span>
                            <span className="text-slate-500">{post.author.batch}</span>
                            <span className="text-slate-400"> · </span>
                            <span className="text-slate-400">{post.timeAgo}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {post.answers} answers
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" />
                            {post.views} views
                        </span>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setVoted(!voted)}
                className={`flex flex-col items-center justify-center gap-1 px-3 rounded-xl border transition-all min-w-[60px] ${voted
                        ? "bg-amber-500 border-amber-500 text-[#1a2332]"
                        : "bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50 text-slate-700"
                    }`}
            >
                <ChevronUp className="w-5 h-5" />
                <span className="text-sm font-bold">{post.votes + (voted ? 1 : 0)}</span>
            </button>
        </div>
    );
}