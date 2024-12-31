import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import style from "../../styles/MainLayout.module.css";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className={style.child}>
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
