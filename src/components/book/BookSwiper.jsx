import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/BookSwiper.css";

export default function BookSwiper({ books }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={30}
      slidesPerView={5}
      navigation
      pagination={{ clickable: true }}
    >
      {books.map((book) => (
        <SwiperSlide key={book.bookId}>
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
