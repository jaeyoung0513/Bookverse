import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/" className={styles.homeLink}>
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
