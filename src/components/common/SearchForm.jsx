import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/SearchForm.module.css";

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showRecentSearches, setShowRecentSearches] = useState(false);
  const [isSavingSearches, setIsSavingSearches] = useState(true);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    setRecentSearches(searches);
  }, []);

  const handleSearch = (event, search = searchTerm) => {
    event.preventDefault();
    if (!search) return;
    if (isSavingSearches) {
      // 현재 검색어와 동일한 검색어가 있는지 검사
      const existingIndex = recentSearches.findIndex(
        (item) => item.term === search
      );
      let updatedSearches;
      if (existingIndex > -1) {
        // 검색어가 이미 존재하면, 날짜를 업데이트하고, 배열의 맨 앞으로 이동
        const existingSearch = {
          ...recentSearches[existingIndex],
          date: new Date().toISOString(),
        };
        updatedSearches = [
          existingSearch,
          ...recentSearches.filter((_, index) => index !== existingIndex),
        ];
      } else {
        // 새 검색어는 목록의 맨 앞에 추가
        const newSearch = { term: search, date: new Date().toISOString() };
        updatedSearches = [newSearch, ...recentSearches].slice(0, 5);
      }
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
    }
    navigate(`/booklist/searchResult?query=${encodeURIComponent(search)}`);
    setSearchTerm("");
  };

  const handleDeleteSearch = (event, index) => {
    event.stopPropagation(); // Prevent click event from bubbling up to li
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
  };

  const toggleSaveSearches = () => {
    setIsSavingSearches(!isSavingSearches);
  };

  const handleFocus = () => {
    setShowRecentSearches(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowRecentSearches(false), 200);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className={style.searchForm}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="제목, 작가를 입력하세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={style.searchInput}
        />
        <button type="submit" className={style.searchButton}>
          <img
            src="/assets/searchIcon.png"
            alt="검색"
            className={style.searchIcon}
          />
        </button>
        {showRecentSearches && recentSearches.length > 0 && (
          <ul className={style.recentSearches}>
            <li>최근 검색어</li>
            <hr />
            {recentSearches.map((search, index) => (
              <li
                key={index}
                className={style.recentSearch}
                onClick={(e) => handleSearch(e, search.term)}
              >
                {search.term}{" "}
                <span className={style.searchDate}>
                  {new Date(search.date).toLocaleDateString()}
                </span>
                <button
                  onClick={(e) => handleDeleteSearch(e, index)}
                  className={style.deleteButton}
                >
                  X
                </button>
              </li>
            ))}
            <li className={style.toggleLi}>
              <button
                onClick={toggleSaveSearches}
                className={style.toggleButton}
              >
                {isSavingSearches ? "저장기능 끄기" : "저장기능 켜기"}
              </button>
            </li>
          </ul>
        )}
      </form>
    </div>
  );
}

export default SearchForm;
