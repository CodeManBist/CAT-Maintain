import React from 'react'
import style from "./Topbar.module.css";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Topbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/login");
    }

    return (
    <div className={style.container}>
        <h1>CAT-Maintain</h1>
        <div className={style.logout}>
            <button className={style.logoutButton} onClick={handleLogout}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Topbar
