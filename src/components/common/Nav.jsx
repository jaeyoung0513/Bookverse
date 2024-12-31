import { Link } from "react-router-dom";
import style from "../../styles/Nav.module.css";
import { useState } from "react";

export default function Nav() {
  const [searchForm, setSearchForm] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchForm);
    // 검색 로직을 여기에 구현
  };

  return (
    <nav className={style.navLink}>
      <div className={style.logoContainer}>
        <Link to="/">
          <img src="/BookverseLogo.png" className={style.logoImage} alt="" />
        </Link>
      </div>
      <div className={style.linksContainer}>
        <Link to="/">추천</Link>
        <Link to="/booklist">도서</Link>
      </div>
      <div className={style.rightContainer}>
        <form className={style.searchForm} onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="제목, 작가를 입력하세요."
            value={searchForm}
            onChange={(e) => setSearchForm(e.target.value)}
          />
          <img
            src="/assets/searchIcon.png"
            alt="검색"
            className={style.searchIcon}
            onClick={handleSearch}
          />
        </form>
        <Link to="/cart">
          <img src="/assets/cart.png" alt="User" className={style.cartIcon} />
        </Link>
        <Link to="/login">
          <img
            src="/assets/userIcon.png"
            alt="User"
            className={style.userIcon}
          />
        </Link>
      </div>
    </nav>
  );
}
