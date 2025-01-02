import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/RegisterForm.module.css";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false); // 중복확인 여부를 저장하는 상태

  const handleCheckUsername = () => {
    if (!username) {
      alert("아이디를 입력해주세요");
    } else {
      alert("사용가능한 아이디입니다.");
      setIsUsernameChecked(true);
    }
  };

  const handleRegister = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    if (!username) {
      alert("아이디를 입력해주세요");
    } else if (!password) {
      alert("비밀번호를 입력해주세요");
    } else if (!name) {
      alert("이름을 입력해주세요");
    } else if (!dob) {
      alert("생년월일을 선택해주세요");
    } else if (!address) {
      alert("주소를 입력해주세요");
    } else if (!phone) {
      alert("전화번호를 입력해주세요");
    } else if (!isUsernameChecked) {
      alert("아이디 중복확인을 진행해주세요");
    } else {
      alert("회원가입이 완료되었습니다.");
      window.location.href = "/login";
    }
  };
  return (
    <div className={styles.container}>
      <Link to="/">
        <img src="/BookverseLogo.png" className={styles.logoImage} alt="" />
      </Link>
      <h1 className={styles.title}>회원가입</h1>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="username">아이디</label>
          <div className={styles.usernameContainer}>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.usernameInput}
              required
            />
            <button
              type="button"
              className={styles.checkbtn}
              onClick={handleCheckUsername}
            >
              중복확인
            </button>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dob">생년월일</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">주소</label>
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">전화번호</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={styles.input}
            required
          />{" "}
        </div>
        <button
          type="submit"
          className={styles.registerbtn}
          onClick={handleRegister}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}
