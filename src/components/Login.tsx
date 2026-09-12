import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Users,
  Zap,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

interface LoginProps {
  onLogin?: (emailOrPrn: string, password: string) => void;
  onCreateAccount?: () => void;
  onForgotPassword?: () => void;
}

/* =====================================================
   FEATURES
===================================================== */

const features = [
  {
    title: "Learn",
    description: "from experiences",
    icon: BookOpen,
  },
  {
    title: "Ask & Share",
    description: "with the community",
    icon: Users,
  },
  {
    title: "Get Insights",
    description: "and trends",
    icon: BriefcaseBusiness,
  },
  {
    title: "Grow",
    description: "with confidence",
    icon: Zap,
  },
];

/* =====================================================
   LOGIN PAGE
===================================================== */

const Login = ({
  onLogin,
  onCreateAccount,
  onForgotPassword,
}: LoginProps) => {
  const [emailOrPrn, setEmailOrPrn] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /* ===================================================
     LOGIN SUBMIT
  =================================================== */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onLogin?.(emailOrPrn, password);
  };

  return (
    <main className="h-screen w-full overflow-hidden bg-white font-sans antialiased">
      <div className="grid h-full grid-cols-1 lg:grid-cols-2">

        {/* =================================================
            LEFT SIDE — BRAND PANEL
        ================================================= */}

        <section className="relative hidden h-full overflow-hidden lg:flex">

          {/* Background Image */}
          <img
            src="/images/image1.png"
            alt="Sinhgad campus"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Layered overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/85 via-blue-900/70 to-slate-900/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

          {/* Decorative orbs */}
          <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

          {/* Left Content */}
          <div className="relative z-10 flex h-full w-full flex-col px-12 py-8 xl:px-16">

            {/* =================================================
                LOGO
            ================================================= */}

            <div className="flex items-center gap-3">

              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-950/50 ring-1 ring-white/20">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/25 to-transparent" />
                <GraduationCap className="relative h-6 w-6 text-white" />
              </div>

              <div>
                <h1 className="text-lg font-bold tracking-tight text-white">
                  Sinhgad Placement Hub
                </h1>

                <p className="text-xs font-medium tracking-wide text-blue-200/90">
                  Learn • Share • Grow Together
                </p>
              </div>

            </div>

            {/* =================================================
                HERO CONTENT
            ================================================= */}

            <div className="mt-14 max-w-xl">

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Trusted by the Sinhgad community
              </div>

              <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white xl:text-5xl">
                Your Placement
                <br />
                Journey,{" "}
                <span className="bg-gradient-to-r from-blue-300 via-sky-200 to-blue-100 bg-clip-text text-transparent">
                  Together
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-base leading-6 text-blue-100/85 xl:text-lg">
                A community of Sinhgad students and alumni sharing real
                experiences, insights and support to help you prepare
                better for tomorrow.
              </p>

            </div>

            {/* =================================================
                FEATURES
            ================================================= */}

            <div className="mt-10 grid max-w-xl grid-cols-4 gap-3">

              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="
                      group flex flex-col items-center rounded-xl
                      border border-white/10
                      bg-white/5
                      px-2 py-3.5
                      text-center
                      backdrop-blur-sm
                      transition-all duration-300
                      hover:-translate-y-1 hover:border-white/25 hover:bg-white/10
                    "
                  >

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15 transition group-hover:bg-white/15">
                      <Icon className="h-4 w-4 text-blue-200" />
                    </div>

                    <p className="mt-2.5 text-xs font-bold text-white sm:text-sm">
                      {feature.title}
                    </p>

                    <p className="mt-0.5 text-[10px] leading-4 text-blue-200/75 sm:text-[11px]">
                      {feature.description}
                    </p>

                  </div>
                );
              })}

            </div>

          </div>
        </section>

        {/* =================================================
            RIGHT SIDE — FORM
        ================================================= */}

        <section className="relative flex h-full flex-col bg-white">

          {/* =================================================
              TOP BAR
          ================================================= */}

          <div className="flex shrink-0 items-center justify-end gap-4 px-6 py-6 sm:px-10 lg:px-12">

            <span className="text-sm font-medium text-slate-600">
              New here?
            </span>

            <button
              type="button"
              onClick={onCreateAccount}
              className="
                group inline-flex items-center gap-2
                rounded-full border border-blue-600
                px-5 py-2.5
                text-sm font-semibold text-blue-600
                transition-all duration-200
                hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200/70
              "
            >
              Create an Account
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

          </div>

          {/* =================================================
              LOGIN FORM AREA
          ================================================= */}

          <div className="flex min-h-0 flex-1 items-center justify-center px-6 py-6 sm:px-10 lg:px-12">

            <div className="w-full max-w-[480px]">

              {/* Heading */}

              <div className="text-center">

                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Welcome back
                </h2>

                <p className="mx-auto mt-2.5 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                  Login to continue your placement journey with
                  the Sinhgad community.
                </p>

              </div>

              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="mt-8"
              >

                {/* Email / PRN */}

                <div>

                  <label
                    htmlFor="emailOrPrn"
                    className="mb-2 block text-sm font-semibold text-slate-800"
                  >
                    Email / PRN
                  </label>

                  <div className="relative">

                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      id="emailOrPrn"
                      type="text"
                      value={emailOrPrn}
                      onChange={(event) =>
                        setEmailOrPrn(event.target.value)
                      }
                      placeholder="Enter your email or PRN"
                      required
                      autoComplete="username"
                      className="
                        h-12 w-full rounded-xl
                        border border-slate-200
                        bg-slate-50/60
                        pl-12 pr-4
                        text-sm text-slate-900
                        outline-none
                        transition-all duration-200
                        placeholder:text-slate-400
                        hover:border-slate-300
                        focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100
                      "
                    />

                  </div>

                </div>

                {/* Password */}

                <div className="mt-5">

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-800"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={onForgotPassword}
                      className="text-xs font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                    >
                      Forgot Password?
                    </button>

                  </div>

                  <div className="relative">

                    <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Enter your password"
                      required
                      autoComplete="current-password"
                      className="
                        h-12 w-full rounded-xl
                        border border-slate-200
                        bg-slate-50/60
                        pl-12 pr-12
                        text-sm text-slate-900
                        outline-none
                        transition-all duration-200
                        placeholder:text-slate-400
                        hover:border-slate-300
                        focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100
                      "
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((previous) => !previous)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>

                  </div>

                </div>

                {/* Remember me */}

                <div className="mt-5 flex items-center gap-2">

                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
                  />

                  <label
                    htmlFor="remember"
                    className="select-none text-sm font-medium text-slate-600"
                  >
                    Keep me signed in
                  </label>

                </div>

                {/* Login */}

                <button
                  type="submit"
                  className="
                    group mt-6 flex h-12 w-full items-center justify-center gap-2
                    rounded-xl
                    bg-gradient-to-r from-blue-600 to-blue-700
                    text-sm font-semibold text-white
                    shadow-lg shadow-blue-200/70
                    transition-all duration-200
                    hover:from-blue-700 hover:to-blue-800
                    hover:shadow-xl hover:shadow-blue-300/70
                    active:scale-[0.99]
                  "
                >
                  Login

                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>

              </form>

              {/* =================================================
                  DON'T HAVE AN ACCOUNT
              ================================================= */}

              <div className="mt-6 text-center text-sm">

                <span className="text-slate-600">
                  Don't have an account?
                </span>{" "}

                <button
                  type="button"
                  onClick={onCreateAccount}
                  className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Create an account
                </button>

              </div>

              {/* Trust line */}

              <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                Your data is encrypted and secure
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default Login;