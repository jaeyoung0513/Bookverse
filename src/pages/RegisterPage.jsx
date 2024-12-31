import styles from "../styles/RegisterPage.module.css";

const RegisterPage = () => {
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>회원가입</h1> 
            <form> 
                <div className={styles.formGroup}> 
                    <label htmlFor="username">아이디</label> 
                    <input type="text" id="username" name="username" required /> 
                </div> 
                <div className={styles.formGroup}> 
                    <label htmlFor="password">비밀번호</label> 
                    <input type="password" id="password" name="password" required /> 
                </div> 
                <div className={styles.formGroup}> 
                    <label htmlFor="name">이름</label> 
                    <input type="text" id="name" name="name" required /> 
                </div> 
                <div className={styles.formGroup}> 
                <label htmlFor="dob">생년월일</label>
                <input type="date" id="dob" name="dob" required /> 
                </div> 
                <div className={styles.formGroup}> 
                <label htmlFor="address">주소</label> 
                <input type="text" id="address" name="address" required /> 
                </div> 
                <div className={styles.formGroup}> 
                <label htmlFor="phone">전화번호</label> 
                <input type="tel" id="phone" name="phone" required /> </div> 
                <button type="submit" className={styles.button}>회원가입</button> 
            </form> 
        </div>
    );
};

export default RegisterPage;