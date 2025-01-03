import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import styles from "../../styles/MainLayout.module.css";

export default function MainLayout() {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
