import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/RegisterForm.module.css";
import axios from "axios";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [isUsernameChecked, setIsUsernameChecked] = useState(false); // 중복확인 여부를 저장하는 상태
  const navigate = useNavigate();

  const handleCheckUsername = async () => {
    if (!username) {
      alert("아이디를 입력해주세요");
      return;
    }
    try {
      console.log("아이디 중복확인 요청 시작");
      const response = await axios.get(
          `http://localhost:8080/api/user/isAvailableEmail/${username}`,
          { withCredentials: true }
      );
      console.log("아이디 중복확인 응답:", response.data);
      if (response.data === false) {
        alert("이미 사용중인 아이디입니다.");
        setIsUsernameChecked(false);
      } else if (response.data === true){
        alert("사용 가능한 아이디입니다.");
        setIsUsernameChecked(true);
      } else {
        alert("오류 : 서버에서 예상하지 못한 응답을 받았습니다.");
      }
    } catch (error) {
      console.error("아이디 중복확인 중 오류 발생:", error);
      alert("아이디 중복확인 중 오류가 발생했습니다.");
    }
  };

  const handleRegister = async (event) => {
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
      const joinData = {
        email: username,
        pw: password,
        name: name,
        birthdate: dob,
        addr: address,
        phone: phone,
      };
      try {
        console.log("회원가입 요청 시작");
        const response = await axios.post(
            `http://localhost:8080/api/user/join`,
            joinData,
            {
              withCredentials: true,
            }
        );
        console.log("회원가입 응답:", response.data);
        alert("회원가입 성공");
        navigate("/login");
      } catch (error) {
        console.error("회원가입 중 오류 발생:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    }
  };

  // 반환 JSX는 함수 내부에서 작성
  return (
      <div className={styles.container}>
        <Link to="/">
          <img src="/BookverseLogo.png" className={styles.logoImage} alt="" />
        </Link>
        <h1 className={styles.title}>회원가입</h1>
        <form onSubmit={handleRegister}>
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
            />
          </div>
          <button type="submit" className={styles.registerbtn}>
            회원가입
          </button>
        </form>
      </div>
  );
}
