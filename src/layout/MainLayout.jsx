import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function MainLayout() {
    return (
        <>
        <Header />
        <div>
        <Outlet />    
        </div>
        <Footer />
        </>
    )
}