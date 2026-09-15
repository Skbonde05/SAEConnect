import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import AskShare from "./pages/AskShare";
import "./index.css";

type Screen =
  | "splash"
  | "login"
  | "register"
  | "home"
  | "companies"
  | "company-details"
  | "ask-share";

type NavTab = "home" | "experiences" | "companies" | "ask-share" | "insights" | "about";

function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCompanySlug, setSelectedCompanySlug] = useState<string>("");

  /* Central navigation handler for the navbar */
  const handleNavigate = (tab: NavTab) => {
    if (tab === "companies") setScreen("companies");
    else if (tab === "ask-share") setScreen("ask-share");
    else if (tab === "home") setScreen("companies"); // no home yet — fallback to companies
    else {
      // Other tabs not built yet — stay where we are
      console.log("Navigate to:", tab);
    }
  };

  /* SPLASH */
  if (screen === "splash") {
    return (
      <SplashScreen
        onGetStarted={() => setScreen(isLoggedIn ? "companies" : "login")}
        onLogin={() => setScreen("login")}
      />
    );
  }

  /* LOGIN */
  if (screen === "login") {
    return (
      <Login
        onCreateAccount={() => setScreen("register")}
        onForgotPassword={() => console.log("Forgot password clicked")}
        onLogin={(emailOrPrn, password) => {
          console.log("Email / PRN:", emailOrPrn);
          setIsLoggedIn(true);
          setScreen("companies");
        }}
      />
    );
  }

  /* REGISTER */
  if (screen === "register") {
    return (
      <Register
        onLogin={() => setScreen("login")}
        onRegister={(data) => {
          console.log("Registration Data:", data);
          setIsLoggedIn(true);
          setScreen("companies");
        }}
      />
    );
  }

  /* COMPANY DETAILS */
  if (screen === "company-details" && selectedCompanySlug) {
    return (
      <CompanyDetails
        slug={selectedCompanySlug}
        onBack={() => setScreen("companies")}
      />
    );
  }

  /* COMPANIES LISTING */
  if (screen === "companies") {
    return (
      <Companies
        onViewCompany={(slug) => {
          setSelectedCompanySlug(slug);
          setScreen("company-details");
        }}
        onNavigate={handleNavigate}
      />
    );
  }

  /* ASK & SHARE */
  if (screen === "ask-share") {
    return (
      <AskShare
        onBack={() => setScreen("companies")}
        onNavigate={handleNavigate}
      />
    );
  }

  /* HOME fallback */
  return (
    <section id="center">
      <div className="hero"></div>
    </section>
  );
}

export default App;