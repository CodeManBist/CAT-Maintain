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
    }

    if (!loading) {
      toast.dismiss(); // closes loading toast
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

  const menu =
    role === "admin" ? adminMenu : role === "manager" ? managerMenu : technicianMenu;

  return (
    <div className={style.sidebar}>
      <h2 className={style.logo}>CAT-Maintain</h2>

      <div className={style.userBox}>
        <p className={style.username}>
          {loading ? "Loading..." : user?.name}
        </p>
        <span className={style.role}>{role}</span>
      </div>


      <div className={style.nav}>
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? `${style.link} ${style.active}` : style.link
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
