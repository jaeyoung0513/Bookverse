// Pagination.jsx
import React from "react";
import styles from "../styles/Pagination.module.css";

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.pageItem}>
            <button
              onClick={() => paginate(number)}
              className={`${styles.pageLink} ${
                number === currentPage ? styles.active : ""
              }`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
