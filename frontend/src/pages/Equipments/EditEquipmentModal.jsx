import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import styles from "./EditEquipmentModal.module.css";

const EditEquipmentModal = ({ isOpen, onClose, equipment, onUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    location: "",
    status: "active",
    runningHours: "",
    lastServiceDate: "",
  });

  useEffect(() => {
    if (equipment) {
      setFormData({
        name: equipment.name || "",
        model: equipment.model || "",
        location: equipment.location || "",
        status: equipment.status || "active",
        runningHours: equipment.runningHours || "",
        lastServiceDate: equipment.lastServiceDate
          ? equipment.lastServiceDate.split("T")[0]
          : "",
      });
    }
  }, [equipment]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/equipments/${equipment._id}`, {
        ...formData,
        runningHours: Number(formData.runningHours),
      });

      toast.success("Equipment updated ✅");
      onUpdated(); // refresh equipment details
      onClose(); // close modal
    } catch (err) {
      console.log(err);
      toast.error("Update failed ❌ (Admin only)");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Edit Equipment</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✖
          </button>
        </div>

        <form className={styles.form} onSubmit={handleUpdate}>
          <input
            className={styles.input}
            name="name"
            placeholder="Equipment Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className={styles.input}
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
            required
          />

          <input
            className={styles.input}
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <select
            className={styles.select}
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="maintenance">Maintenance</option>
            <option value="breakdown">Breakdown</option>
          </select>

          <input
            className={styles.input}
            name="runningHours"
            type="number"
            placeholder="Running Hours"
            value={formData.runningHours}
            onChange={handleChange}
            required
          />

          <input
            className={styles.input}
            name="lastServiceDate"
            type="date"
            value={formData.lastServiceDate}
            onChange={handleChange}
            required
          />

          <button className={styles.updateBtn} type="submit">
            Update Equipment
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEquipmentModal;
