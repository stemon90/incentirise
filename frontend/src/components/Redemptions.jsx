import { useState, useEffect } from "react";
import { getPendingRedemptions, processRedemption } from "../api";

function Redemptions({ staff }) {
  const [redemptions, setRedemptions] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadRedemptions();
  }, []);

  const loadRedemptions = async () => {
    try {
      const res = await getPendingRedemptions();
      setRedemptions(res.data);
    } catch (err) {
      setError("Failed to load redemptions");
    }
  };

  const handleProcess = async (id, status) => {
    try {
      await processRedemption(id, status);
      setSuccess(
        `Redemption ${status === "APPROVED" ? "approved" : "rejected"}`,
      );
      setError("");
      loadRedemptions();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to process redemption");
      setSuccess("");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Pending Redemptions</h2>
        <button className="btn-secondary" onClick={loadRedemptions}>
          Refresh
        </button>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {redemptions.length === 0 ? (
        <div className="card empty-state">
          <p>No pending redemptions</p>
        </div>
      ) : (
        <div className="redemption-list">
          {redemptions.map((r) => (
            <div key={r.id} className="redemption-card card">
              <div className="redemption-info">
                <div className="redemption-youth">
                  {r.youth.firstName} {r.youth.lastName}
                  <span className="redemption-points">
                    {r.youth.points} pts available
                  </span>
                </div>
                <div className="redemption-prize">
                  wants: <strong>{r.prize.name}</strong>
                  <span className="redemption-cost">
                    ({r.prize.pointCost} pts)
                  </span>
                  {r.prize.requiresAdmin && (
                    <span className="badge admin-badge">Requires Admin</span>
                  )}
                </div>
                <div className="redemption-time">
                  {new Date(r.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="redemption-actions">
                <button
                  className="btn-success"
                  onClick={() => handleProcess(r.id, "APPROVED")}
                >
                  Approve
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleProcess(r.id, "REJECTED")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Redemptions;
