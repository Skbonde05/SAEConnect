import { useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  MessageCircle,
  Users,
  GraduationCap,
  Quote,
  Sparkles,
} from "lucide-react";

interface SplashScreenProps {
  duration?: number;
  onFinish?: () => void;
  onGetStarted?: () => void;
  onLogin?: () => void;
}

/* =====================================================
   SLIDES (background images)
===================================================== */

const slides = [
  {
    image: "/images/image1.png",
    title: "Welcome to Sinhgad Placement Hub.",
    description:
      "Your campus-driven space to explore, connect and grow together.",
  },
  {
    image: "/images/image2.png",
    title: "Ask & Share. Learn Together.",
    description:
      "Ask questions, share your placement journey and learn from the Sinhgad community.",
  },
  {
    image: "/images/image3.png",
    title: "Discover Placement Insights.",
    description:
      "Explore interview rounds, questions, preparation strategies and real placement outcomes.",
  },
];

/* =====================================================
   FEATURES
===================================================== */

const features = [
  {
    icon: BookOpen,
    title: "Explore",
    description: "Real placement experiences",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    ring: "ring-blue-200/70",
  },
  {
    icon: MessageCircle,
    title: "Ask & Share",
    description: "Get answers from peers",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    ring: "ring-emerald-200/70",
  },
  {
    icon: BarChart3,
    title: "Gain Insights",
    description: "Discover trends & opportunities",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    ring: "ring-amber-200/70",
  },
  {
    icon: Users,
    title: "Grow Together",
    description: "Support the Sinhgad community",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    ring: "ring-violet-200/70",
  },
];

/* =====================================================
   SPLASH SCREEN
===================================================== */

export default function SplashScreen({
  duration = 6000,
  onFinish,
  onGetStarted,
}: SplashScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  /* ===================================================
     AUTOMATIC SLIDER
  =================================================== */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[currentSlide];

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-slate-900 font-sans antialiased">
      {/* =================================================
          BACKGROUND SLIDER (full page)
      ================================================= */}

      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.title}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1200ms] ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Soft dark overlay */}
        <div className="absolute inset-0 bg-slate-950/45" />

        {/* Vertical gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950/70" />

        {/* Brand tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-transparent to-slate-950/30" />
      </div>

      {/* =================================================
          HEADER — Get Started
      ================================================= */}

      <button
        onClick={onGetStarted}
        className="
          group absolute right-4 top-4 z-30
          flex items-center gap-2
          rounded-full
          bg-blue-600
          px-4 py-2
          text-xs font-semibold text-white
          shadow-lg shadow-blue-900/40
          ring-1 ring-white/10
          transition-all duration-200
          hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-900/50
          active:scale-[0.98]
          sm:right-8 sm:top-6 sm:px-5 sm:py-2.5 sm:text-sm
        "
      >
        Get Started
        <ArrowRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </button>

      {/* =================================================
          MAIN CONTAINER — single viewport
      ================================================= */}

      <div className="relative z-10 mx-auto flex h-full max-w-[1500px] flex-col px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
        {/* =================================================
            LOGO / BRAND
        ================================================= */}

        <header className="flex shrink-0 flex-col items-center">
          <div
            className="
              relative flex h-14 w-14 items-center justify-center
              rounded-2xl
              bg-gradient-to-br from-blue-500 to-blue-700
              shadow-lg shadow-blue-950/50
              ring-1 ring-white/20
              sm:h-16 sm:w-16
            "
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/25 to-transparent" />
            <GraduationCap
              size={36}
              strokeWidth={1.8}
              className="relative text-white drop-shadow-sm sm:hidden"
            />
            <GraduationCap
              size={42}
              strokeWidth={1.8}
              className="relative hidden text-white drop-shadow-sm sm:block"
            />
          </div>

          <h1 className="mt-3 text-center text-2xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-3xl">
            Sinhgad{" "}
            <span className="bg-gradient-to-r from-blue-300 to-sky-200 bg-clip-text text-transparent">
              Placement Hub
            </span>
          </h1>

          <p className="mt-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-200/90 sm:text-xs">
            Learn&nbsp; • &nbsp;Share&nbsp; • &nbsp;Grow Together
          </p>
        </header>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="mx-auto mt-4 max-w-3xl shrink-0 text-center sm:mt-6">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold text-blue-100 shadow-sm backdrop-blur-md sm:text-xs">
            <Sparkles size={11} />
            Student-driven placement community
          </div>

          <h2 className="text-2xl font-black leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-4xl lg:text-5xl">
            Real Experiences.{" "}
            <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-blue-100 bg-clip-text text-transparent">
              Brighter Futures.
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-slate-100/90 drop-shadow sm:text-sm sm:leading-6">
            A student-driven platform to share placement experiences,
            ask questions, explore insights and help each other succeed.
          </p>
        </section>

        {/* =================================================
            FEATURES
        ================================================= */}

        <section className="mx-auto mt-5 grid w-full max-w-4xl shrink-0 grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-4 sm:gap-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group flex items-center gap-3
                  rounded-2xl
                  border border-white/15
                  bg-white/10
                  p-3
                  shadow-lg shadow-slate-950/30
                  backdrop-blur-md
                  transition-all duration-300
                  hover:-translate-y-1 hover:bg-white/15
                  sm:flex-col sm:items-center sm:text-center
                  sm:p-4
                "
              >
                <div
                  className={`
                    flex h-10 w-10 shrink-0 items-center justify-center
                    rounded-xl
                    ${feature.iconBg}
                    ring-1 ${feature.ring}
                    shadow-sm
                    transition-all duration-300
                    group-hover:scale-105
                    sm:h-12 sm:w-12 sm:rounded-2xl
                  `}
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    className={`${feature.iconColor} sm:hidden`}
                  />
                  <Icon
                    size={24}
                    strokeWidth={2}
                    className={`hidden ${feature.iconColor} sm:block`}
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-white sm:mt-2.5 sm:text-base">
                    {feature.title}
                  </h3>

                  <p className="mt-0.5 text-[11px] leading-4 text-slate-200/85 sm:text-xs">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* =================================================
            QUOTE
        ================================================= */}

        <section
          className="
            mx-auto mt-5 w-full max-w-3xl shrink-0
            rounded-2xl
            border border-white/15
            bg-white/10
            px-4 py-3
            shadow-lg shadow-slate-950/30
            backdrop-blur-md
            sm:px-6 sm:py-4
          "
        >
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 sm:h-10 sm:w-10">
              <Quote
                size={18}
                className="text-blue-200"
                fill="currentColor"
              />
            </div>

            <div>
              <p className="text-center text-xs font-medium italic leading-5 text-slate-100 sm:text-sm">
                “Every experience shared today can help someone
                prepare better tomorrow.”
              </p>

              <p className="mt-0.5 text-center text-[10px] font-semibold text-slate-300/90 sm:text-xs">
                — Sinhgad Placement Hub
              </p>
            </div>
          </div>
        </section>

        {/* =================================================
            SLIDE CAPTION (only)
        ================================================= */}

        <section className="mt-auto flex w-full shrink-0 flex-col items-center pb-1 pt-4">
          <div className="min-h-[44px] text-center">
            <h3 className="text-sm font-bold text-white drop-shadow sm:text-base">
              {activeSlide.title}
            </h3>

            <p className="mx-auto mt-1 max-w-xl text-[11px] leading-5 text-slate-200/90 drop-shadow sm:text-xs">
              {activeSlide.description}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}