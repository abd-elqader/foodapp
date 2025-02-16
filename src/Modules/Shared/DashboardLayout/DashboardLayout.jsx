
import Sidebar from "../Sidebar/Sidebar.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Header from "../Header/Header.jsx";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    return (
        <div className="d-flex">
            <div>
                <Sidebar />
            </div>
            <div>
                <Navbar />
                <Header />
                <Outlet />
            </div>
        </div>
    )
}