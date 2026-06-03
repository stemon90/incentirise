import { useState, useEffect } from "react";
import { getStaff, createStaff, updateStaffRole } from "../api";

function Staff({ staff }) {
  const [members, setMembers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "LEADER",
  });

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      const res = await getStaff();
      setMembers(res.data);
    } catch (err) {
      setError("Failed to load staff");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await createStaff(form);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "LEADER",
      });
      setShowAdd(false);
      setSuccess("Staff member added successfully");
      loadStaff();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add staff member");
    }
  };

  const handleRoleChange = async (id, role) => {
    setError("");
    setSuccess("");
    try {
      await updateStaffRole(id, role);
      setSuccess("Role updated");
      loadStaff();
    } catch (err) {
      setError("Failed to update role");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Staff</h2>
        <button className="btn-primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? "Cancel" : "+ Add Staff"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {showAdd && (
        <form className="card form-card" onSubmit={handleAdd}>
          <h3>Add Staff Member</h3>
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
          <div className="form-row">
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
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="LEADER">Leader</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">
            Add Staff Member
          </button>
        </form>
      )}

      <div className="staff-list">
        {members.map((member) => (
          <div key={member.id} className="card staff-card">
            <div className="staff-info">
              <span className="staff-name">
                {member.firstName} {member.lastName}
              </span>
              <span className="staff-email">{member.email}</span>
            </div>
            <div className="staff-actions">
              {member.id === staff.id ? (
                <span className="badge">{member.role}</span>
              ) : (
                <select
                  value={member.role}
                  onChange={(e) => handleRoleChange(member.id, e.target.value)}
                >
                  <option value="LEADER">Leader</option>
                  <option value="ADMIN">Admin</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Staff;
