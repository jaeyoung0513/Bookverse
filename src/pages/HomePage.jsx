import React, { useEffect, useState } from "react";
import axios from "axios"; // axios 임포트
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/HomePage.css";
import BookSwiper from "../components/book/BookSwiper";
import errorDisplay from "../api/errorDisplay";

export default function HomePage() {
  const [popularBooks, setPopularBooks] = useState([]);
  const [categoryBooks, setCategoryBooks] = useState([]);

  // 데이터 fetch 함수
  const fetchData = async () => {
    try {
      // 인기 도서 요청
      const popularResponse = await axios.get(
        "http://localhost:8080/api/popular-books",
        { withCredentials: true }
      );
      setPopularBooks(popularResponse.data);

      // 카테고리별 인기 도서 요청
      const categoryResponse = await axios.get(
        "http://localhost:8080/api/category-popular-books",
        { withCredentials: true }
      );
      setCategoryBooks(categoryResponse.data);
    } catch (error) {
      errorDisplay(error);
      console.error("Error fetching books:", error);
    }
  };

  // 컴포넌트 렌더링 시 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="swiper-container">
      <h1>인기도서</h1>
      <BookSwiper books={popularBooks} />

      {/* 카테고리별 도서 출력 */}
      {categoryBooks.map((category, index) => (
        <div key={index}>
          <h2>{category.category}</h2>
          <BookSwiper books={category.books} />
        </div>
      ))}
    </div>
  );
}
