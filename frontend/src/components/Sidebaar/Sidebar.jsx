import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { NavLink } from "react-router-dom";
import style from "./Sidebar.module.css";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { user, loading } = useContext(AuthContext);
  const role = user?.role;

  useEffect(() => {
    let toastId;

    if (loading) {
      toastId = toast.loading("Loading user...");
    } else {
      toast.dismiss(); // close all toasts
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [loading]);

  const adminMenu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Equipments", path: "/equipments" },
    { name: "Work Orders", path: "/workorders" },
    { name: "Preventive", path: "/preventive" },
    { name: "Users", path: "/users" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  const managerMenu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Equipments", path: "/equipments" },
    { name: "Work Orders", path: "/workorders" },
    { name: "Preventive", path: "/preventive" },
    { name: "Reports", path: "/reports" },
  ];

  const technicianMenu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Work Orders", path: "/my-workorders" },
    { name: "Equipments", path: "/equipments" },
    { name: "Preventive", path: "/preventive" },
  ];

  // ✅ FIXED MENU LOGIC (No wrong menu before role loads)
  let menu = [];

  if (!loading) {
    if (role === "admin") menu = adminMenu;
    else if (role === "manager") menu = managerMenu;
    else menu = technicianMenu;
  }

  return (
    <div className={style.sidebar}>
      <h2 className={style.logo}>CAT-Maintain</h2>

      <div className={style.userBox}>
        <p className={style.username}>
          {loading ? "Loading..." : user?.name || "No User"}
        </p>
        <span className={style.role}>
          {loading ? "Loading..." : role || "No Role"}
        </span>
      </div>

      <div className={style.nav}>
        {loading ? (
          <p style={{ padding: "10px" }}>Loading menu...</p>
        ) : (
          menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? `${style.link} ${style.active}` : style.link
              }
            >
              {item.name}
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
