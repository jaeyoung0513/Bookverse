import styles from "../../styles/PurchaseHistory.module.css";
import React from "react";

export default function PurchaseHistory() {
    return (
        <div className={styles.purchaseContainer}>
            <h1 className={styles.purchaseTitle}>구매 기록</h1>
            <div className={styles.purchaseBookDetails}>
                <img src="/path/to/book-image.jpg" alt="도서 표지" className={styles.purchaseBookImage}/>
                <div className={styles.purchaseBookInfo}>
                    <p>도서 명: [도서 제목]</p>
                    <p>저자: [저자 이름]</p>
                    <p>가격: [가격]</p>
                    <p>구매 날짜: [구매 날짜]</p>
                </div>
            </div>
        </div>
    );
}
