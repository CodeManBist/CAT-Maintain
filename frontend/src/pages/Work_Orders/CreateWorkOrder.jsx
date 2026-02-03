import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout/DashboardLayout";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./CreateWorkOrder.module.css";

const CreateWorkOrder = () => {
  const navigate = useNavigate();

  const [equipments, setEquipments] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const [form, setForm] = useState({
    equipmentId: "",
    issueType: "breakdown",
    priority: "medium",
    assignedTo: "",
    description: "",
    estimatedCost: "",
    downtimeHours: ""
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const eq = await axiosInstance.get("/equipments");
        const tech = await axiosInstance.get("/users?role=technician");
        setEquipments(eq.data);
        setTechnicians(tech.data);
      } catch {
        toast.error("Failed to load data");
      }
    };

    loadData();
  }, []);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/workorders", {
        ...form,
        estimatedCost: Number(form.estimatedCost),
        downtimeHours: Number(form.downtimeHours)
      });

      toast.success("Work order created");
      navigate(`/workorders/${res.data._id}`);
    } catch {
      toast.error("Creation failed");
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.header}>
        <h2>Create Work Order</h2>
        <p>Assign and track a maintenance task</p>
      </div>

      <form className={styles.card} onSubmit={handleSubmit}>

        <select name="equipmentId" required onChange={handleChange}>
          <option value="">Select Equipment</option>
          {equipments.map(eq => (
            <option key={eq._id} value={eq._id}>
              {eq.name}
            </option>
          ))}
        </select>

        <select name="issueType" onChange={handleChange}>
          <option value="breakdown">Breakdown</option>
          <option value="preventive">Preventive</option>
        </select>

        <select name="priority" onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>

        <select name="assignedTo" onChange={handleChange}>
          <option value="">Assign Technician</option>
          {technicians.map(t => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Describe the issue..."
          onChange={handleChange}
        />

        <input
          type="number"
          name="estimatedCost"
          placeholder="Estimated Cost"
          onChange={handleChange}
        />

        <input
          type="number"
          name="downtimeHours"
          placeholder="Downtime Hours"
          onChange={handleChange}
        />

        <button type="submit">Create Work Order</button>
      </form>
    </DashboardLayout>
  );
};

export default CreateWorkOrder;
