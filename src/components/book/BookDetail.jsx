import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../api/axiosInstance";
import styles from "../../styles/BookDetail.module.css";
import errorDisplay from "../../api/errorDisplay";
import { addToWishList, removeFromWishList } from "../../redux/wishlistSlice";
import { selectIsInWishlist } from "../../redux/selectors";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isInWishlist = useSelector((state) =>
    selectIsInWishlist(state, parseInt(id, 10))
  );

  const loginFlag = useSelector((state) => state.userInfo.loginFlag); // 로그인 상태 가져오기
  const user = useSelector((state) => state.userInfo.user);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [backgroundStyle, setBackgroundStyle] = useState({
    filter: "blur(2px)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "-180px",
    zIndex: 0,
  });

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await apiClient.get(`/api/book/bookdetail/${id}`);
        setBook(response.data);
        setBackgroundStyle((prev) => ({
          ...prev,
          backgroundImage: `url(${response.data.image})`,
        }));
      } catch (error) {
        errorDisplay(error);
        navigate("/");
      }
    };
    fetchBookDetails();
  }, [id, navigate]);

  const handleCart = () => {
    if (!loginFlag) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    // 장바구니 추가 로직 (구현 필요)
    alert("장바구니에 추가되었습니다!");
  };

  const handlePurchase = () => {
    if (!loginFlag) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    // 구매 로직 (구현 필요)
    alert("구매 페이지로 이동합니다.");
  };

  const toggleWishlist = async () => {
    if (!book || loading) return;

    if (!loginFlag || !user?.email) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    setLoading(true);
    try {
      if (isInWishlist) {
        await apiClient.post("/api/purchase/delete/wish", {
          email: user.email, // 사용자 이메일 추가
          bookId: book.id,
        });
        dispatch(removeFromWishList(book));
      } else {
        await apiClient.post("/api/purchase/add/wish", {
          email: user.email, // 사용자 이메일 추가
          bookId: book.id,
        });
        dispatch(addToWishList(book));
      }
    } catch (error) {
      errorDisplay(error);
    } finally {
      setLoading(false);
    }
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div style={backgroundStyle}></div>
        <div className={styles.cardContent}>
          <img src={book.image} alt={book.title} className={styles.bookImage} />
          <h1 className={styles.title}>{book.title}</h1>
          <h3 className={styles.author}>{book.author}</h3>
          <div className={styles.leftButtons}>
            <button className={styles.addCartButton} onClick={handleCart}>
              장바구니 담기
            </button>
            <button
              className={styles.addWishlistButton}
              onClick={toggleWishlist}
              disabled={loading}
            >
              {loading ? "처리 중..." : isInWishlist ? "찜 제거" : "찜하기"}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.detailBox}>
        <p className={styles.desc}>{book.desc}</p>
        <div className={styles.infoRow}>
          <span className={styles.label}>카테고리</span>
          <span className={styles.category}>{book.category}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.label}>출판사</span>
          <span className={styles.value}>{book.publisher}</span>
        </div>
        <div className={styles.rating}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={
                book.rating > index ? styles.ratingFilled : styles.notRated
              }
            >
              ⭐
            </span>
          ))}
        </div>
        <button className={styles.purchaseButton} onClick={handlePurchase}>
          구매하기
        </button>
      </div>
    </div>
  );
}
