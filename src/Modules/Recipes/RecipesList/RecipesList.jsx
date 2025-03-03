import image from '../../../assets/recipe_header.png';
import Header from "../../Shared/Header/Header.jsx";
import NoFound from "../../Shared/NoFound/NoFound.jsx";
import {useEffect, useState} from "react";
import {axios_instance_auth, RECIPES_URLS} from "../../services/urls/urls.js";

export default function RecipesList() {
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
                RECIPES_URLS.DELETE_RECIPE(id),
            )
            await getRecipes();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getRecipes().then(r => console.log(r));
    }, [])


    return (
        <>
            <Header
                title="Recipe Table Details"
                description="You can now add your items that any user can order it from the Application and you can edit"
                image={image}
            />
            <div className="title d-flex justify-content-between align-items-center m-2 p-2">
                <div className="caption">
                    <h3>Recipe Table Details</h3>
                    <span>You can check all details</span>
                </div>
                <button className="btn btn-success">Add New Item</button>
            </div>
            <div className='p-3'>
                <table className="table m-2">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        recipes.length ? recipes.map((recipe) =>
                            <tr key={recipe.id}>
                                <th scope="row">{recipe.id}</th>
                                <td>{recipe.name}</td>
                                <td>{recipe.creationDate}</td>
                                <td>
                                    <i className="fa fa-edit text-warning mx-2" aria-hidden="true"
                                    ></i>
                                    <i className="fa fa-trash text-danger" aria-hidden="true"
                                       onClick={() => deleteRecipe(recipe.id)}></i>
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