import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

function App() {
  const [staff, setStaff] = useState(null);
  const [view, setView] = useState("login");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedStaff = localStorage.getItem("staff");
    if (token && savedStaff) {
      setStaff(JSON.parse(savedStaff));
    }
  }, []);

  const handleLogin = (staffData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("staff", JSON.stringify(staffData));
    setStaff(staffData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("staff");
    setStaff(null);
    setView("login");
  };

  if (staff) {
    return <Dashboard staff={staff} onLogout={handleLogout} />;
  }

  if (view === "register") {
    return <Register onBackToLogin={() => setView("login")} />;
  }

  return <Login onLogin={handleLogin} onRegister={() => setView("register")} />;
}

export default App;