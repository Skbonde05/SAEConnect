import { useState } from "react";
import { MessageSquare, Eye, ChevronUp, HelpCircle, Lightbulb, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Post, PostType } from "../lib/askShareData";

interface Props {
  post: Post;
  /**
   * Fired with the *delta* of the vote. The parent owns the authoritative
   * count, so a card must never render its own offset on top of it — doing
   * both previously made every click add 2 and un-voting never decrement.
   */
  onVote?: (id: number | string, delta: 1 | -1) => void;
}

const typeStyles: Record<PostType, { bg: string; text: string; icon: LucideIcon; label: string }> = {
  Question: { bg: "bg-[#c9a227]/10", text: "text-[#c9a227]", icon: HelpCircle, label: "Question" },
  Experience: { bg: "bg-purple-50", text: "text-purple-700", icon: Lightbulb, label: "Experience" },
  Discussion: { bg: "bg-blue-50", text: "text-brand-blue", icon: MessageCircle, label: "Discussion" },
};

export default function PostCard({ post, onVote }: Props) {
  const [voted, setVoted] = useState(false);
  const type = typeStyles[post.type];
  const TypeIcon = type.icon;

  const handleVoteClick = () => {
    const delta: 1 | -1 = voted ? -1 : 1;
    setVoted(!voted);
    onVote?.(post.id, delta);
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-[#c9a227]/60/60 hover:shadow-lg transition-all p-5 sm:p-6 flex gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${type.bg} ${type.text}`}>
            <TypeIcon className="w-3 h-3" />
            {type.label}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#0f2747] leading-snug mb-2 group-hover:text-[#c9a227] transition-colors cursor-pointer">
          {post.title}
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 line-clamp-3">
          {post.body}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.map((t) => (
            <span
              key={t}
              className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[#0f2747]/5 text-[#0f2747] border border-[#0f2747]/10 hover:bg-[#c9a227]/10 hover:text-[#c9a227] hover:border-[#c9a227]/40 transition-colors cursor-pointer"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              style={{ backgroundColor: post.author.avatarColor || "#0f766e" }}
            >
              {post.author.initials}
            </div>
            <div className="text-xs flex flex-wrap items-center gap-1 text-slate-500">
              <span className="font-semibold text-slate-800">{post.author.name}</span>
              <span>·</span>
              <span>{post.author.role}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">{post.author.batch}</span>
              <span>·</span>
              <span className="text-slate-400">{post.timeAgo}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
              {post.answers} answers
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {post.views} views
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleVoteClick}
        className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl border transition-all min-w-[54px] self-start cursor-pointer ${
          voted
            ? "bg-[#c9a227] border-[#c9a227] text-[#0f2747] font-bold"
            : "bg-white border-slate-200 hover:border-[#c9a227]/60 hover:bg-[#c9a227]/10 text-slate-700"
        }`}
      >
        <ChevronUp className="w-5 h-5" />
        <span className="text-xs sm:text-sm font-bold">{post.votes}</span>
      </button>
    </div>
  );
}
