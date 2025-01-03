import React from "react";
import FindById from "../components/auth/FindById";
import FindByPassword from "../components/auth/FindByPassword";
import styles from "../styles/FindUserInfo.module.css";
import { Link } from "react-router-dom";

export default function FindUserInfo() {
  return (
    <>
      <div className={styles.logoImageContainer}>
        <Link to="/">
          <img
            src="/BookverseLogo.png"
            className={styles.logoImage}
            alt="Bookverse Logo"
          />
        </Link>
      </div>
      <div className={styles.FindContainer}>
        <div>
          <FindById />
        </div>
        <div className={styles.FindDivider}></div>
        <div>
          <FindByPassword />
        </div>
      </div>
    </>
  );
}
