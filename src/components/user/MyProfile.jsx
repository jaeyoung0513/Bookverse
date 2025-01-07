import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/MyProfile.module.css";
import { updateUserInfo } from "../../redux/userInfoSlice";

const MyProfile = () => {
  const dispatch = useDispatch();
  // 리덕스 스토어에서 현재 로그인한 사용자의 이메일을 통해 프로필 정보를 불러옵니다.
  const email = useSelector((state) => state.userInfo.email); // 로그인 후 저장된 이메일
  console.log(email);
  const profile = useSelector((state) => state.userInfo.entities[email] || {});

  const [myProfile, setMyProfile] = useState(profile);

  useEffect(() => {
    setMyProfile(profile); // 스토어에서 프로필 정보가 업데이트 될 때 로컬 상태도 업데이트
  }, [profile]);

  const [isEditable, setIsEditable] = useState({
    password: false,
    name: false,
    birthdate: false,
    address: false,
    phone: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (field) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    console.log("Saved profile:", myProfile);
    dispatch(updateUserInfo(myProfile));
  };

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileTitle}>내 정보</h1>
      <form onSubmit={(e) => e.preventDefault()} className={styles.profileForm}>
        <label className={styles.profileIdLabel}>
          아이디
          <input
            className={styles.idInfo}
            type="text"
            name="id"
            value={email || ""}
            readOnly
          />
        </label>
        <label className={styles.profilePwLabel}>
          비밀번호
          <input
            className={styles.pwInfo}
            type="password"
            name="password"
            value={myProfile.password || ""}
            onChange={handleChange}
            readOnly={!isEditable.password}
          />
          <span
            className={styles.editIcon}
            onClick={() => handleEdit("password")}
          >
            ✏️
          </span>
        </label>
        <label className={styles.profileNameLabel}>
          이름
          <input
            className={styles.nameInfo}
            type="text"
            name="name"
            value={myProfile.name || ""}
            onChange={handleChange}
            readOnly={!isEditable.name}
          />
          <span className={styles.editIcon} onClick={() => handleEdit("name")}>
            ✏️
          </span>
        </label>
        <label className={styles.profileDateLabel}>
          생년월일
          <input
            className={styles.dateInfo}
            type="date"
            name="birthdate"
            value={myProfile.birthdate || ""}
            onChange={handleChange}
            readOnly={!isEditable.birthdate}
          />
          <span
            className={styles.editIcon}
            onClick={() => handleEdit("birthdate")}
          >
            ✏️
          </span>
        </label>
        <label className={styles.profileAddrLabel}>
          주소
          <input
            className={styles.addrInfo}
            type="text"
            name="address"
            value={myProfile.address || ""}
            onChange={handleChange}
            readOnly={!isEditable.address}
          />
          <span
            className={styles.editIcon}
            onClick={() => handleEdit("address")}
          >
            ✏️
          </span>
        </label>
        <label className={styles.profileTelLabel}>
          전화번호
          <input
            className={styles.telInfo}
            type="tel"
            name="phone"
            value={myProfile.phone || ""}
            onChange={handleChange}
            readOnly={!isEditable.phone}
          />
          <span className={styles.editIcon} onClick={() => handleEdit("phone")}>
            ✏️
          </span>
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
