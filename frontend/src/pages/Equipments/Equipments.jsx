import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import style from "./Equipments.module.css";
import DashboardLayout from "../../components/Layout/DashboardLayout/DashboardLayout.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import AddEquipmentModal from "./AddEquipmentModal.jsx";

const Equipments = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openAdd, setOpenAdd] = useState(false);

  const getEquipments = async () => {
    try {
      const res = await axiosInstance.get("/equipments");
      setEquipments(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Equipments not found ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEquipments();
  }, []);

  return (
    <DashboardLayout>
      {/* ✅ HEADER */}
      <div className={style.header}>
        <div>
          <h2 className={style.title}>Equipments</h2>
          <p className={style.subtitle}>
            Manage your assets and view equipment status
          </p>
        </div>

        {/* ✅ Add button should be only ONCE and top-right */}
        {isAdmin && (
          <button className={style.addBtn} onClick={() => setOpenAdd(true)}>
            + Add
          </button>
        )}
      </div>

      {/* ✅ LIST */}
      {loading ? (
        <p className={style.loading}>Loading equipments...</p>
      ) : equipments.length === 0 ? (
        <p className={style.empty}>No Equipments found</p>
      ) : (
        <div className={style.container}>
          {equipments.map((eq) => (
            <div key={eq._id} className={style.card}>
              <div className={style.cardTop}>
                <h3 className={style.eqName}>{eq.name}</h3>

                <span
                  className={`${style.status} ${
                    eq.status === "active"
                      ? style.active
                      : eq.status === "maintenance"
                      ? style.maintenance
                      : style.breakdown
                  }`}
                >
                  {eq.status}
                </span>
              </div>

              <p className={style.serial}>
                Serial: <span>{eq.serialNumber}</span>
              </p>

              <div className={style.infoRow}>
                <div>
                  <p className={style.label}>Model</p>
                  <p className={style.value}>{eq.model}</p>
                </div>
                <div>
                  <p className={style.label}>Location</p>
                  <p className={style.value}>{eq.location}</p>
                </div>
              </div>

              <div className={style.footer}>
                <p className={style.hours}>
                  Running Hours: <span>{eq.runningHours} hrs</span>
                </p>

                <Link to={`/equipments/${eq._id}`} className={style.btn}>
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Modal must be outside map() */}
      <AddEquipmentModal
        isOpen={openAdd}
        onClose={() => setOpenAdd(false)}
        onCreated={getEquipments}
      />
    </DashboardLayout>
  );
};

export default Equipments;
