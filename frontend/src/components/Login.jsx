import { useState } from "react";
import { login } from "../api";

function Login({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await login(email, password);
      onLogin(res.data.staff, res.data.token);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/logo.png" alt="IncentiRise" className="login-logo" />
        <h1>Welcome back</h1>
        <p className="login-subtitle">Sign in to your organization</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary btn-large">
            Sign In
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", color: "#666" }}>
          New organization?{" "}
          <span
            onClick={onRegister}
            style={{ color: "#f97316", cursor: "pointer", fontWeight: "600" }}
          >
            Get Started
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;