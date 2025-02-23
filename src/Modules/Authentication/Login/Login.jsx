import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useState} from "react";
import {EMAIL_VALIDATION, PASSWORD_VALIDATION} from "../../services/Validation/validation.js";
import {axios_instance, USER_URLS} from "../../services/urls/urls.js";

export default function Login({saveLoginData}) {
    let {
        register,
        formState: {errors},
        handleSubmit} = useForm();

    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            let response = await axios_instance.post(
                USER_URLS.LOGIN,
                data);
            localStorage.setItem('token', response.data.token);
            saveLoginData(response.data.user);

            toast.success('welcome');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <div className="title my-3">
                <h3 className="h5">Login</h3>
                <p className="text-muted">Welcome Back! Please enter your details</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mt-3 mb-2">
                    <span className="input-group-text" id="basic-addon1"><i
                        className="fa-solid fa-mobile-screen-button"></i></span>
                    <input {...register("email", EMAIL_VALIDATION)} autoComplete="current-password" type="text" className="form-control"
                           placeholder="Enter your E-mail" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
                <div className="input-group mt-3 mb-2">
                    <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                    <input {...register("password", PASSWORD_VALIDATION)} type={showPassword ? "text" : "password"}
                           className="form-control" placeholder="Password"/>
                    <span className="input-group-text" style={{cursor: 'pointer'}}
                          onClick={() => setShowPassword(!showPassword)}>
                          <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </span>
                </div>
                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                <div className="links d-flex justify-content-between my-4">
                    <Link to="/register" className="text-black text-decoration-none">Register Now</Link>
                    <Link to="/forget-password" className="text-success text-decoration-none">Forget Password?</Link>
                </div>
                <button type="submit" className="btn w-100 btn-success">Submit</button>
            </form>
        </>
    )
}