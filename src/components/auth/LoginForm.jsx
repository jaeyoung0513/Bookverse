import styles from "../../styles/LoginForm.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    if (location.state && location.state.userId) {
      setEmail(location.state.userId);
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = { email, password };
    try {
      const response = await axios.post("https://localhost:8080/login", loginData);
      console.log("로그인 성공:", response.data); // 로그인 성공 후 MainLayout으로 전환
      navigate.push("/");
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <form>
      <div className={styles.container}>
        <Link to="/">
          <img src="/BookverseLogo.png" className={styles.logoImage} alt="" />
        </Link>
        <input
          type="email"
          placeholder="아이디 (email)"
          className={styles.input}
        />
        <input
          type="password"
          placeholder="비밀번호"
          className={styles.input}
        />
        <button className={styles.button}>로그인</button>
        <div className={styles.orContainer}>
          <hr className={styles.line} />
          <span className={styles.orText}>또는</span>
          <hr className={styles.line} />
        </div>
        <button className={styles.naverButton}>네이버 로그인</button>
        <div className={styles.linkContainer}>
          <a href="/register" className={styles.link}>
            회원가입
          </a>
          <a href="/finduserinfo" className={styles.link}>
            아이디/비밀번호 찾기
          </a>
        </div>
      </div>
    </form>
  );
}
