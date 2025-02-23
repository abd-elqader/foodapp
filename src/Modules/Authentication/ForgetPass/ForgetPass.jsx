import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {axios_instance, USER_URLS} from "../../services/urls/urls.js";

export default function ForgetPass() {

    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit} = useForm();

    let navigate = useNavigate();
    const onSubmit = async (data) => {
        try {
            let response = await axios_instance.post(
                USER_URLS.FORGOT_PASS,
                data)

            toast.success(response.data.message);
            navigate('/reset-password',{ state: {email: data.email}});
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
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
                <button type="submit" disabled={isSubmitting} className="btn w-100 btn-success mt-3">{isSubmitting?"Submitting ..." :'Submit'}</button>
            </form>
        </>
    )
}