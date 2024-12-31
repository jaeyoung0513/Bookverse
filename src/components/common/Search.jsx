import { useState } from "react";
import style from "../../styles/Search.module.css";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={style.searchTerm}>
      <input
        type="text"
        placeholder="제목, 작가를 입력하세요."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
