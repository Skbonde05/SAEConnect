import { useState } from "react";
import {
    ArrowRight,
    BookOpen,
    Building2,
    CheckCircle2,
    GraduationCap,
    Heart,
    Lightbulb,
    MessageCircle,
    Search,
    ShieldCheck,
    Target,
    Users,
    ChevronDown,
    ChevronUp,
    HelpCircle,
} from "lucide-react";

interface AboutProps {
    onNavigateHome?: () => void;
    onNavigateExperiences?: () => void;
    onNavigateInsights?: () => void;
}

export default function AboutPage({
    onNavigateHome,
    onNavigateExperiences,
    onNavigateInsights,
}: AboutProps) {

    const [openFaq, setOpenFaq] = useState<number | null>(0);


    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans">

            {/* =====================================================
          HEADER
      ===================================================== */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shadow-sm">

                {/* Logo */}
                <button
                    onClick={onNavigateHome}
                    className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg font-extrabold flex items-center gap-2 hover:bg-amber-400 transition-all"
                >
                    <Building2 className="w-5 h-5" />
                    <span className="text-base tracking-tight">
                        Sinhgad Placement Hub
                    </span>
                </button>

                {/* Navigation */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">

                    <button
                        onClick={onNavigateHome}
                        className="hover:text-amber-600 transition-colors"
                    >
                        Home
                    </button>

                    <button
                        onClick={onNavigateExperiences}
                        className="hover:text-amber-600 transition-colors"
                    >
                        Experiences
                    </button>

                    <button className="hover:text-amber-600 transition-colors">
                        Companies
                    </button>

                    <button className="hover:text-amber-600 transition-colors">
                        Ask & Share
                    </button>

                    <button
                        onClick={onNavigateInsights}
                        className="hover:text-amber-600 transition-colors"
                    >
                        Insights
                    </button>

                    <button className="text-amber-600 font-semibold border-b-2 border-amber-500 pb-1">
                        About
                    </button>

                </nav>

                {/* Share button */}
                <button className="bg-amber-500 text-slate-950 px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-400 transition-all shadow-sm">
                    + Share Experience
                </button>
            </header>


            {/* =====================================================
          HERO SECTION
      ===================================================== */}
            <section className="bg-[#0F172A] text-white px-6 py-20">

                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left */}
                    <div>

                        <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-amber-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Users className="w-4 h-4" />
                            Student-Driven Community
                        </div>

                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                            About{" "}
                            <span className="text-amber-400">
                                Sinhgad Placement Hub
                            </span>
                        </h1>

                        <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
                            A student-driven platform where Sinhgad students and alumni
                            can share placement experiences, ask questions, learn from
                            each other and prepare better for their future.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">

                            <button
                                onClick={onNavigateExperiences}
                                className="bg-amber-500 text-slate-950 px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-amber-400 transition-all"
                            >
                                Explore Experiences
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <button
                                onClick={onNavigateInsights}
                                className="border border-slate-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all"
                            >
                                View Insights
                            </button>

                        </div>
                    </div>


                    {/* Right Illustration/Card */}
                    <div className="relative">

                        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl">

                            <div className="grid grid-cols-2 gap-5">

                                <div className="bg-slate-900 rounded-2xl p-6">
                                    <GraduationCap className="w-9 h-9 text-amber-400 mb-4" />
                                    <h3 className="font-bold text-lg">
                                        Learn
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-2">
                                        Learn from real experiences shared by seniors.
                                    </p>
                                </div>

                                <div className="bg-slate-900 rounded-2xl p-6">
                                    <MessageCircle className="w-9 h-9 text-amber-400 mb-4" />
                                    <h3 className="font-bold text-lg">
                                        Ask
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-2">
                                        Ask questions and get guidance from the community.
                                    </p>
                                </div>

                                <div className="bg-slate-900 rounded-2xl p-6">
                                    <Users className="w-9 h-9 text-amber-400 mb-4" />
                                    <h3 className="font-bold text-lg">
                                        Connect
                                    </h3>
                                    <p className="text-sm text-slate-400 mt-2">
                                        Connect students and alumni through shared knowledge.
                                    </p>
                                </div>

                                <div className="bg-amber-500 text-slate-950 rounded-2xl p-6">
                                    <Heart className="w-9 h-9 mb-4" />
                                    <h3 className="font-bold text-lg">
                                        Grow
                                    </h3>
                                    <p className="text-sm mt-2">
                                        Help each other prepare for better opportunities.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>


            {/* =====================================================
          STATS
      ===================================================== */}
            <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md text-center">
                        <BookOpen className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                        <h2 className="text-3xl font-extrabold text-slate-900">
                            2,500+
                        </h2>
                        <p className="text-slate-500 mt-1">
                            Placement Experiences
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md text-center">
                        <Users className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                        <h2 className="text-3xl font-extrabold text-slate-900">
                            580+
                        </h2>
                        <p className="text-slate-500 mt-1">
                            Students & Alumni
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md text-center">
                        <Building2 className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                        <h2 className="text-3xl font-extrabold text-slate-900">
                            120+
                        </h2>
                        <p className="text-slate-500 mt-1">
                            Companies Covered
                        </p>
                    </div>

                </div>

            </section>


            {/* =====================================================
          OUR PURPOSE
      ===================================================== */}
            <section className="max-w-6xl mx-auto px-6 py-20">

                <div className="mb-10">
                    <p className="text-amber-600 font-bold uppercase tracking-wider text-sm">
                        Why We Exist
                    </p>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                        Our Purpose
                    </h2>

                    <p className="text-slate-500 mt-3 max-w-2xl">
                        We believe every placement experience has something valuable
                        to teach the next student.
                    </p>
                </div>


                <div className="grid md:grid-cols-3 gap-6">

                    {/* Mission */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all">

                        <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-5">
                            <Target className="w-7 h-7 text-amber-600" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900">
                            Our Mission
                        </h3>

                        <p className="text-slate-600 mt-3 leading-relaxed">
                            To create a reliable and open platform where Sinhgad students
                            and alumni can share placement experiences, ask questions
                            and help each other prepare better.
                        </p>

                    </div>


                    {/* Vision */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all">

                        <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-5">
                            <Lightbulb className="w-7 h-7 text-slate-700" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900">
                            Our Vision
                        </h3>

                        <p className="text-slate-600 mt-3 leading-relaxed">
                            To build a trusted placement knowledge community that helps
                            students make informed decisions and achieve their career
                            goals.
                        </p>

                    </div>


                    {/* Values */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all">

                        <div className="w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center mb-5">
                            <Heart className="w-7 h-7 text-amber-600" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900">
                            Our Values
                        </h3>

                        <div className="space-y-3 mt-4">

                            {[
                                "Honesty & Transparency",
                                "Supportive Community",
                                "Respect for Every Experience",
                                "Continuous Learning",
                                "Student-Driven Growth",
                            ].map((value) => (
                                <div
                                    key={value}
                                    className="flex items-center gap-2 text-slate-600 text-sm"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                                    {value}
                                </div>
                            ))}

                        </div>

                    </div>

                </div>
            </section>


            {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
            <section className="bg-white border-y border-slate-200">

                <div className="max-w-6xl mx-auto px-6 py-20">

                    <div className="text-center mb-12">

                        <p className="text-amber-600 font-bold uppercase tracking-wider text-sm">
                            Simple & Useful
                        </p>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                            How Sinhgad Placement Hub Works
                        </h2>

                        <p className="text-slate-500 mt-3">
                            Learn, share, discuss and grow together.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-4 gap-6">

                        {[
                            {
                                number: "01",
                                icon: Search,
                                title: "Explore",
                                text: "Browse placement experiences, companies and interview questions.",
                            },
                            {
                                number: "02",
                                icon: BookOpen,
                                title: "Learn",
                                text: "Understand interview rounds, preparation strategies and real experiences.",
                            },
                            {
                                number: "03",
                                icon: MessageCircle,
                                title: "Share",
                                text: "Share your experience or ask questions to help other students.",
                            },
                            {
                                number: "04",
                                icon: Users,
                                title: "Grow",
                                text: "Use community knowledge to prepare better for your future.",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.number}
                                    className="relative bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6"
                                >

                                    <span className="text-amber-500 font-extrabold text-sm">
                                        {item.number}
                                    </span>

                                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mt-4">
                                        <Icon className="w-6 h-6 text-amber-600" />
                                    </div>

                                    <h3 className="font-bold text-lg mt-5 text-slate-900">
                                        {item.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                        {item.text}
                                    </p>

                                </div>
                            );
                        })}

                    </div>

                </div>
            </section>


            {/* =====================================================
          WHO CAN USE IT
      ===================================================== */}
            <section className="max-w-6xl mx-auto px-6 py-20">

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    <div>

                        <p className="text-amber-600 font-bold uppercase tracking-wider text-sm">
                            For Our Community
                        </p>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">
                            Who Can Use It?
                        </h2>

                        <p className="text-slate-500 mt-4 leading-relaxed">
                            Sinhgad Placement Hub is designed for the entire Sinhgad
                            community — students, alumni and anyone who wants to learn
                            from genuine placement experiences.
                        </p>

                        <div className="space-y-5 mt-8">

                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                                    <GraduationCap className="w-6 h-6 text-amber-600" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900">
                                        Current Students
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Share experiences, ask doubts and prepare for upcoming
                                        placement drives.
                                    </p>
                                </div>
                            </div>


                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                                    <Users className="w-6 h-6 text-slate-700" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900">
                                        Alumni
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Share your previous placement experiences and guide
                                        current students.
                                    </p>
                                </div>
                            </div>


                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                                    <Heart className="w-6 h-6 text-amber-600" />
                                </div>

                                <div>
                                    <h3 className="font-bold text-slate-900">
                                        Everyone in the Community
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Whether selected, rejected, waitlisted or still
                                        preparing — every experience matters.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>


                    {/* Quote */}
                    <div className="bg-[#0F172A] rounded-3xl p-10 text-white">

                        <ShieldCheck className="w-12 h-12 text-amber-400 mb-8" />

                        <p className="text-2xl md:text-3xl font-bold leading-relaxed">
                            "Every experience shared today can help someone prepare
                            better tomorrow."
                        </p>

                        <div className="h-1 w-16 bg-amber-500 mt-8 mb-4 rounded-full" />

                        <p className="text-slate-400">
                            — Sinhgad Placement Hub
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================================
          COMMUNITY GUIDELINES
      ===================================================== */}
            <section className="bg-amber-50 border-y border-amber-100">

                <div className="max-w-6xl mx-auto px-6 py-16">

                    <div className="grid lg:grid-cols-2 gap-10">

                        <div>

                            <h2 className="text-3xl font-extrabold text-slate-900">
                                Our Community Guidelines
                            </h2>

                            <p className="text-slate-500 mt-3">
                                Let's keep our community helpful, respectful and genuine.
                            </p>

                        </div>


                        <div className="space-y-4">

                            {[
                                "Be respectful and supportive to everyone.",
                                "Share honest and genuine experiences.",
                                "Avoid sharing sensitive or confidential information.",
                                "No spam or promotional content.",
                                "Help others grow by answering questions.",
                                "Report inappropriate content.",
                            ].map((rule) => (
                                <div
                                    key={rule}
                                    className="flex items-center gap-3 bg-white border border-amber-100 rounded-lg p-4"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span className="text-sm text-slate-700">
                                        {rule}
                                    </span>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </section>

            {/* =====================================================
    FREQUENTLY ASKED QUESTIONS
===================================================== */}

            <section className="py-16 px-6 bg-[#F8FAFC]">
                <div className="max-w-6xl mx-auto">

                    {/* Section Heading */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-sm font-semibold mb-4">
                            <HelpCircle className="w-4 h-4" />
                            Frequently Asked Questions
                        </div>

                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                            Got Questions?
                            <span className="text-amber-500"> We've Got Answers.</span>
                        </h2>

                        <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
                            Quick answers to common questions about Sinhgad Placement Hub,
                            experiences, sharing, and the student community.
                        </p>
                    </div>

                    {/* FAQ Cards */}
                    <div className="grid md:grid-cols-2 gap-5">

                        {[
                            {
                                question: "Who can post on this platform?",
                                answer:
                                    "Any Sinhgad student or alumnus can share their placement experience, ask questions, or participate in discussions. The goal is to help students learn from real experiences.",
                            },
                            {
                                question:
                                    "Do I need to be selected in a company to share my experience?",
                                answer:
                                    "No. You can share experiences from interviews, rejections, preparation, internships, or selection journeys. Every genuine experience can help another student prepare better.",
                            },
                            {
                                question: "Is the information verified?",
                                answer:
                                    "Experiences are shared by students and alumni. Users are encouraged to provide honest and genuine information. Community reporting and moderation can help identify inappropriate or misleading content.",
                            },
                            {
                                question:
                                    "Can I share off-campus or internship experiences?",
                                answer:
                                    "Yes. You can share useful placement, internship, interview, and career experiences that can help other students prepare better.",
                            },
                            {
                                question: "How can I ask a question?",
                                answer:
                                    "You can use the Ask & Share section to post your question. Other students and alumni can then share their knowledge, suggestions, and experiences.",
                            },
                            {
                                question: "How can I report inappropriate content?",
                                answer:
                                    "If you find inappropriate, offensive, misleading, or confidential content, you can report it to the platform moderators so that it can be reviewed.",
                            },
                        ].map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={index}
                                    className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                        ? "bg-white border-amber-300 shadow-lg shadow-amber-100/50"
                                        : "bg-white border-slate-200 shadow-sm hover:border-amber-300 hover:shadow-md"
                                        }`}
                                >

                                    {/* Question */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(isOpen ? null : index)
                                        }
                                        className="w-full flex items-center gap-4 text-left p-5 md:p-6"
                                    >

                                        {/* Number */}
                                        <div
                                            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all ${isOpen
                                                ? "bg-amber-500 text-slate-900"
                                                : "bg-amber-50 text-amber-600 group-hover:bg-amber-100"
                                                }`}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        {/* Question */}
                                        <span
                                            className={`flex-1 font-bold text-base md:text-lg ${isOpen
                                                ? "text-amber-600"
                                                : "text-slate-800"
                                                }`}
                                        >
                                            {faq.question}
                                        </span>

                                        {/* Arrow */}
                                        <div
                                            className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${isOpen
                                                ? "bg-amber-500 text-slate-900"
                                                : "bg-slate-100 text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-600"
                                                }`}
                                        >
                                            {isOpen ? (
                                                <ChevronUp className="w-5 h-5" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5" />
                                            )}
                                        </div>

                                    </button>

                                    {/* Answer */}
                                    {isOpen && (
                                        <div className="px-5 md:px-6 pb-6">
                                            <div className="ml-14 border-l-2 border-amber-200 pl-4">
                                                <p className="text-sm md:text-base leading-7 text-slate-600">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            );
                        })}

                    </div>

                    {/* Bottom Help Box */}
                    <div className="mt-10 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                <HelpCircle className="w-6 h-6 text-amber-500" />
                            </div>

                            <div>
                                <h3 className="font-bold text-slate-900">
                                    Still have a question?
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    Ask the Sinhgad student community and learn from their experiences.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                console.log("Ask & Share clicked");
                            }}
                            className="px-6 py-3 rounded-xl bg-amber-500 text-slate-900 font-bold text-sm hover:bg-amber-400 transition-all shadow-md hover:shadow-lg"
                        >
                            Ask & Share →
                        </button>

                    </div>

                </div>
            </section>

            {/* =====================================================
          CTA
      ===================================================== */}
            <section className="max-w-6xl mx-auto px-6 py-16">

                <div className="bg-[#0F172A] rounded-3xl px-8 py-12 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">

                    <div>

                        <p className="text-amber-400 font-bold uppercase tracking-wider text-sm">
                            Be Part of the Community
                        </p>

                        <h2 className="text-3xl font-extrabold text-white mt-2">
                            Share. Learn. Support. Grow.
                        </h2>

                        <p className="text-slate-400 mt-3">
                            Your experience today can make someone else's preparation easier.
                        </p>

                    </div>

                    <button className="bg-amber-500 text-slate-950 px-7 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-amber-400 transition-all whitespace-nowrap">
                        Share Your Experience
                        <ArrowRight className="w-5 h-5" />
                    </button>

                </div>

            </section>


            {/* =====================================================
          FOOTER
      ===================================================== */}
            <footer className="bg-[#0F172A] text-white">

                <div className="max-w-6xl mx-auto px-6 py-12">

                    <div className="grid md:grid-cols-4 gap-10">

                        {/* Brand */}
                        <div className="md:col-span-2">

                            <div className="flex items-center gap-2">
                                <div className="bg-amber-500 text-slate-950 p-2 rounded-lg">
                                    <Building2 className="w-5 h-5" />
                                </div>

                                <div>
                                    <h3 className="font-extrabold">
                                        Sinhgad Placement Hub
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        Learn • Share • Grow Together
                                    </p>
                                </div>
                            </div>

                            <p className="text-slate-400 text-sm leading-relaxed mt-5 max-w-md">
                                A student-driven platform to collect, share and learn
                                from placement experiences within the Sinhgad community.
                            </p>

                        </div>


                        {/* Quick Links */}
                        <div>

                            <h4 className="font-bold mb-4">
                                Quick Links
                            </h4>

                            <div className="space-y-3 text-sm text-slate-400">

                                <button
                                    onClick={onNavigateHome}
                                    className="block hover:text-amber-400"
                                >
                                    Home
                                </button>

                                <button
                                    onClick={onNavigateExperiences}
                                    className="block hover:text-amber-400"
                                >
                                    Experiences
                                </button>

                                <button
                                    onClick={onNavigateInsights}
                                    className="block hover:text-amber-400"
                                >
                                    Insights
                                </button>

                                <button className="block hover:text-amber-400">
                                    Ask & Share
                                </button>

                            </div>

                        </div>


                        {/* Resources */}
                        <div>

                            <h4 className="font-bold mb-4">
                                Resources
                            </h4>

                            <div className="space-y-3 text-sm text-slate-400">

                                <p className="hover:text-amber-400 cursor-pointer">
                                    Placement Preparation Tips
                                </p>

                                <p className="hover:text-amber-400 cursor-pointer">
                                    Interview Questions
                                </p>

                                <p className="hover:text-amber-400 cursor-pointer">
                                    Community Guidelines
                                </p>

                                <p className="hover:text-amber-400 cursor-pointer">
                                    Contact Us
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm text-slate-500">

                        <p>
                            © 2026 Sinhgad Placement Hub. All rights reserved.
                        </p>

                        <p>
                            Made with <span className="text-amber-400">♥</span> for the
                            Sinhgad Community
                        </p>

                    </div>

                </div>

            </footer>

        </div>
    );
}