import {Outlet} from "react-router-dom";
import logo from '../../../assets/logo.png';

export default function AuthLayout() {
    return (
        <>
            <div className="auth-container">
                <div className="container-fluid bg-overlay">
                    <div className="row vh-100 justify-content-center align-items-center">
                        <div className="col-lg-5 bg-white rounded-3 p-5 m-3">
                            <div>
                                <div className="logo-container text-center">
                                    <img src={logo} className="w-50 mb-3 rounded" alt="Login"/>
                                </div>
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}