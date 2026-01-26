import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import styles from "./AddEquipmentModal.module.css";

const AddEquipmentModal = ({ isOpen, onClose, onCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    model: "",
    location: "",
    status: "active",
    runningHours: "",
    lastServiceDate: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/equipments", {
        ...formData,
        runningHours: Number(formData.runningHours),
      });

      toast.success("Equipment created ✅");
      onCreated();
      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Create failed ❌ (Admin only)");
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Add Equipment</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✖
          </button>
        </div>

        <form className={styles.form} onSubmit={handleCreate}>
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
            name="serialNumber"
            placeholder="Serial Number (unique)"
            value={formData.serialNumber}
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

          <button className={styles.createBtn} type="submit">
            Create Equipment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEquipmentModal;
