import React, { useEffect } from "react";
import styles from "../../styles/Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeItem, updateQuantity, clearCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axiosInstance";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.total);
  const isLogin = useSelector((state) => state.userInfo.loginFlag);
  const userEmail = useSelector((state) => state.userInfo.user?.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  const handleDelete = async (id) => {
    if (!userEmail) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    try {
      await apiClient.delete(`/api/purchase/delete/cart`, {
        data: { email: userEmail, bookId: id },
      });
      dispatch(removeItem(id));
      alert("장바구니에서 제거되었습니다.");
    } catch (error) {
      alert("장바구니에서 제거하는 중 오류가 발생했습니다.");
    }
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = async () => {
    if (!userEmail) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    try {
      await apiClient.delete(`/api/purchase/clear/cart`, {
        data: { email: userEmail },
      });
      dispatch(clearCart());
      alert("장바구니가 비워졌습니다.");
    } catch (error) {
      alert("장바구니를 비우는 중 오류가 발생했습니다.");
    }
  };

  const handlePurchase = () => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }
    navigate("/mymenu/cart/purchase", { state: { cartItems, totalPrice } });
  };

  if (!isLogin) {
    return null;
  }

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>장바구니</h1>
      {cartItems.length === 0 ? (
        <p className={styles.cartEmpty}>장바구니가 비어 있습니다.</p>
      ) : (
        <>
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
          <div className={styles.cartActions}>
            <button
              className={styles.cartClearButton}
              onClick={handleClearCart}
            >
              장바구니 비우기
            </button>
            <button
              className={styles.cartPurchaseButton}
              onClick={handlePurchase}
            >
              구매하기
            </button>
          </div>
        </>
      )}
    </div>
  );
}
