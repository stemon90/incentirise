import { useState } from "react";
import Users from "./components/Users";
import Tasks from "./components/Tasks";
import Rewards from "./components/Rewards";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="app">
      <header>
        <h1>IncentiRise</h1>
        <nav>
          <button
            onClick={() => setActiveTab("users")}
            className={activeTab === "users" ? "active" : ""}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={activeTab === "tasks" ? "active" : ""}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab("rewards")}
            className={activeTab === "rewards" ? "active" : ""}
          >
            Rewards
          </button>
        </nav>
      </header>
      <main>
        {activeTab === "users" && <Users />}
        {activeTab === "tasks" && <Tasks />}
        {activeTab === "rewards" && <Rewards />}
      </main>
    </div>
  );
}

export default App;
