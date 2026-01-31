import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout/DashboardLayout";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import styles from "./MyWorkOrder.module.css";

const MyWorkOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyOrders = async () => {
    try {
      const res = await axiosInstance.get("/workorders");
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load work orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  // ✅ stats
  const open = orders.filter(o => o.status === "open").length;
  const progress = orders.filter(o => o.status === "in_progress").length;
  const completed = orders.filter(o => o.status === "completed").length;

  return (
    <DashboardLayout>
      {/* Header */}
      <div className={styles.header}>
        <h2>My Work Orders</h2>
        <p>Tasks assigned to you</p>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.card}>
          <span>Open</span>
          <h3>{open}</h3>
        </div>

        <div className={styles.card}>
          <span>In Progress</span>
          <h3>{progress}</h3>
        </div>

        <div className={styles.card}>
          <span>Completed</span>
          <h3>{completed}</h3>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No assigned work orders</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Issue</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.equipmentId?.name || "—"}</td>
                <td>{order.issueType}</td>

                <td>
                  <span className={`${styles.badge} ${styles[order.priority]}`}>
                    {order.priority}
                  </span>
                </td>

                <td>
                  <span className={`${styles.badge} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                </td>

                <td>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td>
                  <Link
                    to={`/workorders/${order._id}`}
                    className={styles.viewBtn}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
};

export default MyWorkOrder;
