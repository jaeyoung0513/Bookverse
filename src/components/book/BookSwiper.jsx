import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function BookSwiper({ books }) {
  return (
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
      {books.map((book) => (
        <SwiperSlide key={book.book_id}>
          <div>
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.price}원</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
