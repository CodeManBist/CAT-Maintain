import React from 'react'
import style from "./DashboardLayout.module.css";
import Sidebar from '../../Sidebaar/Sidebar';
import Topbar from '../../Topbar/Topbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className={style.container}>
        <div className={style.sidebar}>
            <Sidebar />
        </div>
        <div className={style.main}>
            <div className={style.topbar}>
                <Topbar />
            </div>
            <div className={style.content}>
                {children}
            </div>
        </div>
    </div>
  )
}

export default DashboardLayout
