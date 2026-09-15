export type PostType = "Question" | "Experience" | "Discussion";

export type Post = {
    id: number;
    type: PostType;
    title: string;
    body: string;
    tags: string[];
    author: {
        name: string;
        initials: string;
        role: string;
        batch: string;
        avatarColor: string;
    };
    timeAgo: string;
    answers: number;
    views: number;
    votes: number;
};

export const posts: Post[] = [
    {
        id: 1,
        type: "Question",
        title: "What topics should I focus on for TCS technical round?",
        body: "I have my TCS technical round next week for the Software Developer role. Can anyone who recently appeared for the interview share the important topics and type of questions asked? Is DSA heavily weighted or should I focus more on DBMS and OOP?",
        tags: ["TCS", "Technical", "DSA", "DBMS"],
        author: {
            name: "Riya S.",
            initials: "RS",
            role: "TE Computer",
            batch: "Batch 2026",
            avatarColor: "#f97316",
        },
        timeAgo: "2 hours ago",
        answers: 5,
        views: 124,
        votes: 12,
    },
    {
        id: 2,
        type: "Experience",
        title: "Infosys interview experience (Result Awaited)",
        body: "I appeared for the Infosys off-campus drive on 5th Sept 2026. Sharing my experience for those who have upcoming drives. The aptitude round was standard, technical focused on Java + DBMS, HR was conversational.",
        tags: ["Infosys", "Technical", "HR", "Off-Campus"],
        author: {
            name: "Aditya P.",
            initials: "AP",
            role: "BE IT",
            batch: "Batch 2026",
            avatarColor: "#0f766e",
        },
        timeAgo: "5 hours ago",
        answers: 8,
        views: 230,
        votes: 28,
    },
    {
        id: 3,
        type: "Discussion",
        title: "How to improve problem-solving for company placements?",
        body: "I am good with basic DSA but struggle with medium and hard problems. What resources, strategy, or platforms helped you improve? Any specific roadmap for the next 3 months?",
        tags: ["DSA", "Preparation Tips"],
        author: {
            name: "Sneha K.",
            initials: "SK",
            role: "TE Computer",
            batch: "Batch 2026",
            avatarColor: "#7c3aed",
        },
        timeAgo: "1 day ago",
        answers: 12,
        views: 412,
        votes: 36,
    },
    {
        id: 4,
        type: "Question",
        title: "Is it possible to get placed with low CGPA?",
        body: "My CGPA is 6.5 and I'm worried about placements. Has anyone with a similar CGPA been placed? What companies should I target and what can I do to improve my chances?",
        tags: ["Placement", "CGPA", "Advice"],
        author: {
            name: "Rohit M.",
            initials: "RM",
            role: "BE Mechanical",
            batch: "Batch 2026",
            avatarColor: "#dc2626",
        },
        timeAgo: "1 day ago",
        answers: 20,
        views: 380,
        votes: 25,
    },
    {
        id: 5,
        type: "Experience",
        title: "Accenture interview experience (Rejected)",
        body: "I gave my Accenture interview last week and unfortunately got rejected. Sharing my experience so that others can prepare better. The questions were mostly scenario-based and coding focused.",
        tags: ["Accenture", "Coding", "HR"],
        author: {
            name: "Priya S.",
            initials: "PS",
            role: "TE IT",
            batch: "Batch 2026",
            avatarColor: "#be185d",
        },
        timeAgo: "2 days ago",
        answers: 15,
        views: 500,
        votes: 42,
    },
];

export const topContributors = [
    { name: "Akash J.", answers: 87, badge: "🏆" },
    { name: "Neha R.", answers: 62, badge: "🥈" },
    { name: "Vikram S.", answers: 48, badge: "🥉" },
];

export const trendingTopics = [
    { name: "TCS Interview", posts: 48 },
    { name: "Resume Review", posts: 36 },
    { name: "Off-Campus Opportunities", posts: 32 },
    { name: "HR Questions", posts: 30 },
    { name: "DSA Preparation", posts: 28 },
];

export const communityStats = {
    totalPosts: 324,
    totalAnswers: 1200,
    students: 850,
    helpfulPercentage: 95,
};