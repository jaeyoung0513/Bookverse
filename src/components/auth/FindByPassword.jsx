import { useState } from "react";
import styles from "../../styles/FindByPassword.module.css";
import { useNavigate } from "react-router-dom";

export default function FindByPassword() {
    
    const [email, setEmail] = useState('');
    const [name, setName] = useState(''); 
    const [dob, setDob] = useState(''); 
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    const handleFindPassword = (event) => { 
    event.preventDefault();
        if(!email) {
            alert('이메일을 입력해주세요');
        } else if (!name) {
            alert('이름을 입력해주세요');
        } else if (!dob) {
            alert('생년월일을 선택해주세요');
        } else if (!phone) {
            alert('전화번호를 입력해주세요');
        } else {
            alert('해당 이메일로 임시 비밀번호를 보내드렸습니다');
            navigate("/login");
        }
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>비밀번호 찾기</h1> 
            <form>
                <div className={styles.formGroupPw}>
                    <label htmlFor="email">이메일</label>
                    <input type="text" id="email" name="email" value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className={styles.input} required />
                </div>
                <div className={styles.formGroupPw}>
                    <label htmlFor="name">이름</label>
                    <input type="text" id="name" name="name" value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className={styles.input} required />
                </div>
                <div className={styles.formGroupPw}>
                    <label htmlFor="dob">생년월일</label>
                    <input type="date" id="dob" name="dob" value={dob}
                        onChange={(e)=>setDob(e.target.value)}
                        className={styles.input} required />
                </div>
                <div className={styles.formGroupPw}>
                    <label htmlFor="phone">전화번호</label>
                    <input type="tel" id="phone" name="phone" value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        className={styles.input} required />
                </div>
                <button type="submit" className={styles.FindPasswordBtn} onClick={handleFindPassword}>비밀번호 찾기</button>
            </form>
        </div>
    );
}