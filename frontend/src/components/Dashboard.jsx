import { useState } from "react";
import Youth from "./Youth";
import AwardPoints from "./AwardPoints";
import Prizes from "./Prizes";
import Redemptions from "./Redemptions";
import Behaviors from "./Behaviors";

function Dashboard({ staff, onLogout }) {
  const [activeTab, setActiveTab] = useState("youth");

  return (
    <div className="app">
      <header>
        <div className="header-left">
          <img src="/logo.png" alt="IncentiRise" className="header-logo" />
        </div>
        <nav>
          <button
            onClick={() => setActiveTab("youth")}
            className={activeTab === "youth" ? "active" : ""}
          >
            Youth
          </button>
          <button
            onClick={() => setActiveTab("award")}
            className={activeTab === "award" ? "active" : ""}
          >
            Award Points
          </button>
          <button
            onClick={() => setActiveTab("behaviors")}
            className={activeTab === "behaviors" ? "active" : ""}
          >
            Behaviors
          </button>
          <button
            onClick={() => setActiveTab("prizes")}
            className={activeTab === "prizes" ? "active" : ""}
          >
            Prizes
          </button>
          <button
            onClick={() => setActiveTab("redemptions")}
            className={activeTab === "redemptions" ? "active" : ""}
          >
            Redemptions
          </button>
        </nav>
        <div className="header-right">
          <span className="staff-name">
            {staff.firstName} {staff.lastName}
          </span>
          <span className="staff-role">{staff.role}</span>
          <button onClick={onLogout} className="btn-logout">
            Sign Out
          </button>
        </div>
      </header>
      <main>
        {activeTab === "youth" && <Youth staff={staff} />}
        {activeTab === "award" && <AwardPoints staff={staff} />}
        {activeTab === "behaviors" && <Behaviors staff={staff} />}
        {activeTab === "prizes" && <Prizes staff={staff} />}
        {activeTab === "redemptions" && <Redemptions staff={staff} />}
      </main>
    </div>
  );
}

export default Dashboard;
