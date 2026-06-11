import { useState, useEffect } from "react";
import {
  getYouth,
  createYouth,
  getQRCode,
  getPointHistory,
  getPrizes,
  createRedemption,
} from "../api";

function Youth({ staff }) {
  const [youth, setYouth] = useState([]);
  const [selected, setSelected] = useState(null);
  const [qrImage, setQrImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [error, setError] = useState("");
  const [prizes, setPrizes] = useState([]);
  const [redeemSuccess, setRedeemSuccess] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
  });

  useEffect(() => {
    loadYouth();
  }, []);

  const loadYouth = async () => {
    try {
      const res = await getYouth();
      setYouth(res.data);
    } catch (err) {
      setError("Failed to load youth");
    }
  };

  const handleSelect = async (member) => {
    setSelected(member);
    setQrImage(null);
    setHistory([]);
    setRedeemSuccess("");
    try {
      const [qrRes, historyRes, prizesRes] = await Promise.all([
        getQRCode(member.id),
        getPointHistory(member.id),
        getPrizes(),
      ]);
      setQrImage(qrRes.data.qrImage);
      setHistory(historyRes.data);
      setPrizes(prizesRes.data);
    } catch (err) {
      setError("Failed to load youth details");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await createYouth(form);
      setForm({ firstName: "", lastName: "", dob: "", grade: "" });
      setShowAdd(false);
      loadYouth();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add youth");
    }
  };

  const handleRedeem = async (prizeId) => {
    try {
      await createRedemption({ youthId: selected.id, prizeId });
      setRedeemSuccess("Redemption request submitted!");
      setTimeout(() => setRedeemSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit redemption");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Youth</h2>
        <button className="btn-primary" onClick={() => setShowAdd(!showAdd)}>
          {showAdd ? "Cancel" : "+ Add Youth"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {showAdd && (
        <form className="card form-card" onSubmit={handleAdd}>
          <h3>Add Youth Member</h3>
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
              <label>Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn-primary">
            Add Youth
          </button>
        </form>
      )}

      <div className="two-col">
        <div className="youth-list">
          {youth.map((member) => (
            <div
              key={member.id}
              className={`youth-card ${selected?.id === member.id ? "selected" : ""}`}
              onClick={() => handleSelect(member)}
            >
              <div className="youth-name">
                {member.firstName} {member.lastName}
              </div>
              <div className="youth-points">{member.points} pts</div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="youth-profile card">
            <h3>
              {selected.firstName} {selected.lastName}
            </h3>
            <p className="points-display">{selected.points} points</p>

            {qrImage && (
              <div className="qr-container">
                <img src={qrImage} alt="QR Code" className="qr-image" />
                <p className="qr-label">Member QR Code</p>
              </div>
            )}

            {redeemSuccess && <p className="success">{redeemSuccess}</p>}

            {prizes.length > 0 && (
              <div className="redeem-section">
                <h4>Redeem a Prize</h4>
                <div className="prize-redeem-list">
                  {prizes.map((prize) => (
                    <div key={prize.id} className="prize-redeem-item">
                      <div>
                        <span className="prize-redeem-name">{prize.name}</span>
                        <span className="prize-redeem-cost">
                          {prize.pointCost} pts
                        </span>
                      </div>
                      <button
                        className="btn-primary"
                        style={{
                          width: "auto",
                          padding: "6px 14px",
                          fontSize: "13px",
                        }}
                        disabled={
                          selected.points < prize.pointCost ||
                          prize.quantity < 1
                        }
                        onClick={() => handleRedeem(prize.id)}
                      >
                        {prize.quantity < 1 ? "Out of Stock" : "Redeem"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="history">
              <h4>Point History</h4>
              {history.length === 0 ? (
                <p className="empty">No transactions yet</p>
              ) : (
                history.map((tx) => (
                  <div key={tx.id} className="history-item">
                    <div className="history-left">
                      <span className="history-behavior">
                        {tx.behavior.name}
                      </span>
                      {tx.note && (
                        <span className="history-note">{tx.note}</span>
                      )}
                      <span className="history-staff">
                        by {tx.staff.firstName} {tx.staff.lastName}
                      </span>
                    </div>
                    <span className="history-points">+{tx.points}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Youth;
