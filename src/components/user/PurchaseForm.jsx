import styles from "../../styles/PurchaseForm.module.css";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";  // dispatch 추가
import { clearCart } from "../../redux/cartSlice";  // clearCart 액션 임포트

Modal.setAppElement("#root");

export default function PurchaseForm() {
  const { state } = useLocation(); // 카트 페이지에서 전달된 데이터를 가져옵니다.
  const [items, setItems] = useState(state ? state.items : []); // 전달된 카트 아이템들
  const [totalAmount, setTotalAmount] = useState(state ? state.totalAmount : 0); // 전달된 총액
  const [discount, setDiscount] = useState(2000);
  const [shipping, setShipping] = useState(3000);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();  // dispatch 초기화

  const finalAmount = totalAmount - discount + shipping;

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter(item => item.id !== id); // 항목 제거
    setItems(updatedItems);

    // 모든 항목이 제거된 경우 홈 화면으로 이동
    if (updatedItems.length === 0) {
      navigate("/"); // localhost:3000으로 이동
    }
  };

  const handlePaymentClick = () => {
    if (!selectedPaymentMethod) {
      alert("결제 수단을 선택해 주세요.");
      return;
    }
    setModalIsOpen(false);
    setPaymentModalIsOpen(true);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const closePaymentModal = () => {
    setPaymentModalIsOpen(false);
    dispatch(clearCart());  // 결제 완료 후 장바구니 초기화
    navigate("/"); // 홈 화면으로 이동
  };

  return (
    <div className={styles.purchase_Container}>
      <h2 className={styles.purchase_Title}>구매 목록</h2>
      <div className={styles.purchase_Content}>
        <div className={styles.purchase_Item}>
          {items.map(item => (
            <div key={item.id} className={styles.purchase_Detail}>
              <img src={item.image} alt={item.name} className={styles.purchase_BookImage} />
              <div className={styles.purchase_Detail_Text}>
                <span>{item.name}</span>
                <span>{item.price.toLocaleString()}원</span>
                <span>수량: {item.quantity}</span>
              </div>
              <button
                className={styles.purchase_DeleteButton}
                onClick={() => handleDeleteItem(item.id)}>
                🗑️
              </button>
            </div>
          ))}
        </div>
        <div className={styles.purchase_Summary}>
          <div className={styles.purchase_Total}>
            <p><strong>상품 금액:</strong> {totalAmount.toLocaleString()}원</p>
            <p><strong>할인 금액:</strong> {discount.toLocaleString()}원</p>
            <p><strong>배송비:</strong> {shipping.toLocaleString()}원</p>
            <p><strong>총 금액:</strong> {finalAmount.toLocaleString()}원</p>
          </div>
          <div className={styles.purchase_Notice}>
            <p>유의사항:</p>
            <ol>
              <li>상품 훼손 시, 반품 및 환불 불가.</li>
              <li>상품은 1주일 이내 교환 및 환불 가능.</li>
            </ol>
          </div>
        </div>
      </div>
      <button className={styles.purchase_Button} onClick={openModal}>구매하기</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="결제 모달"
        className={styles.paymentModal}
      >
        <h2>결제 수단</h2>
        <ul className={styles.paymentOptions}>
          <li>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="북별스 페이"
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              북별스 페이
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="토스 페이"
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              토스 페이
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="카카오 페이"
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              카카오 페이
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="삼성 페이"
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              삼성 페이
            </label>
          </li>
          <li>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="카드"
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              카드
            </label>
          </li>
        </ul>
        <button className={styles.paymentButton} onClick={handlePaymentClick}>결제</button>
      </Modal>
      <Modal
        isOpen={paymentModalIsOpen}
        onRequestClose={closePaymentModal}
        contentLabel="결제 완료 모달"
        className={styles.paymentCompleteModal}
      >
        <h2>결제 완료</h2>
        <button onClick={closePaymentModal} className={styles.homeButton}>홈 화면으로</button>
      </Modal>
    </div>
  );
}
