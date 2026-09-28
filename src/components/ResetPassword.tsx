import { useEffect, useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { supabase, updatePassword } from "../lib/supabase";
import { BrandMark } from "./Brand";

interface ResetPasswordProps {
  /** Called after the password is updated (or the user backs out). */
  onDone: () => void;
}

const ResetPassword = ({ onDone }: ResetPasswordProps) => {
  /* ---------------------------------------------------
     Session check — Supabase puts a recovery token in
     the URL hash and (with detectSessionInUrl: true)
     exchanges it for a temporary session.
  --------------------------------------------------- */
  const [checking, setChecking] = useState(true);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);

  /* ---------------------------------------------------
     Form state
  --------------------------------------------------- */
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /* ---------------------------------------------------
     Verify Supabase has established a recovery session.
     We also listen to the auth state change event, because
     on some browsers the hash is parsed asynchronously.
  --------------------------------------------------- */
  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      // Give the Supabase client a moment to parse the hash
      await new Promise((resolve) => setTimeout(resolve, 150));

      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      setHasRecoverySession(Boolean(data.session));
      setChecking(false);
    }

    checkSession();

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (!mounted) return;
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setHasRecoverySession(true);
        setChecking(false);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  /* ---------------------------------------------------
     Submit new password
  --------------------------------------------------- */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await updatePassword(password);
    setLoading(false);

    if (updateError) {
      setError(updateError);
      return;
    }

    setSuccess(true);

    // Sign out the recovery session and return to login after a beat
    setTimeout(() => {
      supabase.auth.signOut().finally(() => {
        // Clean the URL hash so a refresh doesn't re-trigger recovery
        try {
          window.history.replaceState(
            null,
            "",
            window.location.pathname
          );
        } catch {}
        onDone();
      });
    }, 2200);
  };

  /* ===================================================
     SHARED INPUT STYLE
  =================================================== */
  const inputClass = `
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
  `;

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10 font-sans">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        {/* Logo */}
        <div className="mb-6 flex items-center gap-3">
          <BrandMark className="h-10 w-10 shrink-0" />
          <div>
            <p className="text-sm font-extrabold tracking-tight text-slate-900">
              SAEConnect
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              SAE Placement Hub
            </p>
          </div>
        </div>

        {checking ? (
          /* =================================================
             VERIFYING RECOVERY LINK
          ================================================= */
          <div className="flex items-center gap-3 py-6 text-sm text-slate-500">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
            Verifying your reset link…
          </div>
        ) : !hasRecoverySession ? (
          /* =================================================
             INVALID / EXPIRED LINK
          ================================================= */
          <div>
            <div className="flex items-start gap-3 rounded-xl border border-[#c9a227]/30 bg-[#c9a227]/10 p-4 text-sm text-[#c9a227]">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#c9a227]" />
              <div>
                <p className="font-semibold">Invalid or expired link</p>
                <p className="mt-1 text-[#c9a227]">
                  This password reset link is no longer valid. Please request a
                  new one from the login page.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onDone}
              className="
                group mt-6 flex h-12 w-full items-center justify-center gap-2
                rounded-xl
                bg-gradient-to-r from-brand-blue to-navy
                text-sm font-semibold text-white
                shadow-lg shadow-brand-blue/20
                transition-all duration-200
                hover:from-navy hover:to-navy-deep
                hover:shadow-xl hover:shadow-brand-blue/30
                active:scale-[0.99] cursor-pointer
              "
            >
              Back to login
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        ) : success ? (
          /* =================================================
             SUCCESS
          ================================================= */
          <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div>
              <p className="font-semibold">Password updated</p>
              <p className="mt-1 text-emerald-700">
                Your password has been changed successfully. Redirecting you to
                the login page…
              </p>
            </div>
          </div>
        ) : (
          /* =================================================
             NEW PASSWORD FORM
          ================================================= */
          <>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Set a new password
            </h1>
            <p className="mt-1.5 text-sm leading-6 text-slate-500">
              Choose a strong password you haven&apos;t used anywhere else.
            </p>

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-medium text-rose-700">
                <span className="shrink-0 font-bold">⚠️ Error:</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6">
              {/* New password */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  New password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Min. 8 characters"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
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

              {/* Confirm password */}
              <div className="mt-5">
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Confirm new password
                </label>

                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    placeholder="Re-enter password"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm((p) => !p)}
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-brand-blue"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
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
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Updating password...
                  </span>
                ) : (
                  <>
                    Update password
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Your new password will be encrypted and secure
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;