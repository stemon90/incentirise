import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  }

  async function createUser(e) {
    e.preventDefault();
    setError("");
    const res = await fetch(`${API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (res.ok) {
      setName("");
      setEmail("");
      fetchUsers();
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
  }

  return (
    <div>
      <h2>Users</h2>
      <form onSubmit={createUser}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add User</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email} — {user.points} pts
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
