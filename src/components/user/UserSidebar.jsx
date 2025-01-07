import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/UserSidebar.module.css';

const UserSidebar = () => {
  const menuItems = [
    { path: "/mymenu/myprofile", label: "내 정보" },
    { path: "/mymenu/wishlist", label: "찜 목록" },
    { path: "/mymenu/cart", label: "장바구니" },
    { path: "/mymenu/purchasehistory", label: "구매 기록" },
  ];
  return (
    <div className={styles.sidebar}>
      <ul className={styles.menuList}>
        {menuItems.map((item) => (
          <li key={item.path} className={styles.menuItem}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              end // 정확한 경로 일치
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSidebar;
