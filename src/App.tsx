import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import "./index.css";

type Screen = "splash" | "login" | "register" | "home" | "companies" | "company-details";

function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCompanySlug, setSelectedCompanySlug] = useState<string>("");

  /* SPLASH */
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

  /* LOGIN */
  if (screen === "login") {
    return (
      <Login
        onCreateAccount={() => setScreen("register")}
        onForgotPassword={() => console.log("Forgot password clicked")}
        onLogin={(emailOrPrn, password) => {
          console.log("Email / PRN:", emailOrPrn);
          console.log("Password:", password);
          setIsLoggedIn(true);
          setScreen("companies"); // ← Land on Companies after login
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
          setScreen("companies"); // ← Land on Companies after register
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
      />
    );
  }

  /* HOME */
  return (
    <section id="center">
      <div className="hero"></div>
    </section>
  );
}

export default App;