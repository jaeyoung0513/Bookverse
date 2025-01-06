import React, { useState } from 'react';
import styles from "../../styles/MyProfile.module.css";

const MyProfile = () => {
    const [profile, setProfile] = useState({
        id: 'user123',
        password: '',
        name: '이승호',
        birthdate: '1990-01-01',
        address: '서울특별시',
        phone: '010-1234-5678',
    });

    const [isEditable, setIsEditable] = useState({
        password: false,
        name: false,
        birthdate: false,
        address: false,
        phone: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSave = () => {
        console.log('Saved profile:', profile);
        alert('정보가 저장되었습니다.');
    };

    const handleEdit =(field) =>{
        setIsEditable((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <div className={styles.profileContainer}>
            <h1 className={styles.profileTitle}>내 정보</h1>
            <form onSubmit={(e) => e.preventDefault()} className={styles.profileForm}>
                <label className={styles.profileIdLable}>
                    아이디
                    <input className={styles.idinfo}
                        type="text"
                        name="id"
                        value={profile.id}
                        readOnly
                    />
                </label>
                <label className={styles.profilePwLable}>
                    비밀번호
                    <input className={styles.pwinfo}
                           type="password"
                           name="password"
                           value={profile.password}
                           onChange={handleChange}
                           readOnly={!isEditable.password}
                    />
                    <span className={styles.editIcon} onClick={() => handleEdit('password')}>✏️</span>
                </label>
                <label className={styles.profileNameLable}>
                    이름
                    <input className={styles.nameinfo}
                           type="text"
                           name="name"
                           value={profile.name}
                           onChange={handleChange}
                           readOnly={!isEditable.name}
                    />
                    <span className={styles.editIcon} onClick={() => handleEdit('name')}>✏️</span>
                </label>
                <label className={styles.profileDateLable}>
                    생년월일
                    <input className={styles.dateinfo}
                           type="date"
                           name="birthdate"
                           value={profile.birthdate}
                           onChange={handleChange}
                           readOnly={!isEditable.birthdate}
                    />
                    <span className={styles.editIcon} onClick={() => handleEdit('birthdate')}>✏️</span>
                </label>
                <label className={styles.profileAddrLable}>
                    주소
                    <input className={styles.addrinfo}
                           type="text"
                           name="address"
                           value={profile.address}
                           onChange={handleChange}
                           readOnly={!isEditable.address}
                    />
                    <span className={styles.editIcon} onClick={() => handleEdit('address')}>✏️</span>
                </label>
                <label className={styles.profileTelLable}>
                    전화번호
                    <input className={styles.telinfo}
                           type="tel"
                           name="phone"
                           value={profile.phone}
                           onChange={handleChange}
                           readOnly={!isEditable.phone}
                    />
                    <span className={styles.editIcon} onClick={() => handleEdit('phone')}>✏️</span>
                </label>
                <button className={styles.profilbtn} type="button" onClick={handleSave}>
                    수정
                </button>
            </form>
        </div>
    );
};

export default MyProfile;

