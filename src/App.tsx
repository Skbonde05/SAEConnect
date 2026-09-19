import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import HomeDashboard from "./components/HomeDashboard";
import "./index.css";

type Screen = "splash" | "login" | "register" | "home";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* =====================================================
     SPLASH SCREEN
     - Get Started → login (if not logged in) / home (if logged in)
  ===================================================== */

  if (screen === "splash") {
    return (
      <SplashScreen
        onGetStarted={() => {
          setScreen(isLoggedIn ? "home" : "login");
        }}
        onLogin={() => setScreen("login")}
      />
    );
  }

  /* =====================================================
     LOGIN PAGE
  ===================================================== */

  if (screen === "login") {
    return (
      <Login
        onCreateAccount={() => {
          setScreen("register");
        }}
        onForgotPassword={() => {
          console.log("Forgot password clicked");
        }}
        onLogin={(emailOrPrn, password) => {
          console.log("Email / PRN:", emailOrPrn);
          console.log("Password:", password);

          // Supabase authentication will be connected here later.
          // On success:
          setIsLoggedIn(true);
          setScreen("home");
        }}
      />
    );
  }

  /* =====================================================
     REGISTER PAGE
  ===================================================== */

  if (screen === "register") {
    return (
      <Register
        onLogin={() => {
          setScreen("login");
        }}
        onRegister={(data) => {
          console.log("Registration Data:", data);

          // Supabase registration will be connected here later.
          // On success:
          setIsLoggedIn(true);
          setScreen("home");
        }}
      />
    );
  }

  /* =====================================================
     HOME PAGE
  ===================================================== */

  return (
    <ErrorBoundary>
      <HomeDashboard
        onNavigateTab={(tab) => {
          console.log("Navigated to:", tab);
        }}
        onOpenLogin={() => setScreen("login")}
        onOpenRegister={() => setScreen("register")}
      />
    </ErrorBoundary>
  );
}

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
        <div style={{ minHeight: "100vh", backgroundColor: "#1a2332", color: "#faf7f0", padding: "40px", fontFamily: "sans-serif" }}>
          <h2 style={{ color: "#c9a961", fontSize: "22px", marginBottom: "12px" }}>Dashboard Load Error</h2>
          <p style={{ color: "#fef3c7", marginBottom: "16px" }}>{this.state.error?.message}</p>
          <pre style={{ backgroundColor: "#141c28", padding: "16px", borderRadius: "8px", color: "#f87171", overflowX: "auto" }}>
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#c9a961", color: "#1a2332", fontWeight: "bold", border: "none", borderRadius: "8px", cursor: "pointer" }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default App;