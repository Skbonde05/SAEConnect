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
  CheckCircle2,
  ArrowLeft,
  Send,
} from "lucide-react";
import { sendPasswordResetEmail } from "../lib/supabase";
import Brand from "./Brand";

interface LoginProps {
  onLogin?: (emailOrPrn: string, password: string) => void;
  onCreateAccount?: () => void;
  /**
   * Optional override. If not provided, Login handles the
   * forgot-password flow itself using Supabase.
   */
  onForgotPassword?: () => void;
  errorMessage?: string | null;
  isLoading?: boolean;
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
  errorMessage,
  isLoading,
}: LoginProps) => {
  const [emailOrPrn, setEmailOrPrn] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /* ===================================================
     FORGOT PASSWORD FLOW (inline)
  =================================================== */
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  /* ===================================================
     LOGIN SUBMIT
  =================================================== */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onLogin?.(emailOrPrn, password);
  };

  /* ===================================================
     FORGOT PASSWORD SUBMIT
  =================================================== */

  const handleForgotSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setForgotError(null);

    const trimmed = forgotEmail.trim();

    if (!trimmed.includes("@")) {
      setForgotError(
        "Please enter the email address associated with your account."
      );
      return;
    }

    // If the parent supplied a custom handler, defer to it
    if (onForgotPassword) {
      onForgotPassword();
      return;
    }

    setForgotLoading(true);
    const { error } = await sendPasswordResetEmail(trimmed);
    setForgotLoading(false);

    if (error) {
      setForgotError(error);
      return;
    }

    setForgotSent(true);
  };

  /* ===================================================
     RENDER
  =================================================== */

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
          <div className="absolute inset-0 bg-gradient-to-br from-navy/85 via-navy/70 to-slate-900/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

          {/* Decorative orbs */}
          <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />

          {/* Left Content */}
          <div className="relative z-10 flex h-full w-full flex-col px-12 py-8 xl:px-16">
            {/* =================================================
                LOGO
            ================================================= */}

            <div>
              <Brand size="md" tone="gradient" />
            </div>

            {/* =================================================
                HERO CONTENT
            ================================================= */}

            <div className="mt-14 max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-blue-on-dark backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Trusted by the Sinhgad community
              </div>

              <h2 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white xl:text-5xl">
                Your Placement
                <br />
                Journey,{" "}
                <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                  Together
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-base leading-6 text-blue-on-dark/85 xl:text-lg">
                A community of Sinhgad students and alumni sharing real
                experiences, insights and support to help you prepare better
                for tomorrow.
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
                      <Icon className="h-4 w-4 text-blue-on-dark" />
                    </div>

                    <p className="mt-2.5 text-xs font-bold text-white sm:text-sm">
                      {feature.title}
                    </p>

                    <p className="mt-0.5 text-[10px] leading-4 text-blue-on-dark/75 sm:text-[11px]">
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
                rounded-full border border-brand-blue
                px-5 py-2.5
                text-sm font-semibold text-brand-blue
                transition-all duration-200
                hover:bg-brand-blue hover:text-white hover:shadow-lg hover:shadow-blue-tint/70
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
              {showForgot ? (
                /* =================================================
                   FORGOT PASSWORD VIEW
                ================================================= */
                <>
                  <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                      Reset your password
                    </h2>

                    <p className="mx-auto mt-2.5 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                      Enter the email address on your account and we&apos;ll
                      send you a link to set a new password.
                    </p>
                  </div>

                  {forgotSent ? (
                    <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                      <p className="font-semibold">Check your inbox</p>
                      <p className="mt-1">
                        We&apos;ve sent a password reset link to{" "}
                        <strong className="break-all">{forgotEmail}</strong>.
                        Click the link in the email to choose a new password.
                      </p>
                      <p className="mt-2 text-xs text-emerald-700">
                        Didn&apos;t get it? Check your spam folder or try again
                        in a few minutes.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleForgotSubmit} className="mt-6">
                      {forgotError && (
                        <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-medium text-rose-700">
                          <span className="shrink-0 font-bold">⚠️ Error:</span>
                          <span>{forgotError}</span>
                        </div>
                      )}

                      <div>
                        <label
                          htmlFor="forgotEmail"
                          className="mb-2 block text-sm font-semibold text-slate-800"
                        >
                          Email address
                        </label>

                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                          <input
                            id="forgotEmail"
                            type="email"
                            value={forgotEmail}
                            onChange={(event) =>
                              setForgotEmail(event.target.value)
                            }
                            placeholder="you@sinhgad.edu"
                            required
                            autoComplete="email"
                            className="
                              h-12 w-full rounded-xl
                              border border-slate-200
                              bg-canvas/60
                              pl-12 pr-4
                              text-sm text-slate-900
                              outline-none
                              transition-all duration-200
                              placeholder:text-slate-400
                              hover:border-slate-300
                              focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-blue-tint
                            "
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={forgotLoading}
                        className="
                          group mt-6 flex h-12 w-full items-center justify-center gap-2
                          rounded-xl
                          bg-gradient-to-r from-brand-blue to-navy
                          text-sm font-semibold text-white
                          shadow-lg shadow-brand-blue/20
                          transition-all duration-200
                          hover:from-navy hover:to-navy-deep
                          hover:shadow-xl hover:shadow-brand-blue/30
                          active:scale-[0.99] disabled:opacity-60 cursor-pointer
                        "
                      >
                        {forgotLoading ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Sending reset link...
                          </span>
                        ) : (
                          <>
                            Send reset link
                            <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgot(false);
                        setForgotEmail("");
                        setForgotError(null);
                        setForgotSent(false);
                      }}
                      className="
                        inline-flex items-center gap-1.5
                        text-sm font-semibold text-brand-blue
                        transition hover:text-brand-blue hover:underline
                      "
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back to login
                    </button>
                  </div>
                </>
              ) : (
                /* =================================================
                   LOGIN VIEW
                ================================================= */
                <>
                  {/* Heading */}

                  <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                      Welcome back
                    </h2>

                    <p className="mx-auto mt-2.5 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
                      Login to continue your placement journey with the
                      Sinhgad community.
                    </p>
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-medium text-rose-700">
                      <span className="shrink-0 font-bold">⚠️ Error:</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* =================================================
                      FORM
                  ================================================= */}

                  <form onSubmit={handleSubmit} className="mt-6">
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
                            bg-canvas/60
                            pl-12 pr-4
                            text-sm text-slate-900
                            outline-none
                            transition-all duration-200
                            placeholder:text-slate-400
                            hover:border-slate-300
                            focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-blue-tint
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
                          onClick={() => {
                            if (onForgotPassword) {
                              onForgotPassword();
                            } else {
                              setShowForgot(true);
                            }
                          }}
                          className="text-xs font-semibold text-brand-blue transition hover:text-brand-blue hover:underline"
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
                            bg-canvas/60
                            pl-12 pr-12
                            text-sm text-slate-900
                            outline-none
                            transition-all duration-200
                            placeholder:text-slate-400
                            hover:border-slate-300
                            focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-blue-tint
                          "
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-brand-blue"
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
                        className="h-4 w-4 rounded border-slate-300 text-brand-blue focus:ring-2 focus:ring-blue-tint-strong"
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
                      disabled={isLoading}
                      className="
                        group mt-6 flex h-12 w-full items-center justify-center gap-2
                        rounded-xl
                        bg-gradient-to-r from-brand-blue to-navy
                        text-sm font-semibold text-white
                        shadow-lg shadow-brand-blue/20
                        transition-all duration-200
                        hover:from-navy hover:to-navy-deep
                        hover:shadow-xl hover:shadow-brand-blue/30
                        active:scale-[0.99] disabled:opacity-60 cursor-pointer
                      "
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Signing in...
                        </span>
                      ) : (
                        <>
                          Login
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* =================================================
                      DON'T HAVE AN ACCOUNT
                  ================================================= */}

                  <div className="mt-6 text-center text-sm">
                    <span className="text-slate-600">
                      Don&apos;t have an account?
                    </span>{" "}

                    <button
                      type="button"
                      onClick={onCreateAccount}
                      className="font-semibold text-brand-blue transition hover:text-brand-blue hover:underline"
                    >
                      Create an account
                    </button>
                  </div>

                  {/* Trust line */}

                  <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    Your data is encrypted and secure
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;