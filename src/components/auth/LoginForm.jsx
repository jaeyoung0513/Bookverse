import styles from "../../styles/LoginForm.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setLoginFlag,
  saveJwtToken,
  setRole,
  addUserInfo,
} from "../../redux/userInfoSlice";
import apiClient from "../../api/axiosInstance";
import errorDisplay from "../../api/errorDisplay";
import axios from "axios";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.userId) {
      setEmail(location.state.userId);
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.append("username", email);
    params.append("password", password);

    try {
      const response = await apiClient.post("/api/user/login", params, {
        withCredentials: true,
      });
      const token = response.headers["authorization"];
      const role = response.data.role; // 역할이 데이터 객체에 포함되어 있는지 확인 필요
      dispatch(setLoginFlag(true));
      dispatch(saveJwtToken(token));
      dispatch(setRole(role));
      dispatch(addUserInfo(response.data));
      navigate("/");
    } catch (error) {
      errorDisplay(error);
      console.error(
        "로그인 실패:",
        error.response ? error.response.data : "서버 연결 실패"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <Link to="/">
          <img
            src="/BookverseLogo.png"
            className={styles.logoImage}
            alt="Bookverse logo"
          />
        </Link>
        <input
          type="email"
          placeholder="아이디 (email)"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 이메일 입력값 상태에 반영
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력값 상태에 반영
          required
        />
        <button type="submit" className={styles.button}>
          로그인
        </button>
        <div className={styles.orContainer}>
          <hr className={styles.line} />
        </div>
        <button className={styles.naverButton}>네이버 로그인</button>
        <div className={styles.linkContainer}>
          <Link to="/register" className={styles.link}>
            회원가입
          </Link>
          <Link to="/finduserinfo" className={styles.link}>
            아이디/비밀번호 찾기
          </Link>
        </div>
      </div>
    </form>
  );
}
