import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout/DashboardLayout";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import styles from "./WorkOrders.module.css";

const WorkOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosInstance.get("/workorders").then(res => setOrders(res.data));
  }, []);

  return (
    <DashboardLayout>
      <div className={styles.header}>
        <h2>Work Orders</h2>
        <Link to="/workorders/create" className={styles.createBtn}>
          + Create Work Order
        </Link>
      </div>

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>WO</th>
              <th>Equipment</th>
              <th>Issue</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td>WO-{o._id.slice(-5)}</td>
                <td>{o.equipmentId?.name}</td>
                <td>{o.issueType}</td>
                <td>{o.priority}</td>
                <td>{o.status}</td>
                <td>{o.assignedTo?.name || "-"}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/workorders/${o._id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default WorkOrders;
