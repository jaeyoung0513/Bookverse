import FindById from "../components/auth/FindById";
import FindByPassword from "../components/auth/FindByPassword";
import styles from "../styles/FindUserInfo.module.css";
import { Link } from "react-router-dom";

export default function FindUserInfo() {
    return ( 
    <>
        <div className={styles.FindContainer}>
            <h3 className={styles.title}>
                <Link to="/" className={styles.title}>Bookverse</Link></h3>
            <div className={styles.FindById}>
                <FindById />
            </div>
            <div className={styles.FindByPassword}>
                <FindByPassword />
            </div>
        </div>
    </>
    );
}