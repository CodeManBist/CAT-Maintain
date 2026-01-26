import React, { useContext, useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout/DashboardLayout";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import style from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);

  const [equipments, setEquipments] = useState([]);
  const [eqLoading, setEqLoading] = useState(true);

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

  useEffect(() => {
    getEquipments();
  }, []);

  // ✅ KPI calculations
  const stats = useMemo(() => {
    const total = equipments.length;

    const active = equipments.filter((e) => e.status === "active").length;
    const maintenance = equipments.filter((e) => e.status === "maintenance").length;
    const breakdown = equipments.filter((e) => e.status === "breakdown").length;

    return { total, active, maintenance, breakdown };
  }, [equipments]);

  return (
    <DashboardLayout>
      {/* ✅ Header */}
      <div className={style.header}>
        <div>
          <h2 className={style.title}>
            {loading ? "Loading..." : `Welcome, ${user?.name} 👋`}
          </h2>
          <p className={style.subtitle}>Here’s what’s happening in your system today</p>
        </div>

        <div className={style.roleBox}>
          <span className={style.roleLabel}>Role</span>
          <span className={style.roleValue}>{user?.role || "user"}</span>
        </div>
      </div>

      {/* ✅ KPI Cards */}
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

      {/* ✅ Grid Section */}
      <div className={style.grid}>
        {/* ✅ Quick Actions */}
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

            <Link to="/preventive" className={style.actionBtn}>
              PM Schedule →
            </Link>

            {user?.role === "admin" && (
              <Link to="/users" className={style.actionBtn}>
                Manage Users →
              </Link>
            )}
          </div>
        </div>

        {/* ✅ Equipment Status Summary */}
        <div className={style.panel}>
          <div className={style.panelTop}>
            <h3 className={style.panelTitle}>Equipment Status</h3>
          </div>

          <div className={style.statusList}>
            <div className={style.statusRow}>
              <span className={`${style.dot} ${style.dotActive}`} />
              <p className={style.statusText}>Active</p>
              <span className={style.statusCount}>{eqLoading ? "--" : stats.active}</span>
            </div>

            <div className={style.statusRow}>
              <span className={`${style.dot} ${style.dotMaintenance}`} />
              <p className={style.statusText}>Maintenance</p>
              <span className={style.statusCount}>
                {eqLoading ? "--" : stats.maintenance}
              </span>
            </div>

            <div className={style.statusRow}>
              <span className={`${style.dot} ${style.dotBreakdown}`} />
              <p className={style.statusText}>Breakdown</p>
              <span className={style.statusCount}>
                {eqLoading ? "--" : stats.breakdown}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Recent Equipments (mini list) */}
      <div className={style.panelBig}>
        <div className={style.panelTop}>
          <h3 className={style.panelTitle}>Recent Equipments</h3>
          <Link className={style.viewAll} to="/equipments">
            View All
          </Link>
        </div>

        {eqLoading ? (
          <p className={style.loadingText}>Loading equipments...</p>
        ) : equipments.length === 0 ? (
          <p className={style.loadingText}>No equipments found</p>
        ) : (
          <div className={style.table}>
            <div className={style.tableHead}>
              <p>Name</p>
              <p>Location</p>
              <p>Status</p>
              <p>Hours</p>
            </div>

            {equipments.slice(0, 5).map((eq) => (
              <div key={eq._id} className={style.tableRow}>
                <p className={style.cellBold}>{eq.name}</p>
                <p>{eq.location}</p>

                <p>
                  <span
                    className={`${style.badge} ${
                      eq.status === "active"
                        ? style.badgeActive
                        : eq.status === "maintenance"
                        ? style.badgeMaintenance
                        : style.badgeBreakdown
                    }`}
                  >
                    {eq.status}
                  </span>
                </p>

                <p>{eq.runningHours} hrs</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
