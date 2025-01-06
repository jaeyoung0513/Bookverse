import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/UserSidebar.module.css';

const UserSidebar = () => {
    return (
        <div className={styles.sidebar}>
            <ul className={styles.menuList}>
                <li>
                    <NavLink to="/mymenu/myprofile" activeClssName={styles.active}>내 정보</NavLink>
                </li>
                <li>
                    <NavLink to="/mymenu/wishlist" activeClssName={styles.active}>찜 목록</NavLink>
                </li>
                <li>
                    <NavLink to="/mymenu/cart" activeClssName={styles.active}>장바구니</NavLink>
                </li>
                <li>
                    <NavLink to="/mymenu/purchasehistory" activeClssName={styles.active}>구매 기록</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default UserSidebar;
