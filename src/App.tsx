import React, { useState, useEffect, useCallback } from "react";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import HomeDashboard from "./components/HomeDashboard";
import {
  getCurrentUser,
  signInUser,
  signUpUser,
  signOutUser,
  isRecoveryFlow,
  onAuthStateChange,
  type UserProfile,
} from "./lib/supabase";
import "./index.css";

type Screen = "splash" | "login" | "register" | "home" | "reset-password";

function AppRoutes() {
  /* A Supabase password-reset email redirects back with
     `#access_token=...&type=recovery` in the URL. Detect it during the very
     first render (not in an effect) so the splash screen is never shown. */
  const [screen, setScreen] = useState<Screen>(() =>
    isRecoveryFlow() ? "reset-password" : "splash"
  );

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* True once the initial session check has settled. The splash screen is
     held until this flips so a signed-in user never sees the login page.
     Pre-seeded for the recovery flow, which skips the check entirely. */
  const [authReady, setAuthReady] = useState(() => isRecoveryFlow());

  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // ✅ Track email that needs verification after signup
  const [verifyEmailSentTo, setVerifyEmailSentTo] = useState<string | null>(
    null
  );

  /* Evaluated once via a lazy initializer — reading a ref during render would
     not re-render when the URL changes. */
  const [recoveryFlow] = useState(() => isRecoveryFlow());

  /* =====================================================
     CHECK INITIAL AUTHENTICATION STATE ON APP LOAD
  ===================================================== */
  useEffect(() => {
    // The recovery screen does not depend on the session check.
    if (recoveryFlow) return;

    let isMounted = true;

    (async () => {
      try {
        const user = await getCurrentUser();
        if (!isMounted) return;
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.warn("Error checking initial auth session:", err);
      } finally {
        if (isMounted) setAuthReady(true);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [recoveryFlow]);

  /* =====================================================
     KEEP SESSION IN SYNC

     Handles sign-out, token expiry and sign-in from another tab without
     requiring a page reload.
  ===================================================== */
  useEffect(() => {
    if (recoveryFlow) return;

    let isMounted = true;

    const unsubscribe = onAuthStateChange(async (event, userId) => {
      if (!isMounted) return;

      if (event === "SIGNED_OUT") {
        setCurrentUser(null);
        setIsLoggedIn(false);
        setScreen((prev) => (prev === "home" ? "login" : prev));
        return;
      }

      if (event === "SIGNED_IN" && userId) {
        const user = await getCurrentUser();
        if (!isMounted) return;
        setCurrentUser(user);
        setIsLoggedIn(Boolean(user));
        if (user) {
          setScreen((prev) => (prev === "splash" ? "home" : prev));
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [recoveryFlow]);

  /* =====================================================
     SPLASH SCREEN NAVIGATION

     There is no auto-advance timer: the splash waits for the user to press
     "Get Started" (or "Sign In"). The buttons stay disabled until the session
     check resolves, then this routes to the correct destination:
       - session already exists  -> HomeDashboard
       - no session              -> Login
  ===================================================== */
  const handleSplashFinish = useCallback(() => {
    setScreen(isLoggedIn ? "home" : "login");
  }, [isLoggedIn]);

  /* =====================================================
     LOGIN HANDLER (Supabase Auth)
  ===================================================== */
  const handleLogin = async (emailOrPrn: string, password: string) => {
    setAuthLoading(true);
    setAuthError(null);

    const { user, error } = await signInUser(emailOrPrn, password);

    setAuthLoading(false);

    if (error || !user) {
      setAuthError(error || "Invalid credentials. Please try again.");
      return;
    }

    setCurrentUser(user);
    setIsLoggedIn(true);
    setAuthError(null);
    setScreen("home");
  };

  /* =====================================================
     REGISTER HANDLER (Supabase Auth + Database Profile)

     IMPORTANT:
     - If Supabase returns a user but NO session, it means
       email confirmation is required. In that case we must
       NOT log the user in — we show a "verify your email"
       success screen instead.
     - The sentinel string "ACCOUNT_CREATED_VERIFY_EMAIL"
       is what signUpUser() returns in that scenario.
  ===================================================== */
  const handleRegister = async (data: {
    fullName: string;
    email: string;
    password: string;
    role: string;
    branch: string;
    year?: string;
    graduationYear?: string;
    prn?: string;
    designation?: string;
    employeeId?: string;
    officialEmail?: string;
    company?: string;
    jobRole?: string;
    industry?: string;
    linkedin?: string;
  }) => {
    setAuthLoading(true);
    setAuthError(null);
    setVerifyEmailSentTo(null);

    const { user, error } = await signUpUser(data);

    setAuthLoading(false);

    /* --------------------------------------------------
       Case 1: Email verification required
       Supabase created the user but no session yet.
    -------------------------------------------------- */
    if (error === "ACCOUNT_CREATED_VERIFY_EMAIL") {
      setVerifyEmailSentTo(data.email);
      return; // ❌ do NOT setIsLoggedIn(true) here
    }

    /* --------------------------------------------------
       Case 2: Any other error
    -------------------------------------------------- */
    if (error || !user) {
      setAuthError(error || "Registration failed. Please check your details.");
      return;
    }

    /* --------------------------------------------------
       Case 3: Successful signup WITH session
       (only happens when email confirmation is OFF)
    -------------------------------------------------- */
    setCurrentUser(user);
    setIsLoggedIn(true);
    setAuthError(null);
    setScreen("home");
  };

  /* =====================================================
     LOGOUT HANDLER
  ===================================================== */
  const handleLogout = async () => {
    await signOutUser();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setScreen("login");
  };

  /* =====================================================
     SPLASH SCREEN
     Held until the session check resolves so the correct
     destination is chosen the first time.
  ===================================================== */
  if (screen === "splash") {
    return (
      <SplashScreen
        ready={authReady}
        onGetStarted={handleSplashFinish}
        onLogin={handleSplashFinish}
      />
    );
  }

  /* =====================================================
     LOGIN PAGE
  ===================================================== */
  if (screen === "login") {
    return (
      <Login
        errorMessage={authError}
        isLoading={authLoading}
        onCreateAccount={() => {
          setAuthError(null);
          setVerifyEmailSentTo(null);
          setScreen("register");
        }}
        onLogin={handleLogin}
      />
    );
  }

  /* =====================================================
     REGISTER PAGE
  ===================================================== */
  if (screen === "register") {
    return (
      <Register
        errorMessage={authError}
        isLoading={authLoading}
        verifyEmailSentTo={verifyEmailSentTo}
        onLogin={() => {
          setAuthError(null);
          setVerifyEmailSentTo(null);
          setScreen("login");
        }}
        onRegister={handleRegister}
      />
    );
  }

  /* =====================================================
     RESET PASSWORD PAGE
     Rendered when Supabase redirects the user back from
     a password-reset email (#type=recovery in the URL).
  ===================================================== */
  if (screen === "reset-password") {
    return (
      <ResetPassword
        onDone={() => {
          setAuthError(null);
          setVerifyEmailSentTo(null);
          setIsLoggedIn(false);
          setCurrentUser(null);
          setScreen("login");
        }}
      />
    );
  }

  /* =====================================================
     HOME DASHBOARD
  ===================================================== */
  return (
    <HomeDashboard
      user={currentUser}
      onLogout={handleLogout}
    />
  );
}

/**
 * Root component. Every screen is wrapped in the error boundary so a render
 * failure anywhere in the app (not just the dashboard) surfaces a recovery
 * UI instead of a blank white page.
 */
export default function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}

/* =====================================================
   ERROR BOUNDARY
===================================================== */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0f2747] text-[#ffffff] p-10 font-sans flex items-center justify-center">
          <div className="max-w-xl w-full bg-[#17335c] border border-[#3a6199] rounded-2xl p-8 shadow-2xl">
            <h2 className="text-[#c9a227] text-2xl font-bold mb-3">
              SAEConnect — Something went wrong
            </h2>
            <p className="text-amber-100/90 text-sm mb-4 leading-relaxed">
              {this.state.error?.message ||
                "An unexpected error occurred while rendering the page."}
            </p>
            <pre className="bg-[#0a1a30] p-4 rounded-xl text-rose-400 text-xs overflow-x-auto mb-6 max-h-48">
              {this.state.error?.stack}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-[#c9a227] text-[#0f2747] font-bold rounded-xl hover:bg-[#dcb443] transition shadow-md cursor-pointer"
            >
              Reload Platform
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}