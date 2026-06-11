import { useState, useEffect } from "react";
import { getPrizes, createPrize, deletePrize } from "../api";

function Prizes({ staff }) {
  const [prizes, setPrizes] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    pointCost: "",
    quantity: "",
    requiresAdmin: false,
  });

  useEffect(() => {
    loadPrizes();
  }, []);

  const loadPrizes = async () => {
    try {
      const res = await getPrizes();
      setPrizes(res.data);
    } catch (err) {
      setError("Failed to load prizes");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createPrize(form);
      setForm({
        name: "",
        description: "",
        pointCost: "",
        quantity: "",
        requiresAdmin: false,
      });
      setShowAdd(false);
      setSuccess("Prize added successfully");
      loadPrizes();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add prize");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this prize?")) return;
    try {
      await deletePrize(id);
      loadPrizes();
    } catch (err) {
      setError("Failed to delete prize");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Prizes</h2>
        {staff.role === "ADMIN" && (
          <button className="btn-primary" onClick={() => setShowAdd(!showAdd)}>
            {showAdd ? "Cancel" : "+ Add Prize"}
          </button>
        )}
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {showAdd && (
        <form className="card form-card" onSubmit={handleAdd}>
          <h3>Add Prize</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Point Cost</label>
              <input
                type="number"
                value={form.pointCost}
                onChange={(e) =>
                  setForm({ ...form, pointCost: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Quantity (optional)</label>
              <input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                placeholder="Leave blank for unlimited"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={form.requiresAdmin}
                onChange={(e) =>
                  setForm({ ...form, requiresAdmin: e.target.checked })
                }
              />
              Requires Admin approval
            </label>
          </div>
          <button type="submit" className="btn-primary">
            Add Prize
          </button>
        </form>
      )}

      <div className="prize-grid">
        {prizes.map((prize) => (
          <div key={prize.id} className="prize-card card">
            <div className="prize-header">
              <h3>{prize.name}</h3>
              {prize.requiresAdmin && (
                <span className="badge admin-badge">Admin Approval</span>
              )}
            </div>
            {prize.description && (
              <p className="prize-desc">{prize.description}</p>
            )}
            <div className="prize-footer">
              <span className="prize-cost">{prize.pointCost} pts</span>
              <span className="prize-qty">Qty: {prize.quantity}</span>
              {staff.role === "ADMIN" && (
                <button
                  className="btn-danger-sm"
                  onClick={() => handleDelete(prize.id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prizes;
