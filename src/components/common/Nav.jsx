import { NavLink } from "react-router-dom";
import style from "../../styles/Nav.module.css";
import { useState } from "react";

export default function Nav() {
  const [searchForm, setSearchForm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault(); // 페이지 리로드 방지
    console.log("Searching for:", searchForm);
    // 검색 로직을 여기에 구현, 예: 페이지 리다이렉트 또는 API 호출
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
        <NavLink to="/" exact activeClassName={style.active}>
          추천
        </NavLink>
        <NavLink to="/booklist" activeClassName={style.active}>
          도서
        </NavLink>
      </div>
      <div className={style.rightContainer}>
        <form className={style.searchForm} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="제목, 작가를 입력하세요."
            value={searchForm}
            onChange={(e) => setSearchForm(e.target.value)}
            className={style.searchInput}
          />
          <button type="submit" className={style.searchButton}>
            <img
              src="/assets/searchIcon.png"
              alt="검색"
              className={style.searchIcon}
            />
          </button>
        </form>
        <NavLink to="/cart">
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
