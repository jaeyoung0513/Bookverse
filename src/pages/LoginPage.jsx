import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () =>{
  <LoginForm />

return (
    <div className={styles.container}>
      <h1 className={styles.title}><Link to="/">Bookverse</Link></h1>
      <input type="email" placeholder="이메일" className={styles.input} />
      <input type="password" placeholder="비밀번호" className={styles.input} /> 
      <button className={styles.button}>로그인</button> 
      <div className={styles.orContainer}> 
        <hr className={styles.line} /> 
        <span className={styles.orText}>또는</span> 
        <hr className={styles.line} /> 
      </div> 
      <button className={styles.naverButton}>네이버 로그인</button> 
      <div className={styles.linkContainer}> 
        <a href="/register" className={styles.link}>회원가입</a> 
        <a href="/finduserinfo" className={styles.link}>아이디/비밀번호 찾기</a>
      </div> 
    </div>
  );
}

export default LoginPage;
