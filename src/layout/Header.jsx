import React from "react";
import style from "../styles/Header.module.css";

const Header = () => (
  <header>
    <h1 className={style.title}>bookverse 추천 도서
    <input type="text" placeholder="검색창" />
    </h1>
  </header>
);

export default Header;