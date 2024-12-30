import React from "react";
import style from "../../styles/Header.module.css";
import Nav from "./Nav";

const Header = () => (
  <header className={style.header}>
    <Nav />
  </header>
);

export default Header;
