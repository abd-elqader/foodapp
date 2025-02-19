import axios from "axios";
import logo from '../../../assets/logo.png';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {

    const { register, formState: { errors }, handleSubmit } = useForm();
    let navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request', data)
            toast.success(response.data.message);
            navigate('/reset-password');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="auth-container">
            <div className="container-fluid bg-overlay">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-lg-6 col-md-8 bg-white rounded-3 p-5 m-3">
                        <div>
                            <div className="logo-container text-center">
                                <img src={logo} className="w-50 mb-3 rounded" alt="Login" />
                            </div>
                            <div className="title my-3">
                                <h3 className="h5" >Forgot Your Password?</h3>
                                <p className="text-muted">No worries! Please enter your email and we will send a password reset link </p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-group mt-3">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-mobile-screen-button"></i></span>
                                    <input {...register("email", { required: 'field is required' })} type="text" className="form-control" placeholder="Enter your email" />
                                </div>
                                {errors.email && <span className="text-danger mt-2">{errors.email.message}</span>}
                                <button type="submit" className="btn w-100 btn-success mt-3">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}