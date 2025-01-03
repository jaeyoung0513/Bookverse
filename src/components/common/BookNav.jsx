import styles from "../../styles/BookNav.module.css";
import { useState } from "react";

export default function BookNav({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "전체",
    "문학/소설",
    "인문학",
    "사회과학",
    "자연과학",
    "기술/공학",
    "예술",
    "실용",
    "어학",
    "아동/청소년",
    "학술/전문",
  ];
  return (
    <div>
      <hr />
      <nav className={styles.categoryNav}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={
              selectedCategory === category ? styles.active : styles.notActive
            }
          >
            {category}
          </button>
        ))}
      </nav>
    </div>
  );
}
