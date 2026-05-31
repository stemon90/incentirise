import { useState, useEffect } from "react";
import { getBehaviors, createBehavior, getYouth } from "../api";
import api from "../api";

function Behaviors({ staff }) {
  const [behaviors, setBehaviors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [youth, setYouth] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    name: "",
    description: "",
    minPoints: "",
    maxPoints: "",
  });
  const [requestForm, setRequestForm] = useState({
    name: "",
    description: "",
    minPoints: "",
    maxPoints: "",
    youthId: "",
    provisionalPoints: "",
    note: "",
  });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      const [behaviorsRes, requestsRes, youthRes] = await Promise.all([
        getBehaviors(),
        api.get("/behavior-requests"),
        getYouth(),
      ]);
      setBehaviors(behaviorsRes.data);
      setRequests(requestsRes.data);
      setYouth(youthRes.data);
    } catch (err) {
      setError("Failed to load data");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createBehavior(form);
      setForm({ name: "", description: "", minPoints: "", maxPoints: "" });
      setShowAdd(false);
      setSuccess("Behavior added");
      loadAll();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add behavior");
    }
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      await api.post("/behavior-requests", requestForm);
      setRequestForm({
        name: "",
        description: "",
        minPoints: "",
        maxPoints: "",
        youthId: "",
        provisionalPoints: "",
        note: "",
      });
      setShowRequest(false);
      setSuccess(
        "Behavior request submitted! Provisional points awarded if specified.",
      );
      loadAll();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit request");
    }
  };

  const handleProcess = async (id, status) => {
    try {
      await api.patch(`/behavior-requests/${id}`, { status });
      setSuccess(`Request ${status === "APPROVED" ? "approved" : "rejected"}`);
      loadAll();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to process request");
    }
  };

  const pendingRequests = requests.filter((r) => r.status === "PENDING");

  return (
    <div className="page">
      <div className="page-header">
        <h2>Behaviors</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          {staff.role === "ADMIN" && (
            <button
              className="btn-primary"
              onClick={() => {
                setShowAdd(!showAdd);
                setShowRequest(false);
              }}
            >
              {showAdd ? "Cancel" : "+ Add Behavior"}
            </button>
          )}
          <button
            className="btn-secondary"
            onClick={() => {
              setShowRequest(!showRequest);
              setShowAdd(false);
            }}
          >
            {showRequest ? "Cancel" : "Request New Behavior"}
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {/* Admin: Add behavior directly */}
      {showAdd && staff.role === "ADMIN" && (
        <form className="card form-card" onSubmit={handleAdd}>
          <h3>Add Behavior</h3>
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
              <label>Description</label>
              <input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Min Points</label>
              <input
                type="number"
                value={form.minPoints}
                onChange={(e) =>
                  setForm({ ...form, minPoints: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Max Points</label>
              <input
                type="number"
                value={form.maxPoints}
                onChange={(e) =>
                  setForm({ ...form, maxPoints: e.target.value })
                }
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">
            Add Behavior
          </button>
        </form>
      )}

      {/* Leader: Request new behavior */}
      {showRequest && (
        <form className="card form-card" onSubmit={handleRequest}>
          <h3>Request New Behavior</h3>
          <p style={{ fontSize: "13px", color: "#888", marginBottom: "16px" }}>
            Submit a new behavior for Admin approval. You can award provisional
            points now — they will be reversed if the request is rejected.
          </p>
          <div className="form-row">
            <div className="form-group">
              <label>Behavior Name</label>
              <input
                value={requestForm.name}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                value={requestForm.description}
                onChange={(e) =>
                  setRequestForm({
                    ...requestForm,
                    description: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Min Points</label>
              <input
                type="number"
                value={requestForm.minPoints}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, minPoints: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Max Points</label>
              <input
                type="number"
                value={requestForm.maxPoints}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, maxPoints: e.target.value })
                }
                required
              />
            </div>
          </div>
          <h4 style={{ marginBottom: "12px", fontSize: "14px", color: "#555" }}>
            Award Provisional Points (optional)
          </h4>
          <div className="form-row">
            <div className="form-group">
              <label>Youth</label>
              <select
                value={requestForm.youthId}
                onChange={(e) =>
                  setRequestForm({ ...requestForm, youthId: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1.5px solid #e0e0e0",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                <option value="">Select youth...</option>
                {youth.map((y) => (
                  <option key={y.id} value={y.id}>
                    {y.firstName} {y.lastName} ({y.points} pts)
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Provisional Points</label>
              <input
                type="number"
                value={requestForm.provisionalPoints}
                onChange={(e) =>
                  setRequestForm({
                    ...requestForm,
                    provisionalPoints: e.target.value,
                  })
                }
                placeholder="Within min/max range"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Note</label>
            <input
              value={requestForm.note}
              onChange={(e) =>
                setRequestForm({ ...requestForm, note: e.target.value })
              }
              placeholder="What did the youth do?"
            />
          </div>
          <button type="submit" className="btn-primary">
            Submit Request
          </button>
        </form>
      )}

      {/* Pending requests — visible to all, actionable by Admin */}
      {pendingRequests.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "12px", fontSize: "16px" }}>
            Pending Behavior Requests
          </h3>
          <div className="redemption-list">
            {pendingRequests.map((r) => (
              <div key={r.id} className="redemption-card card">
                <div className="redemption-info">
                  <div className="redemption-youth">
                    {r.name}
                    <span className="badge admin-badge">Pending</span>
                  </div>
                  <div className="redemption-prize">
                    {r.minPoints}–{r.maxPoints} pts
                    {r.description && ` • ${r.description}`}
                  </div>
                  <div className="redemption-time">
                    Requested by {r.requestedBy.firstName}{" "}
                    {r.requestedBy.lastName} •{" "}
                    {new Date(r.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {staff.role === "ADMIN" && (
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
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Behavior list */}
      <h3 style={{ marginBottom: "12px", fontSize: "16px" }}>
        Active Behaviors
      </h3>
      <div className="behavior-list">
        {behaviors.map((b) => (
          <div key={b.id} className="behavior-card">
            <div className="behavior-name">{b.name}</div>
            <div className="behavior-range">
              {b.minPoints}–{b.maxPoints} pts
            </div>
            {b.description && (
              <div className="behavior-desc">{b.description}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Behaviors;
