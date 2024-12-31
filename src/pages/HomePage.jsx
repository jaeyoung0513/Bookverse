import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/HomePage.css";

export default function HomePage() {
  useEffect(() => {
    const svgs = document.querySelectorAll(
      ".swiper-button-prev, .swiper-button-next"
    );
    svgs.forEach((svg) => {
      svg.setAttribute("width", "16");
      svg.setAttribute("height", "16");
    });
  }, []);

  return (
    <div className="swiper-container">
      <h2 className="title">인기도서</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        className="bestSeller"
        navigation
        pagination={{
          clickable: true,
          type: "fraction", // 숫자 형식의 페이지네이션으로 설정
        }}
        spaceBetween={0}
        slidesPerView={5}
        breakpoints={{
          440: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }}
      >
        <SwiperSlide>
          <img src="/assets/amond.jpeg" alt="Amond" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/dontsaygoodbye.jpeg" alt="Don't Say Goodbye" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/theboywillcome.jpeg" alt="The Boy Will Come" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/vegetarian.jpeg" alt="Vegetarian" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/dontsaygoodbye.jpeg" alt="Don't Say Goodbye" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/vegetarian.jpeg" alt="Vegetarian" />
        </SwiperSlide>
      </Swiper>

      <h2 className="title">문학/소설</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        className="bestSeller"
        navigation
        pagination={{
          clickable: true,
          type: "fraction", // 숫자 형식의 페이지네이션으로 설정
        }}
        spaceBetween={0}
        slidesPerView={5}
        breakpoints={{
          440: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }}
      >
        <SwiperSlide>
          <img src="/assets/vegetarian.jpeg" alt="Vegetarian" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/amond.jpeg" alt="Amond" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/dontsaygoodbye.jpeg" alt="Don't Say Goodbye" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/theboywillcome.jpeg" alt="The Boy Will Come" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/vegetarian.jpeg" alt="Vegetarian" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/assets/dontsaygoodbye.jpeg" alt="Don't Say Goodbye" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
