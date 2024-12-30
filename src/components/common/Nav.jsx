import { Link } from "react-router-dom";
import style from "../../styles/Nav.module.css";
import Search from "./Search";

export default function Nav() {
  return (
    <nav className={style.navLink}>
      <Link to="/">
        <img src="/BookverseLogo.png" className={style.logoImage} alt="" />
      </Link>{" "}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/">추천</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="/booklist">도서</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Search />
    </nav>
  );
}
