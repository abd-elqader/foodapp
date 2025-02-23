import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {EMAIL_VALIDATION, PASSWORD_VALIDATION} from "../../services/Validation/validation.js";
import {useEffect} from "react";
import {axios_instance, USER_URLS} from "../../services/urls/urls.js";

export default function ResetPass() {

    let {state} = useLocation();
    const {
        register,
        formState: {errors, isSubmitting},
        handleSubmit,
        watch,
        trigger
    } = useForm({defaultValues: {email:state?.email}},{mode: 'onChange', defaultValues: {}});

    const password = watch("password");
    const confirmPassword = watch("confirmPassword")

    useEffect(() => {
        if (password !== "" && confirmPassword !== "") {
            trigger("confirmPassword")
        }
    }, [password, confirmPassword, trigger])

    let navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            let response = await axios_instance.post(
                USER_URLS.LOGIN,
                data
            )

            localStorage.setItem('token', response.data.token);
            toast.success(response.data.message);
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <div className="title my-3">
                <h3 className="h5">Reset Password</h3>
                <p className="text-muted">Please Enter Your Otp or Check Your Inbox</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mt-3">
                    <span className="input-group-text" id="basic-addon1"><i
                        className="fa-solid fa-mobile-screen-button"></i></span>
                    <input {...register("email", EMAIL_VALIDATION)} type="text" className="form-control"
                           placeholder="Enter your E-mail" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
                <div className="input-group mt-3">
                    <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                    <input {...register("seed", {required: 'field is required'})} type="text" className="form-control"
                           placeholder="OTP"/>
                </div>
                {errors.seed && <span className="text-danger">{errors.seed.message}</span>}
                <div className="input-group mt-3">
                    <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                    <input {...register("password", PASSWORD_VALIDATION)} type="text"
                           className="form-control" placeholder="New Password"/>
                    <span className="input-group-text"><i className="fa fa-eye"></i></span>
                </div>
                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                <div className="input-group mt-3">
                    <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                    <input {...register("confirmPassword",
                        {...PASSWORD_VALIDATION, validate:(confirmPassword)=> {return confirmPassword === watch("password")}})}
                           type="text"
                           className="form-control"
                           placeholder="Confirm New Password" />
                    <span className="input-group-text"><i className="fa fa-eye"></i></span>
                </div>
                {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                <button type="submit" disabled={isSubmitting}
                        className="btn w-100 btn-success mt-3">{isSubmitting ? 'in progress ...' : 'Reset Password'}</button>
            </form>
        </>
    )
}