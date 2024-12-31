import FindById from "../components/auth/FindById";
import FindByPassword from "../components/auth/FindByPassword";
import styles from "../styles/FindUserInfo.module.css";

export default function FindUserInfo() {
    return ( 
        <div className={styles.FindContainer}>
            <div className={styles.FindById}>
                <FindById />
            </div>
            <div className={styles.FindByPassword}>
                <FindByPassword />
            </div>
        </div>
    );
}