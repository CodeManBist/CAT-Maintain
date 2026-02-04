import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import "./PreventiveMaintenance.css";
import DashboardLayout from "../../components/Layout/DashboardLayout/DashboardLayout.jsx";

const PreventiveMaintenance = () => {
  const [activeTab, setActiveTab] = useState("due");
  const [dueSoon, setDueSoon] = useState([]);
  const [overdue, setOverdue] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMaintenance();
  }, []);

  const fetchMaintenance = async () => {
    try {
      setLoading(true);
      const [dueRes, overdueRes] = await Promise.all([
        axiosInstance.get("/maintenance/due-soon"),
        axiosInstance.get("/maintenance/overdue"),
      ]);

      setDueSoon(dueRes.data);
      setOverdue(overdueRes.data);
    } catch (err) {
      console.error("Maintenance fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const list = activeTab === "due" ? dueSoon : overdue;

  return (
    <DashboardLayout>
    <div className="pm_container">
      <div className="pm_header">
        <h1>Preventive Maintenance</h1>
        <button onClick={fetchMaintenance}>Refresh</button>
      </div>

      {/* Tabs */}
      <div className="pm_tabs">
        <button
          className={activeTab === "due" ? "active" : ""}
          onClick={() => setActiveTab("due")}
        >
          Due Soon ({dueSoon.length})
        </button>
        <button
          className={activeTab === "overdue" ? "active" : ""}
          onClick={() => setActiveTab("overdue")}
        >
          Overdue ({overdue.length})
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <p className="pm_loading">Loading...</p>
      ) : list.length === 0 ? (
        <p className="pm_empty">No maintenance required 🎉</p>
      ) : (
        <table className="pm_table">
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Model</th>
              <th>Location</th>
              <th>Last Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((eq) => (
              <tr
                key={eq._id}
                onClick={() => navigate(`/equipments/${eq._id}`)}
              >
                <td>{eq.name}</td>
                <td>{eq.model || "-"}</td>
                <td>{eq.location}</td>
                <td>
                  {eq.lastServiceDate
                    ? new Date(eq.lastServiceDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <span
                    className={
                      activeTab === "overdue"
                        ? "pm_badge overdue"
                        : "pm_badge due"
                    }
                  >
                    {activeTab === "overdue" ? "Overdue" : "Due Soon"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </DashboardLayout>
  );
};

export default PreventiveMaintenance;
