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
import MyProfile from "./components/user/MyProfile";
import PurchaseHistory from "./components/user/PurchaseHistory";
import WishList from "./components/user/WishList";
import UserSidebar from "./components/user/UserSidebar";
import MyMenu from "./pages/MyMenu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/bookdetail" element={<BookDetail />} />
          <Route path="/mymenu" element={<MyMenu />}>
            <Route index element={<MyProfile />} />
            <Route path="/mymenu/cart" element={<Cart />} />
            <Route path="/mymenu/myprofile" element={<MyProfile />} />
            <Route path="/mymenu/purchasehistory" element={<PurchaseHistory />} />
            <Route path="/mymenu/wishlist" element={<WishList />} />
            <Route path="/mymenu/usersidebar" element={<UserSidebar />} />
          </Route>
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