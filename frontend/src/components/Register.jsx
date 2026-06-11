import { useState } from "react";
import { registerOrg } from "../api";

function Register({ onBackToLogin }) {
  const [form, setForm] = useState({
    orgName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await registerOrg(form);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  if (success) {
    return (
      <div className="login-container">
        <div className="login-card">
          <img src="/logo.png" alt="IncentiRise" className="login-logo" />
          <h1>You're in!</h1>
          <p className="login-subtitle">
            Your organization has been created. Sign in to get started.
          </p>
          <button className="btn-primary btn-large" onClick={onBackToLogin}>
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="/logo.png" alt="IncentiRise" className="login-logo" />
        <h1>Get Started</h1>
        <p className="login-subtitle">Create your organization account</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Organization Name</label>
            <input
              value={form.orgName}
              onChange={(e) => setForm({ ...form, orgName: e.target.value })}
              placeholder="Boys & Girls Club of Santa Fe"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary btn-large">
            Create Organization
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "16px",
            fontSize: "14px",
            color: "#666",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={onBackToLogin}
            style={{ color: "#f97316", cursor: "pointer", fontWeight: "600" }}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
