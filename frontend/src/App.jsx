import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { useEffect, useState } from "react";

import turfLogo from "./assets/turflogo.png";
import Games from "./pages/Games.jsx";
import HomePage from "./pages/HomePage.jsx";
import Venues from "./pages/Venues.jsx";
import TurfPage from "./pages/TurfPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

function AppLayout() {
  const navigate = useNavigate();
  const [turf, setTurf] = useState([]);
  const [emails, setEmail] = useState("");
  const [passwords, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // Fetch turf data
  useEffect(() => {
    const fetchTurfs = async () => {
      try {
        const resp = await fetch("http://localhost:8080/api/turf/getTurf", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await resp.json();
        setTurf(data);
      } catch (err) {
        console.error("Error fetching turfs:", err);
      }
    };

    fetchTurfs();
  }, [token]);

  // Login API
  const loginapi = async () => {
    try {
      const resp = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emails,
          password: passwords,
        }),
      });

      const result = await resp.json();
      if (result?.token) {
        setToken(result.token);
        localStorage.setItem("authToken", result.token);

        if (result?.user) {
          setUsername(result.user);
          localStorage.setItem("username", result.user);
        }

        navigate("/");
        console.log("Token received:", result.token);
      } else {
        alert(result?.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  // Logout
  const logout = () => {
    setToken("");
    setUsername("");
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#121212]  text-white flex flex-col gap-2">
      {/* Navbar */}
      <nav className="min-h-20 w-full grid grid-cols-12 max-xl:grid-cols-11 max-lg:grid-cols-10 max-md:grid-cols-7 max-sm:grid-cols-4">
        <div className="h-full w-full flex items-center justify-center">
          <img
            src={turfLogo}
            className="object-contain h-14 cursor-pointer"
            onClick={() => navigate("/")}
            alt="logo"
          />
        </div>
        <div className="h-full w-full col-span-9 max-xl:col-span-8 max-lg:col-span-7 max-md:col-span-4 max-sm:col-span-1"></div>
        <div className="h-full w-full flex items-center justify-center">
          <h1
            className="capitalize font-bold opacity-80 cursor-pointer"
            onClick={() => navigate("/venues")}
          >
            venues
          </h1>
        </div>
        <div className="h-full w-full flex items-center justify-center">
          {token ? (
            <h1
              className="capitalize font-bold opacity-80 cursor-pointer"
              onClick={logout}
              title="Click to logout"
            >
              {username || "User"}
            </h1>
          ) : (
            <h1
              className="capitalize font-bold opacity-80 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              login
            </h1>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <div className="relative h-full w-full text-white">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/venues" element={<Venues turf={turf} />} />
          <Route path="/turfpage/:id" element={<TurfPage turf={turf} />} />
          <Route
            path="/bookingpage/:id"
            element={<BookingPage turf={turf} />}
          />
          <Route
            path="/login"
            element={
              <LoginPage
                setEmail={setEmail}
                setPassword={setPassword}
                loginapi={loginapi}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
