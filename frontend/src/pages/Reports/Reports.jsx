import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout/DashboardLayout";
import axiosInstance from "../../api/axiosInstance";
import style from "./Reports.module.css";
import { toast } from "react-toastify";

const Reports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await axiosInstance.get("/reports/summary");
      setData(res.data);
    } catch (err) {
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <DashboardLayout>
      <h2 className={style.title}>System Reports</h2>

      {loading ? (
        <p className={style.loading}>Loading analytics...</p>
      ) : (
        <>
          {/* System Summary */}
          <div className={style.section}>
            <h3 className={style.sectionTitle}>System Overview</h3>
            <div className={style.grid}>
              <div className={style.card}>
                <p>Total Equipments</p>
                <h3>{data?.equipments}</h3>
              </div>

              <div className={style.card}>
                <p>Total Work Orders</p>
                <h3>{data?.workOrders?.total}</h3>
              </div>

              <div className={style.card}>
                <p>Open Work Orders</p>
                <h3>{data?.workOrders?.open}</h3>
              </div>

              <div className={style.card}>
                <p>Completed Work Orders</p>
                <h3>{data?.workOrders?.completed}</h3>
              </div>
            </div>
          </div>

          {/* Maintenance Type */}
          <div className={style.section}>
            <h3 className={style.sectionTitle}>Maintenance Distribution</h3>
            <div className={style.grid}>
              <div className={style.card}>
                <p>Breakdown Repairs</p>
                <h3>{data?.maintenance?.breakdown}</h3>
              </div>

              <div className={style.card}>
                <p>Preventive Maintenance</p>
                <h3>{data?.maintenance?.preventive}</h3>
              </div>

              <div className={style.card}>
                <p>Active Technicians</p>
                <h3>{data?.technicians}</h3>
              </div>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Reports;
