import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";
import styles from "../../src/styles/MyMenu.module.css";
import { useSelector } from "react-redux";

const MyMenu = () => {
  const isLogin = useSelector((state) => state.userInfo.loginFlag);
  const navigate = useNavigate();

  if (!isLogin) {
    return navigate("/login");
  }

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
