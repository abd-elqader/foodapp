import { useNavigate } from "react-router-dom";
import { users_endpoints } from "../../services/api/apiConfig.js";
import { privteApiInstace } from "../../services/api/apiInstance.js";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { PASSWORD_VALIDATION } from "../../services/Validation/validation.js";
import { toast } from "react-toastify";

export default function ChangePass() {

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        watch,
        trigger
    } = useForm({ mode: 'onChange', defaultValues: {} });

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const newPassword = watch("newPassword");
    const confirmPassword = watch("confirmPassword")

    useEffect(() => {
        if (newPassword !== "" && confirmPassword !== "") {
            trigger("confirmPassword")
        }
    }, [newPassword, confirmPassword, trigger])

    let navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            let response = await privteApiInstace.put(
                users_endpoints.CHANGE_PASSWORD,
                data
            )
            localStorage.setItem('token', response.data.token);
            toast.success(response.data.message);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <div className="title my-3">
                <h3 className="h5">Change Password</h3>
                {/* <p className="text-muted">Please Enter Your Otp or Check Your Inbox</p> */}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
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
        </>
    )
}