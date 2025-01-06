import styles from "../../styles/WishList.module.css";
import React from "react";

export default function WishList(){
    return (
        <div className={styles.wishContainer}>
            <h1 className={styles.wishTitle}>찜 목록</h1>
            <div className={styles.wishListContent}>
                <div className={styles.wishBookItem}><img src="/path/to/book-image.jpg" alt="도서 표지"
                                                      className={styles.wishBookImage}/>
                    <div className={styles.wishBookDetails}>
                        <p className={styles.wishBookTitle}>도서 명: [도서 제목]</p>
                        <p className={styles.wishBookAuthor}>저자: [저자 이름]</p>
                        <p className={styles.wishBookPrice}>가격: [가격]</p>
                        <button className={styles.addToCartButton}>장바구니에 담기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
