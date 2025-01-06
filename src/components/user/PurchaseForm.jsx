import styles from "../../styles/PurchaseForm.module.css";
import React from "react";

export default function PurchaseForm() {

    return (
        <div className={styles.purchase_Container}>
            <h1 className={styles.purchase_Title}>구매 목록</h1>
            <table className={styles.purchase_Table}>
                <thead>
                <tr>
                    <th>사진</th>
                    <th>도서명</th>
                    <th>가격</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><img src="책사진 URL" alt="도서 1" className={styles.purchase_BookImage}/></td>
                    <td>도서 1</td>
                    <td>10,000원</td>
                </tr>
                <tr>
                    <td><img src="책사진 URL" alt="도서 2" className={styles.purchase_BookImage}/></td>
                    <td>도서 2</td>
                    <td>12,000원</td>
                </tr>
                <tr>
                    <td><img src="책사진 URL" alt="도서 3" className={styles.purchase_BookImage}/></td>
                    <td>도서 3</td>
                    <td>15,000원</td>
                </tr>
                </tbody>
            </table>
            <div className={styles.purchase_Total}><p><strong>상품 금액:</strong> 37,000원</p> <p><strong>할인 금액:</strong> 2,000원</p>
                <p><strong>배송비:</strong> 3,000원</p> <p><strong>총 금액:</strong> 38,000원</p></div>
            <div className={styles.purchase_Notice}><p>유의사항:</p>
                <ol>
                    <li>상품 훼손 시, 반품 및 환불 불가.</li>
                    <li>상품은 1주일 이내 교환 및 환불 가능.</li>
                </ol>
            </div>
            <a href="구매링크" className={styles.purchase_Button}>구매하기</a>
        </div>
    );
}