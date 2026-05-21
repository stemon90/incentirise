import { useState, useEffect } from "react";

function Rewards() {
  const [rewards, setRewards] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pointCost, setPointCost] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const API = "http://localhost:3000";

  useEffect(() => {
    fetchRewards();
    fetchUsers();
  }, []);

  async function fetchRewards() {
    const res = await fetch(`${API}/rewards`);
    const data = await res.json();
    setRewards(data);
  }

  async function fetchUsers() {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  }

  async function createReward(e) {
    e.preventDefault();
    setError("");
    const res = await fetch(`${API}/rewards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        pointCost: parseInt(pointCost),
      }),
    });
    if (res.ok) {
      setTitle("");
      setDescription("");
      setPointCost("");
      fetchRewards();
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
  }

  async function redeemReward(rewardId) {
    setMessage("");
    setError("");
    const res = await fetch(`${API}/redeem-reward`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: parseInt(selectedUser), rewardId }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(`Reward redeemed! -${data.pointsSpent} pts`);
      fetchUsers();
    } else {
      setError(data.error || "Something went wrong");
    }
  }

  return (
    <div>
      <h2>Rewards</h2>
      <form onSubmit={createReward}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Point Cost"
          type="number"
          value={pointCost}
          onChange={(e) => setPointCost(e.target.value)}
        />
        <button type="submit">Add Reward</button>
      </form>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <div>
        <label>Redeem as: </label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.points} pts)
            </option>
          ))}
        </select>
      </div>
      <ul>
        {rewards.map((reward) => (
          <li key={reward.id}>
            {reward.title} — {reward.pointCost} pts
            <button
              onClick={() => redeemReward(reward.id)}
              disabled={!selectedUser}
            >
              Redeem
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rewards;
