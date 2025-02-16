import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="auth-container">
            <div className="container-fluid">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-lg-6 bg-white">
                        <div>
                            <h2 className="text-primary">Login</h2>
                            <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.</p>
                        </div>
                        <div className="p-3 ">
                            <form>
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-mobile-screen-button"></i></span>
                                    <input type="text" class="form-control" placeholder="Enter your E-mail" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                                    <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
                                    <span class="input-group-text"><i className="fa fa-eye"></i></span>
                                </div>
                                <div class="form-links d-flex justify-content-between mb-3">
                                    <Link to="/register">Register Now</Link>
                                    <Link to="/register">Forget Password?</Link>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}