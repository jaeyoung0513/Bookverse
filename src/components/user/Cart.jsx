import React, { useEffect } from "react";
import styles from "../../styles/Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeItem, updateQuantity } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.total);
  const isLogin = useSelector((state) => state.userInfo.loginFlag);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인이 되어있지 않다면 로그인 페이지로 이동
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  const handleDelete = (bookId) => {
    dispatch(removeItem(bookId));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handlePurchase = () => {
    navigate("/mymenu/cart/purchase");
  };

  if (!isLogin) {
    return null; // 로그인이 되어 있지 않다면 아무것도 렌더링하지 않음
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>장바구니</h1>
      {cartItems.map((item) => (
        <div key={item.id} className={styles.cartBookItem}>
          <div className={styles.cartBookDetails}>
            <p>도서 명: {item.title}</p>
            <p>저자: {item.author}</p>
            <div>
              <p>
                권수:
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                {item.quantity}
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </p>
            </div>
            <p>가격: {item.price.toLocaleString()}원</p>
          </div>
          <button
            className={styles.cartDeleteButton}
            onClick={() => handleDelete(item.id)}
          >
            <FaTrash />
          </button>
        </div>
      ))}
      <div className={styles.cartTotal}>
        <p>총: {totalPrice.toLocaleString()}원</p>
      </div>
      <button className={styles.cartPurchaseButton} onClick={handlePurchase}>
        구매하기
      </button>
    </div>
  );
}
