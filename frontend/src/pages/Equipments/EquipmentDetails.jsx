import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import DashboardLayout from "../../components/Layout/DashboardLayout/DashboardLayout";
import style from "./EquipmentDetails.module.css";
import { AuthContext } from "../../context/AuthContext";
import EditEquipmentModal from "./EditEquipmentModal";

const EquipmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  const fetchEquipment = async () => {
    try {
      const res = await axiosInstance.get(`/equipments/${id}`);
      setEquipment(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Error while fetching equipment details ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipment();
  }, [id]);

  useEffect(() => {
    axiosInstance.get("/workorders").then(res => setOrders(res.data));
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString();
  };

  const handleDelete = async () => {
    const ok = window.confirm("Delete this equipment?");
    if (!ok) return;

    try {
      await axiosInstance.delete(`/equipments/${id}`);
      toast.success("Equipment deleted ✅");
      navigate("/equipments");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed ❌ (Admin only)");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className={style.loading}>Loading equipment...</p>
      </DashboardLayout>
    );
  }

  if (!equipment) {
    return (
      <DashboardLayout>
        <p className={style.empty}>Equipment not found</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* ✅ Header */}
      <div className={style.header}>
        <div>
          <h2 className={style.title}>{equipment.name}</h2>
          <p className={style.subTitle}>
            Serial: <span>{equipment.serialNumber}</span>
          </p>
        </div>

        <div className={style.headerRight}>
          <span
            className={`${style.status} ${
              equipment.status === "active"
                ? style.active
                : equipment.status === "maintenance"
                ? style.maintenance
                : style.breakdown
            }`}
          >
            {equipment.status}
          </span>

          <Link to="/equipments" className={style.backBtn}>
            ← Back
          </Link>
        </div>
      </div>

      {/* ✅ Main Grid */}
      <div className={style.grid}>
        <div className={style.card}>
          <h3 className={style.cardTitle}>Basic Information</h3>

          <div className={style.row}>
            <p className={style.label}>Model</p>
            <p className={style.value}>{equipment.model}</p>
          </div>

          <div className={style.row}>
            <p className={style.label}>Location</p>
            <p className={style.value}>{equipment.location}</p>
          </div>

          <div className={style.row}>
            <p className={style.label}>Running Hours</p>
            <p className={style.value}>{equipment.runningHours} hrs</p>
          </div>

          <div className={style.row}>
            <p className={style.label}>Last Service</p>
            <p className={style.value}>{formatDate(equipment.lastServiceDate)}</p>
          </div>
        </div>

        <div className={style.card}>
          <h3 className={style.cardTitle}>More Details</h3>

          <div className={style.row}>
            <p className={style.label}>Created At</p>
            <p className={style.value}>{formatDate(equipment.createdAt)}</p>
          </div>

          <div className={style.row}>
            <p className={style.label}>Updated At</p>
            <p className={style.value}>{formatDate(equipment.updatedAt)}</p>
          </div>

          <div className={style.row}>
            <p className={style.label}>Equipment ID</p>
            <p className={style.valueSmall}>{equipment._id}</p>
          </div>
        </div>
      </div>

      {/* ✅ Actions */}
      <div className={style.actions}>
        {(user?.role === "admin" || user?.role === "manager") && (
          <button 
            className={style.primaryBtn}
            onClick={() => navigate(`/workorders/create?equipmentId=${equipment._id}`)}
          >
            Create Work Order
          </button>
        )}
        {(user?.role === "admin" || user?.role === "manager") && (
          <button
            className={style.secondaryBtn}
            onClick={() => setOpenEdit(true)}
          >
            Edit Equipment
          </button>
        )}

        {(user?.role === "admin" || user?.role === "manager") && (
          <button className={style.dangerBtn} onClick={handleDelete}>
            Delete Equipment
          </button>
        )}
      </div>

      {/* ✅ Edit Modal */}
      <EditEquipmentModal
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
        equipment={equipment}
        onUpdated={fetchEquipment}
      />
    </DashboardLayout>
  );
};

export default EquipmentDetails;
