import "./App.css";
import MainLayout from "./components/common/MainLayout";
import BookList from "./pages/BookList";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetail from "./components/book/BookDetail";
import FindUserInfo from "./pages/FindUserInfo";
import RegisterPage from "./pages/RegisterPage";
import Cart from "./components/user/Cart";
import MyProfile from "./components/user/MyProfile";
import PurchaseHistory from "./components/user/PurchaseHistory";
import WishList from "./components/user/WishList";
import MyMenu from "./pages/MyMenu";
import PurchaseForm from "./components/user/PurchaseForm";
import BookSearch from "./components/book/BookSearch";
import NavManagement from "./components/admin/NavManagement";
import BookManagement from "./components/admin/BookManagement";
import UserManagement from "./components/admin/UserManagement";
import SalesManagement from "./components/admin/SalesManagement";
import NotFound from "./pages/NotFound"; // 404 페이지 추가
import { Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 메인 레이아웃 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="booklist" element={<BookList />} />
          <Route path="booklist/:id" element={<BookDetail />} />
          <Route path="booklist/searchResult" element={<BookSearch />} />

          {/* MyMenu 관련 경로 */}
          <Route path="mymenu" element={<MyMenu />}>
            <Route
              index
              element={<Navigate to="/mymenu/myprofile" replace />}
            />
            <Route path="/mymenu/myprofile" element={<MyProfile />} />
            <Route path="cart" element={<Cart />} />
            <Route path="myprofile" element={<MyProfile />} />
            <Route path="purchasehistory" element={<PurchaseHistory />} />
            <Route path="wishlist" element={<WishList />} />
          </Route>
          <Route path="mymenu/cart/purchase" element={<PurchaseForm />} />
        </Route>

        {/* 인증 관련 페이지 */}
        <Route path="login" element={<LoginPage />} />
        <Route path="finduserinfo" element={<FindUserInfo />} />
        <Route path="register" element={<RegisterPage />} />

        {/* 관리자 관련 경로 */}
        <Route path="admin" element={<NavManagement />}>
          <Route index element={<BookManagement />} />
          <Route path="bookmanagement" element={<BookManagement />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="salesmanagement" element={<SalesManagement />} />
        </Route>

        {/* 404 처리 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
