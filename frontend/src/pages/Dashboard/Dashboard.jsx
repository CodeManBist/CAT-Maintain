import React, { useContext, useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout/DashboardLayout";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import style from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  // equipment state
  const [equipments, setEquipments] = useState([]);
  const [eqLoading, setEqLoading] = useState(true);

  // 🔥 new summary state
  const [summary, setSummary] = useState(null);
  const [summaryLoading, setSummaryLoading] = useState(true);

  // ---------------- EQUIPMENT FETCH ----------------
  const getEquipments = async () => {
    try {
      const res = await axiosInstance.get("/equipments");
      setEquipments(res.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load equipments");
    } finally {
      setEqLoading(false);
    }
  };

  // ---------------- DASHBOARD SUMMARY FETCH ----------------
  const getSummary = async () => {
    try {
      const res = await axiosInstance.get("/dashboard/summary");
      setSummary(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load dashboard summary");
    } finally {
      setSummaryLoading(false);
    }
  };

  useEffect(() => {
    getEquipments();
    getSummary();
  }, []);

  // ---------------- EQUIPMENT KPI CALCULATION ----------------
  const stats = useMemo(() => {
    const total = equipments.length;
    const active = equipments.filter((e) => e.status === "active").length;
    const maintenance = equipments.filter((e) => e.status === "maintenance").length;
    const breakdown = equipments.filter((e) => e.status === "breakdown").length;

    return { total, active, maintenance, breakdown };
  }, [equipments]);

  return (
    <DashboardLayout>
      {/* HEADER */}
      <div className={style.header}>
        <div>
          <h2 className={style.title}>
            {loading ? "Loading..." : `Welcome, ${user?.name} 👋`}
          </h2>
          <p className={style.subtitle}>
            Here’s what’s happening in your system today
          </p>
        </div>

        <div className={style.roleBox}>
          <span className={style.roleLabel}>Role</span>
          <span className={style.roleValue}>{user?.role || "user"}</span>
        </div>
      </div>

      {/* ---------------- EQUIPMENT HEALTH ---------------- */}
      <h3 className={style.sectionTitle}>Asset Health</h3>
      <div className={style.cards}>
        <div className={style.card}>
          <p className={style.cardLabel}>Total Equipments</p>
          <h3 className={style.cardValue}>{eqLoading ? "--" : stats.total}</h3>
          <p className={style.cardHint}>All assets registered</p>
        </div>

        <div className={style.card}>
          <p className={style.cardLabel}>Active</p>
          <h3 className={style.cardValue}>{eqLoading ? "--" : stats.active}</h3>
          <p className={style.cardHint}>Running normally</p>
        </div>

        <div className={style.card}>
          <p className={style.cardLabel}>Maintenance</p>
          <h3 className={style.cardValue}>{eqLoading ? "--" : stats.maintenance}</h3>
          <p className={style.cardHint}>Work in progress</p>
        </div>

        <div className={style.card}>
          <p className={style.cardLabel}>Breakdowns</p>
          <h3 className={style.cardValue}>{eqLoading ? "--" : stats.breakdown}</h3>
          <p className={style.cardHint}>Needs attention</p>
        </div>
      </div>

      {/* ---------------- OPERATIONS OVERVIEW (NEW 🔥) ---------------- */}
      <h3 className={style.sectionTitle}>Operations Overview</h3>
      <div className={style.cards}>
        <div className={style.card}>
          <p className={style.cardLabel}>Open Work Orders</p>
          <h3 className={style.cardValue}>
            {summaryLoading ? "--" : summary?.openWorkOrders}
          </h3>
          <p className={style.cardHint}>Pending tasks</p>
        </div>

        <div className={style.card}>
          <p className={style.cardLabel}>In Progress</p>
          <h3 className={style.cardValue}>
            {summaryLoading ? "--" : summary?.inProgressWorkOrders}
          </h3>
          <p className={style.cardHint}>Currently being fixed</p>
        </div>

        <div className={style.card}>
          <p className={style.cardLabel}>Completed This Month</p>
          <h3 className={style.cardValue}>
            {summaryLoading ? "--" : summary?.completedThisMonth}
          </h3>
          <p className={style.cardHint}>Work efficiency</p>
        </div>

        <div className={`${style.card} ${style.alert}`}>
          <p className={style.cardLabel}>Overdue Maintenance</p>
          <h3 className={style.cardValue}>
            {summaryLoading ? "--" : summary?.overdueMaintenance}
          </h3>
          <p className={style.cardHint}>Needs urgent attention</p>
        </div>
      </div>

      {/* ---------------- QUICK ACTIONS + STATUS ---------------- */}
      <div className={style.grid}>
        <div className={style.panel}>
          <div className={style.panelTop}>
            <h3 className={style.panelTitle}>Quick Actions</h3>
          </div>

          <div className={style.actions}>
            <Link to="/equipments" className={style.actionBtn}>
              View Equipments →
            </Link>

            <Link to="/workorders" className={style.actionBtn}>
              Create Work Order →
            </Link>

            <Link to="/maintenance" className={style.actionBtn}>
              PM Schedule →
            </Link>

            {user?.role === "admin" && (
              <Link to="/users" className={style.actionBtn}>
                Manage Users →
              </Link>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
