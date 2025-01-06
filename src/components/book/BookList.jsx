import { useState } from "react";
import BookNav from "../common/BookNav";

export default function BookList() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  return (
    <div>
      <BookNav
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}
