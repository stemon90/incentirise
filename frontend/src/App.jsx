import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [staff, setStaff] = useState(null);

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
  };

  if (!staff) {
    return <Login onLogin={handleLogin} />;
  }

  return <Dashboard staff={staff} onLogout={handleLogout} />;
}

export default App;
