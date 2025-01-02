import { useState } from "react";
import styles from "../../styles/FindById.module.css";
import { useNavigate } from "react-router-dom";

export default function FindById() {

    const [name, setName] = useState(''); 
    const [dob, setDob] = useState(''); 
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    const handleFindId = (event) => { 
    event.preventDefault();
        if(!name) {
            alert('이름을 입력해주세요');
        } else if (!dob) {
            alert('생년월일을 선택해주세요');
        } else if (!phone) {
            alert('전화번호를 입력해주세요');
        } else {
            alert('당신의 아이디는 User001입니다');
            navigate("/login");
        }
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>아이디 찾기</h1> 
            <form>
                <div className={styles.formGroupId}>
                    <label htmlFor="name">이름</label>
                    <input type="text" id="name" name="name" value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className={styles.input} required />
                </div>
                <div className={styles.formGroupId}>
                    <label htmlFor="dob">생년월일</label>
                    <input type="date" id="dob" name="dob" value={dob}
                        onChange={(e)=>setDob(e.target.value)}
                        className={styles.input} required />
                </div>
                <div className={styles.formGroupId}>
                    <label htmlFor="phone">전화번호</label>
                    <input type="tel" id="phone" name="phone" value={phone}
                        onChange={(e)=>setPhone(e.target.value)}
                        className={styles.input} required />
                </div>
                <button type="submit" className={styles.FindIdBtn} onClick={handleFindId}>아이디 찾기</button>
            </form>
        </div>
    );
}