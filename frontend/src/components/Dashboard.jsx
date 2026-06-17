import { useState } from "react";
import Youth from "./Youth";
import AwardPoints from "./AwardPoints";
import Prizes from "./Prizes";
import Redemptions from "./Redemptions";
import Behaviors from "./Behaviors";
import Staff from "./Staff";

function Dashboard({ staff, onLogout }) {
  const [activeTab, setActiveTab] = useState("youth");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      <header>
        <div className="header-left">
          <img src="/logo.png" alt="IncentiRise" className="header-logo" />
        </div>
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <nav className={menuOpen ? "nav-open" : ""}>
          <button
            onClick={() => {
              setActiveTab("youth");
              setMenuOpen(false);
            }}
            className={activeTab === "youth" ? "active" : ""}
          >
            Youth
          </button>
          <button
            onClick={() => {
              setActiveTab("award");
              setMenuOpen(false);
            }}
            className={activeTab === "award" ? "active" : ""}
          >
            Award Points
          </button>
          <button
            onClick={() => {
              setActiveTab("behaviors");
              setMenuOpen(false);
            }}
            className={activeTab === "behaviors" ? "active" : ""}
          >
            Behaviors
          </button>
          <button
            onClick={() => {
              setActiveTab("prizes");
              setMenuOpen(false);
            }}
            className={activeTab === "prizes" ? "active" : ""}
          >
            Prizes
          </button>
          <button
            onClick={() => {
              setActiveTab("redemptions");
              setMenuOpen(false);
            }}
            className={activeTab === "redemptions" ? "active" : ""}
          >
            Redemptions
          </button>
          {staff.role === "ADMIN" && (
            <button
              onClick={() => {
                setActiveTab("staff");
                setMenuOpen(false);
              }}
              className={activeTab === "staff" ? "active" : ""}
            >
              Staff
            </button>
          )}
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
        {activeTab === "staff" && <Staff staff={staff} />}
      </main>
    </div>
  );
}

export default Dashboard;
