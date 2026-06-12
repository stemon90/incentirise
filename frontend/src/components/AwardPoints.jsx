import { useState, useEffect } from "react";
import { getYouth, getBehaviors, awardPoints } from "../api";

function AwardPoints({ staff }) {
  const [youth, setYouth] = useState([]);
  const [behaviors, setBehaviors] = useState([]);
  const [selectedYouth, setSelectedYouth] = useState(null);
  const [selectedBehavior, setSelectedBehavior] = useState(null);
  const [points, setPoints] = useState(1);
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const load = async () => {
      try {
        const [youthRes, behaviorsRes] = await Promise.all([
          getYouth(),
          getBehaviors(),
        ]);
        setYouth(youthRes.data);
        setBehaviors(behaviorsRes.data);
      } catch (err) {
        setError("Failed to load data");
      }
    };
    load();
  }, []);

  const filtered = youth.filter((m) =>
    `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase()),
  );

  const categories = [
    "All",
    ...new Set(behaviors.map((b) => b.category).filter(Boolean)),
  ];

  const filteredBehaviors =
    selectedCategory === "All"
      ? behaviors
      : behaviors.filter((b) => b.category === selectedCategory);

  const handleSelectBehavior = (behavior) => {
    setSelectedBehavior(behavior);
    setPoints(behavior.minPoints);
  };

  const handleAward = async () => {
    if (!selectedYouth || !selectedBehavior) {
      setError("Please select a youth and a behavior");
      return;
    }

    try {
      const res = await awardPoints({
        youthId: selectedYouth.id,
        behaviorId: selectedBehavior.id,
        points,
        note,
      });
      setSuccess(
        `${points} points awarded to ${selectedYouth.firstName}! New total: ${res.data.newPointTotal}`,
      );
      setSelectedYouth(null);
      setSelectedBehavior(null);
      setPoints(1);
      setNote("");
      setSearch("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to award points");
    }
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Award Points</h2>
      </div>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <div className="award-flow">
        {/* Step 1: Select Youth */}
        <div className="card">
          <h3>1. Select Youth</h3>
          <input
            className="search-input"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="youth-list small">
            {filtered.length === 0 ? (
              <p className="empty">No youth found</p>
            ) : (
              filtered.map((member) => (
                <div
                  key={member.id}
                  className={`youth-card ${selectedYouth?.id === member.id ? "selected" : ""}`}
                  onClick={() => setSelectedYouth(member)}
                >
                  <div className="youth-name">
                    {member.firstName} {member.lastName}
                  </div>
                  <div className="youth-points">{member.points} pts</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Step 2: Select Behavior */}
        <div className="card">
          <h3>2. Select Behavior</h3>
          <div className="category-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="behavior-list">
            {filteredBehaviors.length === 0 ? (
              <p className="empty">No behaviors in this category</p>
            ) : (
              filteredBehaviors.map((behavior) => (
                <div
                  key={behavior.id}
                  className={`behavior-card ${selectedBehavior?.id === behavior.id ? "selected" : ""}`}
                  onClick={() => handleSelectBehavior(behavior)}
                >
                  <div className="behavior-name">{behavior.name}</div>
                  <div className="behavior-range">
                    {behavior.minPoints} – {behavior.maxPoints} pts
                  </div>
                  {behavior.description && (
                    <div className="behavior-desc">{behavior.description}</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Step 3: Slide Points */}
        {selectedBehavior && (
          <div className="card">
            <h3>3. Set Points</h3>
            <div className="slider-container">
              <div className="slider-value">{points} points</div>
              <input
                type="range"
                min={selectedBehavior.minPoints}
                max={selectedBehavior.maxPoints}
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value))}
                className="slider"
              />
              <div className="slider-labels">
                <span>{selectedBehavior.minPoints}</span>
                <span>{selectedBehavior.maxPoints}</span>
              </div>
            </div>
            <div className="form-group">
              <label>Note (optional)</label>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What did they do?"
              />
            </div>
          </div>
        )}

        {/* Submit */}
        {selectedYouth && selectedBehavior && (
          <div className="card award-summary">
            <h3>Summary</h3>
            <p>
              Awarding <strong>{points} points</strong> to{" "}
              <strong>
                {selectedYouth.firstName} {selectedYouth.lastName}
              </strong>{" "}
              for <strong>{selectedBehavior.name}</strong>
            </p>
            <button className="btn-primary btn-large" onClick={handleAward}>
              Award Points
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AwardPoints;
