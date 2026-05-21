import { useState, useEffect } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const API = "http://localhost:3000";

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  async function fetchTasks() {
    const res = await fetch(`${API}/tasks`);
    const data = await res.json();
    setTasks(data);
  }

  async function fetchUsers() {
    const res = await fetch(`${API}/users`);
    const data = await res.json();
    setUsers(data);
  }

  async function createTask(e) {
    e.preventDefault();
    setError("");
    const res = await fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, points: parseInt(points) }),
    });
    if (res.ok) {
      setTitle("");
      setDescription("");
      setPoints("");
      fetchTasks();
    } else {
      const data = await res.json();
      setError(data.error || "Something went wrong");
    }
  }

  async function completeTask(taskId) {
    setMessage("");
    setError("");
    const res = await fetch(`${API}/complete-task`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: parseInt(selectedUser), taskId }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(`Task completed! ${data.pointsEarned} points earned.`);
    } else {
      setError(data.error || "Something went wrong");
    }
  }

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={createTask}>
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
          placeholder="Points"
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <div>
        <label>Complete task as: </label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select user</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} — {task.points} pts
            <button
              onClick={() => completeTask(task.id)}
              disabled={!selectedUser}
            >
              Complete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
