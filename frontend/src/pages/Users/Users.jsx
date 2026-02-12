import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/Layout/DashboardLayout/DashboardLayout";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import style from "./Users.module.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      await axiosInstance.put(`/users/${id}/role`, {
        role: newRole
      });

      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axiosInstance.delete(`/users/${id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <DashboardLayout>
      <div className={style.container}>
        <h2 className={style.title}>User Management</h2>

        {loading ? (
          <p className={style.loading}>Loading users...</p>
        ) : (
          <div className={style.table}>
            <div className={style.tableHead}>
              <p>Name</p>
              <p>Role</p>
              <p>Actions</p>
            </div>

            {users.map((user) => (
              <div key={user._id} className={style.tableRow}>
                <p>{user.name}</p>

                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user._id, e.target.value)
                  }
                  className={style.select}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="technician">Technician</option>
                </select>

                <button
                  onClick={() => handleDelete(user._id)}
                  className={style.deleteBtn}
                >
                  Deactivate User
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Users;
