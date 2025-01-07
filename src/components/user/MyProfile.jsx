import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo, clearUserInfo } from "../../redux/userInfoSlice";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/axiosInstance";
import styles from "../../styles/MyProfile.module.css";

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInfo.user);

  const [myProfile, setMyProfile] = useState(user || {});
  const [confirmPw, setConfirmPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false); // 리다이렉트 상태 추가

  useEffect(() => {
    setMyProfile(user || {});
  }, [user]);

  useEffect(() => {
    if (redirectToLogin) {
      navigate("/login");
    }
  }, [redirectToLogin, navigate]); // `navigate` 호출은 useEffect 내부에서 처리

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (!myProfile.user_id) {
        alert("사용자 ID를 찾을 수 없습니다.");
        return;
      }

      if (myProfile.pw && !validatePassword(myProfile.pw)) {
        setPwError(
          "비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다."
        );
        return;
      }

      if (myProfile.pw && myProfile.pw !== confirmPw) {
        setPwError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        return;
      }

      const profileToUpdate = { ...myProfile };
      if (!myProfile.pw) {
        delete profileToUpdate.pw;
      }

      await dispatch(updateUserInfo(profileToUpdate));
      alert("프로필 정보가 성공적으로 수정되었습니다.");

      if (window.confirm("다시 로그인하시겠습니까?")) {
        try {
          await apiClient.post("/api/user/logout");
          dispatch(clearUserInfo());
          setRedirectToLogin(true); // navigate 대신 상태 업데이트
        } catch (error) {
          console.error("로그아웃 실패:", error);
          alert("로그아웃 처리 중 오류가 발생했습니다.");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("프로필 업데이트 중 오류:", error);
      alert("프로필 업데이트 실패.");
    }
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  return (
    <div className={styles.profileContainer}>
      <h6 className={styles.profileTitle}>계정 정보</h6>
      <form onSubmit={(e) => e.preventDefault()} className={styles.profileForm}>
        <label className={styles.profileIdLabel}>
          이메일
          <input
            className={styles.idInfo}
            type="text"
            name="email"
            value={myProfile.email || ""}
            readOnly
          />
        </label>
        <label className={styles.profilePwLabel}>
          비밀번호
          <input
            className={styles.pwInfo}
            type="password"
            name="pw"
            value={myProfile.pw || ""}
            onChange={handleChange}
          />
        </label>
        <label className={styles.profilePwLabel}>
          비밀번호 확인
          <input
            className={styles.pwInfo}
            type="password"
            name="confirmPw"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
          />
        </label>
        {pwError && <p className={styles.error}>{pwError}</p>}
        <label className={styles.profileNameLabel}>
          이름
          <input
            className={styles.nameInfo}
            type="text"
            name="name"
            value={myProfile.name || ""}
            onChange={handleChange}
          />
        </label>
        <label className={styles.profileDateLabel}>
          생년월일
          <input
            className={styles.dateInfo}
            type="text"
            name="birthdate"
            value={myProfile.birthdate || ""}
            onChange={handleChange}
          />
        </label>
        <label className={styles.profileAddrLabel}>
          주소
          <input
            className={styles.addrInfo}
            type="text"
            name="addr"
            value={myProfile.addr || ""}
            onChange={handleChange}
          />
        </label>
        <label className={styles.profileTelLabel}>
          전화번호
          <input
            className={styles.telInfo}
            type="tel"
            name="phone"
            value={myProfile.phone || ""}
            onChange={handleChange}
          />
        </label>
        <button
          className={styles.profileBtn}
          type="button"
          onClick={handleSave}
        >
          수정
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
