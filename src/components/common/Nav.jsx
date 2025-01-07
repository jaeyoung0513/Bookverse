import { NavLink, useNavigate } from "react-router-dom";
import style from "../../styles/Nav.module.css";
import SearchForm from "./SearchForm";
import { useSelector } from "react-redux";

export default function Nav() {
  const isLogin = useSelector((state) => state.userInfo.loginFlag);
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    // 로그인 상태가 아닐 때는 로그인 페이지로 이동
    if (!isLogin) {
      navigate("/login");
    } else {
      // 로그인 상태일 때는 사용자 메뉴 페이지로 이동
      navigate("/mymenu");
    }
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
        <NavLink to={!isLogin ? "/login" : "/mymenu"}>
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
