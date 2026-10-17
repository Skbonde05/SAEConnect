import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import HomeDashboard from "./components/HomeDashboard";
import AboutPage from "./components/about"; // 1. Import AboutPage
import "./index.css";

// 2. Add "about" to Screen type
type Screen = "splash" | "login" | "register" | "home" | "about";

function App() {
  // 3. Set default screen state to "about"
  const [screen, setScreen] = useState<Screen>("about");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* =====================================================
     SPLASH SCREEN
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

          setIsLoggedIn(true);
          setScreen("home");
        }}
      />
    );
  }

  /* =====================================================
     ABOUT PAGE
  ===================================================== */

  if (screen === "about") {
    return (
      <ErrorBoundary>
        <AboutPage
          onNavigateHome={() => setScreen("home")}
          onNavigateExperiences={() => console.log("Experiences clicked")}
          onNavigateInsights={() => console.log("Insights clicked")}
        />
      </ErrorBoundary>
    );
  }

  /* =====================================================
     HOME PAGE
  ===================================================== */

  return (
    <ErrorBoundary>
      <HomeDashboard
        onNavigateTab={(tab) => {
          if (tab === "about") setScreen("about");
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