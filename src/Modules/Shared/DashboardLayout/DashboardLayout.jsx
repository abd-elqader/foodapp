
import SideBar from "../SideBar/SideBar.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PASSWORD_VALIDATION } from "../../services/Validation/validation.js";
import { toast } from "react-toastify";
import { privteApiInstace } from "../../services/api/apiInstance.js";
import { users_endpoints } from "../../services/api/apiConfig.js";
import logo from "../../../assets/logo.png";

export default function DashboardLayout({ loginData }) {

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setSelected(id)
    }

    let {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        watch,
        trigger,
    } = useForm();

    const newPassword = watch("newPassword");
    const confirmNewPassword = watch("confirmPassword")

    let onSubmit = async (data) => {
        try {
            await privteApiInstace.put(
                users_endpoints.CHANGE_PASSWORD,
                data
            )
            toast.success("password changed successfully");
            handleClose();
        } catch (e) {
            console.log(e);

            toast.error("error");
            console.log(e)
        }
    }

    useEffect(() => {
        if (newPassword !== "" && confirmNewPassword !== "") {
            trigger("confirmNewPassword")
        }
    }, [newPassword, confirmNewPassword, trigger])

    return (
        <div className="d-flex">
            <div>
                <SideBar handleShow={handleShow} />
            </div>
            <div className="w-100 p-3">
                <Navbar loginData={loginData} />
                <Outlet />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <div className="text-center">
                            <img src={logo} alt="" className="w-75" />
                        </div>
                        <h4>
                            Change Password
                        </h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group mt-3">
                                <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                                <input {...register("oldPassword", { required: 'field is required' })}
                                    type={showOldPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Old Password"
                                />
                                <span
                                    className="input-group-text"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                >
                                    <i className={`fa ${showOldPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                            </div>
                            {errors.oldPassword && <span className="text-danger">{errors.oldPassword.message}</span>}
                            <div className="input-group mt-3">
                                <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                                <input {...register("newPassword", PASSWORD_VALIDATION)}
                                    type={showNewPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="New Password" />
                                <span
                                    className="input-group-text"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    <i className={`fa ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                            </div>
                            {errors.newPassword && <span className="text-danger">{errors.newPassword.message}</span>}
                            <div className="input-group mt-3">
                                <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                                <input {...register("confirmNewPassword",
                                    { ...PASSWORD_VALIDATION, validate: (confirmNewPassword) => { return confirmNewPassword === watch("newPassword") } })}
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Confirm New Password" />
                                <span
                                    className="input-group-text"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <i className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                            </div>
                            {errors.confirmNewPassword && <span className="text-danger">{errors.confirmNewPassword.message}</span>}
                            <button type="submit" disabled={isSubmitting}
                                className="btn w-100 btn-success mt-3">{isSubmitting ? 'in progress ...' : 'Reset Password'}</button>
                        </form>
                    </div>

                </Modal.Body>
            </Modal>
        </div>
    )
}