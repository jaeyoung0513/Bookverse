import { NavLink, useNavigate } from "react-router-dom";
import style from "../../styles/Nav.module.css";
import { useState } from "react";
import SearchForm from "./SearchForm";

export default function Nav() {
  const [searchForm, setSearchForm] = useState("");
  const navigate = useNavigate(); // 페이지 네비게이션을 위해 useNavigate 훅 사용

  const handleSearch = (event) => {
    event.preventDefault(); // 페이지 리로드 방지
    console.log("Searching for:", searchForm);
    navigate(`/booklist/searchResult?query=${encodeURIComponent(searchForm)}`); // 검색어를 URL 파라미터로 포함하여 리다이렉트
  };

  return (
    <nav className={style.navLink}>
      <div className={style.logoContainer}>
        <NavLink to="/">
          <img
            src="/BookverseLogo.png"
            className={style.logoImage}
            alt="Bookverse Logo"
          />
        </NavLink>
      </div>
      <div className={style.linksContainer}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          추천
        </NavLink>
        <NavLink
          to="/booklist"
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          도서
        </NavLink>
      </div>
      <div className={style.rightContainer}>
        <SearchForm />
        <NavLink to="/mymenu/cart">
          <img
            src="/assets/cart.png"
            alt="장바구니"
            className={style.cartIcon}
          />
        </NavLink>
        <NavLink to="/login">
          <img
            src="/assets/userIcon.png"
            alt="로그인"
            className={style.userIcon}
          />
        </NavLink>
      </div>
    </nav>
  );
}
