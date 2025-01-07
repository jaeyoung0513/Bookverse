import React, { useEffect, useState } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/HomePage.css";
import BookSwiper from "../components/book/BookSwiper";
import errorDisplay from "../api/errorDisplay";
import CategoryBooks from "../components/book/CategoryBooks";

export default function HomePage() {
  const [popularBooks, setPopularBooks] = useState([]);

  // 데이터 fetch 함수
  const fetchData = async () => {
    try {
      const popularResponse = await axios.get(
        "http://localhost:8080/api/purchase/top/all",
        { withCredentials: true }
      );
      setPopularBooks(popularResponse.data);
    } catch (error) {
      errorDisplay(error);
      console.error("Error fetching books:", error);
    }
  };

  // 마운트될 때마다 데이터를 다시 가져옴
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="swiper-container">
      <h2 className="title">인기도서</h2>
      <BookSwiper books={popularBooks} />
      <h2 className="title">문학/소설</h2>
      <CategoryBooks category="문학/소설" />
      <h2 className="title3">인문학</h2>
      <CategoryBooks category="인문학" />
      <h2 className="title">사회과학</h2>
      <CategoryBooks category="사회과학" />
      <h2 className="title">자연과학</h2>
      <CategoryBooks category="자연과학" />
      <h2 className="title">기술/공학</h2>
      <CategoryBooks category="기술/공학" />
      <h2 className="title2">예술</h2>
      <CategoryBooks category="예술" />
      <h2 className="title2">실용</h2>
      <CategoryBooks category="실용" />
      <h2 className="title2">어학</h2>
      <CategoryBooks category="어학" />
      <h2 className="title5">아동/청소년</h2>
      <CategoryBooks category="아동/청소년" />
      <h2 className="title">학술/전문</h2>
      <CategoryBooks category="학술/전문서적" />
    </div>
  );
}
