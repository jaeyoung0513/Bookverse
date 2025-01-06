import React from "react";
import styles from "../../styles/BookCard.module.css"; // Import the corresponding CSS file
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className={styles.card}>
      <Link to={`${book.id}`}>
        <img src={book.image} alt={book.title} className={styles.bookImage} />
        <div className={styles.bookInfo}>
          <h3 className={styles.title}>{book.title}</h3>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;
