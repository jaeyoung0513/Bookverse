import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiClient from "../../api/axiosInstance";
import errorDisplay from "../../api/errorDisplay";
import styles from "../../styles/Review.module.css";

export default function Review({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.userInfo.user);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/api/review/book/${bookId}`);
        setReviews(response.data);
      } catch (error) {
        errorDisplay(error);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) fetchReviews();
  }, [bookId]);

  const handleDelete = async (reviewId) => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    try {
      await apiClient.delete(`/api/review/delete/${reviewId}`, {
        params: { userId: user.user_id },
      });
      setReviews(reviews.filter((review) => review.reviewId !== reviewId));
    } catch (error) {
      errorDisplay(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    try {
      const response = await apiClient.post("/api/review/add", {
        content: newReview,
        bookId,
        userId: user.user_id,
      });
      setReviews([response.data, ...reviews]);
      setNewReview("");
    } catch (error) {
      errorDisplay(error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingContent.trim()) {
      alert("수정 내용을 입력해주세요.");
      return;
    }
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }
    try {
      const response = await apiClient.put(
        `/api/review/edit/${editingReviewId}`,
        {
          content: editingContent,
          userId: user.user_id,
          bookId: bookId,
        }
      );
      setReviews(
        reviews.map((review) =>
          review.reviewId === editingReviewId
            ? { ...review, content: response.data.content }
            : review
        )
      );
      setEditingReviewId(null);
      setEditingContent("");
    } catch (error) {
      errorDisplay(error);
    }
  };

  if (loading) {
    return <div className={styles.loading}>리뷰를 불러오는 중입니다...</div>;
  }

  return (
    <div className={styles.reviewContainer}>
      {user && (
        <form className={styles.reviewForm} onSubmit={handleSubmit}>
          <textarea
            className={styles.reviewTextarea}
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="리뷰를 작성해주세요."
          ></textarea>
          <button className={styles.reviewSubmitBtn} type="submit">
            등록
          </button>
        </form>
      )}

      <div className={styles.reviewList}>
        {reviews.length === 0 ? (
          <span className={styles.noReviews}>
            현재 리뷰 수 {reviews.length}
          </span>
        ) : (
          reviews.map((review) => (
            <div key={review.reviewId} className={styles.reviewItem}>
              <div className={styles.reviewContentWrapper}>
                <span className={styles.reviewName}>{review.name} &nbsp;</span>
                {editingReviewId === review.reviewId ? (
                  <form
                    className={styles.reviewEditForm}
                    onSubmit={handleEditSubmit}
                  >
                    <textarea
                      className={styles.reviewEditTextarea}
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      placeholder="리뷰를 수정해주세요."
                    ></textarea>
                    <div className={styles.editActions}>
                      <button className={styles.reviewEditBtn} type="submit">
                        완료
                      </button>
                      <button
                        className={styles.reviewCancelBtn}
                        type="button"
                        onClick={() => {
                          setEditingReviewId(null);
                          setEditingContent("");
                        }}
                      >
                        취소
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className={styles.reviewContent}>{review.content}</p>
                )}
              </div>
              {!editingReviewId && user?.name === review.name && (
                <div className={styles.reviewActions}>
                  <button
                    className={styles.reviewEditBtn}
                    onClick={() => {
                      setEditingReviewId(review.reviewId);
                      setEditingContent(review.content);
                    }}
                  >
                    수정
                  </button>
                  <button
                    className={styles.reviewDeleteBtn}
                    onClick={() => handleDelete(review.reviewId)}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
