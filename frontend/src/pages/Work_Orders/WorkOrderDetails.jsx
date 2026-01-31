import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/Layout/DashboardLayout/DashboardLayout";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import style from "./WorkOrderDetails.module.css";

const WorkOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [wo, setWo] = useState(null);
  const [comment, setComment] = useState("");

  const fetchWO = async () => {
    try {
      const res = await axiosInstance.get(`/workorders/${id}`);
      setWo(res.data);
    } catch {
      toast.error("Failed to load work order");
    }
  };

  useEffect(() => {
    fetchWO();
  }, [id]);

  if (!wo) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  // ✅ status update
  const updateStatus = async (status) => {
    try {
      await axiosInstance.put(`/workorders/${id}/status`, { status });
      toast.success("Status updated");
      fetchWO();
    } catch {
      toast.error("Status update failed");
    }
  };

  // ✅ add comment
  const addComment = async () => {
    if (!comment.trim()) return;

    try {
      await axiosInstance.post(`/workorders/${id}/comment`, { message: comment });
      setComment("");
      fetchWO();
    } catch {
      toast.error("Comment failed");
    }
  };

  return (
    <DashboardLayout>

      {/* Header */}
      <div className={style.header}>
        <div>
          <h2>WO-{wo._id.slice(-6)}</h2>
          <p>{wo.equipmentId?.name}</p>
        </div>

        <div className={style.badges}>
          <span className={`${style.badge} ${style[wo.priority]}`}>
            {wo.priority}
          </span>

          <span className={`${style.badge} ${style[wo.status]}`}>
            {wo.status}
          </span>

          <button onClick={() => navigate(-1)} className={style.backBtn}>
            Back
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className={style.grid}>

        <div className={style.card}>
          <h3>Work Info</h3>
          <p><b>Issue:</b> {wo.issueType}</p>
          <p><b>Description:</b> {wo.description}</p>
          <p><b>Created:</b> {new Date(wo.createdAt).toLocaleString()}</p>
        </div>

        <div className={style.card}>
          <h3>Assignment</h3>
          <p><b>Technician:</b> {wo.assignedTo?.name || "Unassigned"}</p>
          <p><b>Downtime:</b> {wo.downtimeHours || 0} hrs</p>
          <p><b>Cost:</b> ${wo.estimatedCost || 0}</p>
        </div>

      </div>

      {/* Actions */}
      <div className={style.actions}>
        {user?.role === "technician" && (
          <>
            <button onClick={() => updateStatus("in-progress")}>
              Start Work
            </button>
            <button onClick={() => updateStatus("completed")}>
              Mark Completed
            </button>
          </>
        )}

        {(user?.role === "admin" || user?.role === "manager") && (
          <>
            <button onClick={() => updateStatus("open")}>Set Open</button>
            <button onClick={() => updateStatus("in-progress")}>Set In Progress</button>
            <button onClick={() => updateStatus("completed")}>Set Completed</button>
          </>
        )}
      </div>

      {/* Comments */}
      <div className={style.card}>
        <h3>Comments</h3>

        <div className={style.timeline}>
          {wo.comments?.map((c, i) => (
            <div key={i} className={style.comment}>
              <b>{c.user?.name}</b>
              <p>{c.message}</p>
              <span>{new Date(c.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className={style.commentBox}>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Add comment..."
          />
          <button onClick={addComment}>Post</button>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default WorkOrderDetails;
