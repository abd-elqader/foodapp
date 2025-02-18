import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/logo.png';
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";

export default function Login() {
    let { register, formState: { errors }, handleSubmit } = useForm();

    let navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login', data)
            toast.success('welcome');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="auth-container">
            <div className="container-fluid bg-overlay">
                <div className="row vh-100 justify-content-center align-items-center">
                    <div className="col-lg-5 bg-white rounded-3 p-5 m-3">
                        <div>
                            <div className="logo-container text-center">
                                <img src={logo} className="w-50 mb-3 rounded" alt="Login" />
                            </div>
                            <div className="title my-3">
                                <h3 className="h5" >Login</h3>
                                <p className="text-muted">Welcame Back! Please enter your details</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-group mt-3">
                                    <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-mobile-screen-button"></i></span>
                                    <input {...register("email", { required: 'field is required' })} type="text" className="form-control" placeholder="Enter your E-mail" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                {errors.email && <span className="text-danger">{errors.email.message}</span>}
                                <div className="input-group mt-3">
                                    <span className="input-group-text"><i className="fa-solid fa-lock"></i></span>
                                    <input {...register("password", { required: 'field is required' })} type="text" className="form-control" placeholder="Password" aria-label="Amount (to the nearest dollar)" />
                                    <span className="input-group-text"><i className="fa fa-eye"></i></span>
                                </div>
                                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                                <div className="links d-flex justify-content-between my-4">
                                    <Link to="/register" className="text-black text-decoration-none">Register Now</Link>
                                    <Link to="/forget-password" className="text-success text-decoration-none">Forget Password?</Link>
                                </div>
                                <button type="submit" className="btn w-100 btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}