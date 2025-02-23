import Header from "../../Shared/Header/Header.jsx";
import {useEffect, useState} from "react";
import category_image from "../../../assets/category_header.png";
import {axios_instance_auth, RECIPES_URLS,} from "../../services/urls/urls.js";
import NoFound from "../../Shared/NoFound/NoFound.jsx";


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

    let deleteRecipe = async (id) => {
        try {
            await axios_instance_auth.delete(
                Recipes_URLS.DELETE_RECIPE(id),
            )
            await getRecipes();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getRecipes()
        console.log(recipes)
    }, [])


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
            <div className='p-3'>
                <table className="table m-2">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">creationData</th>
                        <th scope="col">actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        recipes.length ? recipes.map((category) =>
                            <tr key={category.id}>
                                <th scope="row">{category.id}</th>
                                <td>{category.name}</td>
                                <td>{category.creationDate}</td>
                                <td>
                                    <i className="fa fa-edit text-warning mx-2" aria-hidden="true"
                                    ></i>
                                    <i className="fa fa-trash text-danger" aria-hidden="true"
                                       onClick={() => deleteRecipe(category.id)}></i>
                                </td>
                            </tr>
                        ) : <NoFound/>
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}



