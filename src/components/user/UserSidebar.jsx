import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/UserSidebar.module.css';

const UserSidebar = () => {
    return (
        <div className={styles.sidebar}>
            <ul className={styles.menuList}>
                <li className={styles.sidebarFont}>
                    <NavLink to="/mymenu/myprofile" className={({ isActive }) => (isActive ? styles.active : '')}>내 정보</NavLink>
                </li>
                <li className={styles.sidebarFont}>
                    <NavLink to="/mymenu/wishlist" className={({ isActive }) => (isActive ? styles.active : '')}>찜 목록</NavLink>
                </li>
                <li className={styles.sidebarFont}>
                    <NavLink to="/mymenu/cart" className={({ isActive }) => (isActive ? styles.active : '')}>장바구니</NavLink>
                </li>
                <li className={styles.sidebarFont}>
                    <NavLink to="/mymenu/purchasehistory" className={({ isActive }) => (isActive ? styles.active : '')}>구매 기록</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default UserSidebar;
