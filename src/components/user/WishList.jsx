import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWishList, removeFromWishList } from "../../redux/wishlistSlice";
import { addItem } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/WishList.module.css";
import { FaTrash } from "react-icons/fa";

export default function WishList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.wishlist.wishlist); // Redux에서 찜 목록 가져오기

  useEffect(() => {
    axios
      .get("/api/purchase/add/wish")
      .then((response) => {
        dispatch(setWishList(response.data)); // 서버에서 받은 데이터를 Redux에 저장
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addItem(item)); // 장바구니에 추가
    navigate("/mymenu/cart"); // 장바구니 페이지로 이동
  };

  const handleDelete = (id) => {
    dispatch(removeFromWishList({ id })); // 찜 목록에서 삭제
  };

  if (!wishlist.length) {
    alert("찜 목록이 모두 삭제됐습니다. 메인 메뉴로 돌아갑니다.");
    navigate("/"); // 찜 목록이 비었을 때 표시
  }

  return (
    <div className={styles.wishContainer}>
      <h1 className={styles.wishTitle}>찜 목록</h1>
      <div className={styles.wishListContent}>
        {wishlist.map((item) => (
          <div key={item.id} className={styles.wishBookItem}>
            <img
              src={item.image}
              alt={item.title}
              className={styles.wishBookImage}
            />
            <div className={styles.wishBookDetails}>
              <p className={styles.wishBookTitle}>도서 명: {item.title}</p>
              <p className={styles.wishBookAuthor}>저자: {item.author}</p>
              <p className={styles.wishBookPrice}>
                가격: {item.price.toLocaleString()}원
              </p>
            </div>
            <button
              className={styles.addToCartButton}
              onClick={() => handleAddToCart(item)}
            >
              장바구니에 담기
            </button>
            <FaTrash
              className={styles.wish_deleteIcon}
              onClick={() => handleDelete(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
