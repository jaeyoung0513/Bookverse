import styles from "../../styles/Cart.module.css";
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import {Outlet, useNavigate} from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
      { id: 1, title: "책 제목",
        author: "저자 이름",
        quantity: 1,
        price: 10000
      },
  ]);

  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate()

  useEffect(()=> {
      const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setTotalPrice(newTotal);
  }, [cartItems]);

  const handleDelete = (bookId) => {
    setCartItems(cartItems.filter(item => item.id !== bookId)); };

  const handlePurchase = () => (
      navigate("/mymenu/cart/Purchase")
  )

  return (
      <div className={styles.cartContainer}>
        <h1 className={styles.cartTitle}>장바구니</h1>
        {cartItems.map(item => (
            <div key={item.id} className={styles.cartBookItem}>
              <div className={styles.cartBookDetails}>
                <p>도서 명: {item.title}</p>
                <p>저자: {item.author}</p>
                <p>권수: {item.quantity}</p>
                <p>가격: {item.price.toLocaleString()}원</p>
            </div>
            <button className={styles.cartDeleteButton} onClick={() => handleDelete(item.id)} >
              <FaTrash />
            </button> </div> ))}
            <div className={styles.cartTotal}>
              <p>총: {totalPrice.toLocaleString()}원</p>
            </div>
            <button className={styles.cartPurchaseButton} onClick={handlePurchase}>구매하기</button>
      </div>
      );
}
