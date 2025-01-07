import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/UserSidebar.module.css";

const UserSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles.menuList}>
        <li>
          <NavLink
            to="/mymenu/myprofile"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            내 정보
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mymenu/wishlist"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            찜 목록
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mymenu/cart"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            장바구니
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mymenu/purchasehistory"
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            구매 기록
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
