import { BrowserRouter, Routes, Route, useNavigate } from "react-router";
import Login from "./pages/login.jsx";
import HomePage from "./pages/HomePage";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const ApiLogin = async () => {
    try {
      const resp = await fetch("http://localhost:8080/api/auth/adminlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const results = await resp.json();
      if (results?.token) {
        localStorage.setItem("authToken", results.token);
        navigate("/homepage");
      } else {
        alert(results?.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="h-screen w-full bg-white flex justify-center items-center">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              setEmail={setEmail}
              setPassword={setPassword}
              ApiLogin={ApiLogin}
            />
          }
        />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default function Wrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
