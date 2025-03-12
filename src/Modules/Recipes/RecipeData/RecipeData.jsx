import Header from "../../Shared/Header/Header.jsx";
import {useEffect, useState} from "react";
import category_image from "../../../assets/category_header.png";
import {axios_instance, axios_instance_auth, RECIPES_URLS, USER_URLS,} from "../../services/urls/urls.js";
import NoFound from "../../Shared/NoFound/NoFound.jsx";
import {EMAIL_VALIDATION, PASSWORD_VALIDATION} from "../../services/Validation/validation.js";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {privteApiInstace} from "../../services/api/apiInstance.js";
import {categories_endpoints, recipes_endpoints} from "../../services/api/apiConfig.js";


export default function RecipeData() {
    const [recipes, setRecipes] = useState([]);
    let getRecipes = async () => {
        try {
            let response = await axios_instance_auth.get(
                RECIPES_URLS.GET_RECIPES
            )
            setRecipes(response.data.data)
        } catch (e) {
            console.log(e.response.data.message)
            return (
                <div className="alert alert-danger" role="alert">
                    {e.response.data.message}
                </div>
            )
        }
    }

    let {
        register,
        formState: { errors },
        handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            await privteApiInstace.post(
                recipes_endpoints.POST_RECIPE,
                data
            )

            toast.success('recipe added');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <Header
                title={"Categories Item"}
                description={"You can now add your items that any user can order it from the Application and you can edit"}
                image={category_image}
            />
            <div className="title d-flex justify-content-between align-items-center m-2 p-2">
                <div className="caption">
                    <h3>Categories Details</h3>
                    <span>you can check details</span>
                </div>
                <button className="btn btn-success">Add New Category</button>
            </div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mt-3 mb-2">
                    <span className="input-group-text" id="basic-addon1"><i
                        className="fa-solid fa-mobile-screen-button"></i></span>
                        <input {...register("recipe_name", EMAIL_VALIDATION)} autoComplete="current-password" type="text" className="form-control"
                               placeholder="Enter your name" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    {errors.recipe_name && <span className="text-danger">{errors.recipe_name.message}</span>}
                </form>
            </div>
        </>
    )
}



