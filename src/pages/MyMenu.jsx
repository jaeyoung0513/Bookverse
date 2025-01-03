import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";
import styles from "../../src/styles/MyMenu.module.css";

const MyMenu = () => {
    return (
        <div className={styles.mymenulayout}>
            <UserSidebar />
            <div className={styles.mymenucontent}>
                <Outlet />
            </div>
        </div>
    );
};

export default MyMenu;
