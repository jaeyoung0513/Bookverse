import "./App.css";
import MainLayout from "./components/common/MainLayout";
import BookList from "./components/book/BookList";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetail from "./components/book/BookDetail";
import FindUserInfo from "./pages/FindUserInfo";
import RegisterPage from "./pages/RegisterPage";
import Cart from "./components/user/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/bookdetail" element={<BookDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/finduserinfo" element={<FindUserInfo />}>
        </Route>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;