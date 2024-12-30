import style from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div>
        서울 서초구 강남대로 405 통영빌딩 8층 |{" "}
        <span>공동대표이사: 류재영, 여찬엽, 안희연, 이승호</span>
      </div>
      <br />
      <div>
        고객지원: <a href="/support">도움말 센터</a> |{" "}
        <a href="/faq">자주 묻는 질문</a>
      </div>
      <div>
        <a
          href="https://www.facebook.com/Bookverse"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>{" "}
        |{" "}
        <a
          href="https://www.twitter.com/Bookverse"
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>{" "}
        |{" "}
        <a
          href="https://www.instagram.com/Bookverse"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>{" "}
        | <a href="/terms">이용 약관</a> | <a href="/sitemap">사이트맵</a>
      </div>
      <div>
        © 2024 Bookverse | <a href="/privacy">개인정보 처리방침</a>
      </div>
    </footer>
  );
}
