import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Register from "./components/Register";
import "./index.css";

type Screen = "splash" | "login" | "register" | "home";

function App() {
  const [screen, setScreen] = useState<Screen>("splash");
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
    <section id="center">
      <div className="hero"></div>
    </section>
  );
}

export default App;