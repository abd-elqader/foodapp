
import SideBar from "../SideBar/SideBar.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import Header from "../Header/Header.jsx";
import { Outlet } from "react-router-dom";

export default function DashboardLayout({loginData}) {
    return (
        <div className="d-flex">
            <div>
                <SideBar />
            </div>
            <div className="w-100 p-3">
                <Navbar loginData={loginData} />

                <Outlet />
            </div>
        </div>
    )
}