import styles from "../../styles/Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeItem, updateQuantity } from "../../redux/cartSlice"; // 액션 임포트
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);  // Redux에서 장바구니 아이템 가져오기
  const totalPrice = useSelector((state) => state.cart.total); // Redux에서 총 가격 가져오기
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (bookId) => {
    dispatch(removeItem(bookId));  // 아이템 삭제
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));  // 수량 업데이트
  };

  const handlePurchase = () => {
    navigate("/mymenu/cart/Purchase");
  };

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>장바구니</h1>
      {cartItems.map((item) => (
        <div key={item.id} className={styles.cartBookItem}>
          <div className={styles.cartBookDetails}>
            <p>도서 명: {item.title}</p>
            <p>저자: {item.author}</p>
            <div>
              <p>권수: 
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >-</button>
                {item.quantity}
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >+</button>
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
