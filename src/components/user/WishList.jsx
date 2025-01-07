import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../../redux/wishlistSlice";
import { addItem } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/WishList.module.css";
import { FaTrash } from "react-icons/fa";
import apiClient from "../../api/axiosInstance";

export default function WishList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state) => state.wishlist.items || []); // Redux 상태에서 위시리스트 가져오기
  const email = useSelector((state) => state.userInfo.user?.email); // 사용자 이메일 가져오기

  const handleAddToCart = (item) => {
    dispatch(addItem(item)); // 장바구니에 추가
    navigate("/mymenu/cart"); // 장바구니 페이지로 이동
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete("/api/purchase/delete/wish", {
        data: { email: email, bookId: id }, // 이메일과 책 ID를 요청 본문에 포함
      });
      dispatch(removeFromWishList({ id })); // Redux에서 위시리스트 항목 삭제
      alert("찜목록에서 제거되었습니다.");
    } catch (error) {
      console.error("찜목록 제거 중 오류:", error);
      alert("찜목록에서 항목을 제거하는 데 실패했습니다.");
    }
  };

  if (!wishlist.length) {
    return (
      <div className={styles.emptyContainer}>
        <h2>찜 목록이 비었습니다.</h2>
        <button className={styles.goBackButton} onClick={() => navigate("/")}>
          메인 메뉴로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wishContainer}>
      <h1 className={styles.wishTitle}>찜 목록</h1>
      <div className={styles.wishListContent}>
        {wishlist.map((item) => (
          <div key={item.id} className={styles.wishBookItem}>
            <img
              src={item.image}
              alt={`${item.title}의 표지`}
              className={styles.wishBookImage}
            />
            <div className={styles.wishBookDetails}>
              <p className={styles.wishBookTitle}>{item.title}</p>
              <p className={styles.wishBookAuthor}>{item.author}</p>
              <p className={styles.wishBookPrice}>
                가격: {item.price.toLocaleString()}원
              </p>
            </div>
            <button
              className={styles.addToCartButton}
              onClick={() => handleAddToCart(item)}
            >
              <img
                src="/assets/cart.png"
                alt="장바구니"
                className={styles.cartIcon}
              />
            </button>
            <button
              className={styles.wishDeleteButton}
              onClick={() => handleDelete(item.id)}
              aria-label={`${item.title} 삭제`}
            >
              <FaTrash className={styles.wishDeleteIcon} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
