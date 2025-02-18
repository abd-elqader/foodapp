import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../../../assets/logo.png';
import axios from "axios";

export default function ResetPass() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset', data)
            toast.success(response.data.message);
            navigate('/login');
        } catch (error) {
            console.log(error);

            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="auth-container">
            <div className="container-fluid bg-overlay">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-lg-5  col-md-8 col-md-6 bg-white rounded-3 p-5 m-3">
                        <div>
                            <div className="logo-container text-center">
                                <img src={logo} className="w-50 mb-3 rounded" alt="Login" />
                            </div>
                            <div className="title my-3">
                                <h3 className="h5" >Reset  Password</h3>
                                <p className="text-muted">Please Enter Your Otp  or Check Your Inbox</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-group mt-3">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-mobile-screen-button"></i></span>
                                    <input {...register("email", { required: 'field is required' })} type="text" className="form-control" placeholder="Enter your E-mail" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                <div className="input-group mt-3">
                                    <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                                    <input {...register("seed", { required: 'field is required' })} type="text" className="form-control" placeholder="OTP" />
                                </div>
                                {errors.seed && <span className="text-danger">{errors.seed.message}</span>}
                                <div className="input-group mt-3">
                                    <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                                    <input {...register("password", { required: 'field is required' })} type="text" className="form-control" placeholder="New Password" />
                                    <span className="input-group-text"><i className="fa fa-eye"></i></span>
                                </div>
                                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                                <div className="input-group mt-3">
                                    <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                                    <input {...register("confirmPassword", { required: 'field is required' })} type="text" className="form-control" placeholder="Confirm New Password" />
                                    <span className="input-group-text"><i className="fa fa-eye"></i></span>
                                </div>
                                {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                                <button type="submit" className="btn w-100 btn-success mt-3">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}