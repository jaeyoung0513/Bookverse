import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchForm from "../common/SearchForm";
import style from "../../styles/Nav.module.css";

export default function NavManagement() {

    const [searchForm, setSearchForm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault(); // 페이지 리로드 방지
        console.log("Searching for:", searchForm);
        navigate(`/booklist/searchResult?query=${encodeURIComponent(searchForm)}`); // 검색어를 URL 파라미터로 포함하여 리다이렉트
      };

    return(
    <nav className={style.admin_navLink}>
        <div className={style.admin_logoContainer}>
        <NavLink to="/">
          <img
            src="/BookverseLogo.png"
            className={style.admin_logoImage}
            alt="Bookverse Logo"
          />
        </NavLink>
      </div>
      <div className={style.admin_linksContainer}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          도서
        </NavLink>
        <NavLink
          to="/booklist"
          className={({ isActive }) => (isActive ? style.active : undefined)}
        >
          회원
        </NavLink>
      </div>
      <div className={style.admin_rightContainer}>
        <SearchForm />
        <NavLink to="/mymenu/cart">
          <img
            src="/assets/cart.png"
            alt="장바구니"
            className={style.admin_cartIcon}
          />
        </NavLink>
        <NavLink to="/login">
          <img
            src="/assets/userIcon.png"
            alt="로그인"
            className={style.admin_userIcon}
          />
        </NavLink>
      </div>
    </nav>
);
}