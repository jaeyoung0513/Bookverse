import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/BookDetail.module.css";
import errorDisplay from "../../api/errorDisplay";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState({
    filter: "blur(2px)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "-180px",
    zIndex: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/book/bookdetail/${id}`)
      .then((response) => {
        setBook(response.data);
        setBackgroundStyle((prev) => ({
          ...prev,
          backgroundImage: `url(${response.data.image})`,
        }));
      })
      .catch((error) => {
        errorDisplay(error);
        navigate("/");
      });
  }, [id, navigate]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div style={backgroundStyle}></div> {/* 배경 이미지에 동적 URL 적용 */}
        <div className={styles.cardContent}>
          <img src={book.image} alt={book.title} className={styles.bookImage} />
          <h1 className={styles.title}>{book.title}</h1>
          <h3 className={styles.author}>{book.author}</h3>
          <button className={styles.addCartButton}>장바구니 담기</button>
        </div>
      </div>

      <div className={styles.detailBox}>
        <p className={styles.desc}>{book.desc}</p>
        <br />
        <br />
        <br />
        <div className={styles.infoRow}>
          <span className={styles.label}>카테고리</span>
          <span className={styles.category}>{book.category}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>출판사</span>
          <span className={styles.value}>{book.publisher}</span>
        </div>
        <br />
        <br />
        <div className={styles.rating}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={
                book.rating > index ? styles.ratingFilled : styles.notRated
              }
            >
              ⭐
            </span>
          ))}
        </div>
        <br />
        <br />
        <br />
        <button className={styles.purchaseButton}>구매하기</button>
      </div>
    </div>
  );
}
