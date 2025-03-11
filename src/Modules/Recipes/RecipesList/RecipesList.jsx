import image from '../../../assets/recipe_header.png';
import Header from "../../Shared/Header/Header.jsx";
import NoFound from "../../Shared/NoFound/NoFound.jsx";
import noData from '../../../assets/noData.png'
import { useEffect, useState } from "react";
import { axios_instance_auth, RECIPES_URLS } from "../../services/urls/urls.js";
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation.jsx';
import { IMAGE_URL } from '../../services/api/apiConfig.js';

export default function RecipesList() {
    const [recipes, setRecipes] = useState([]);

    const [show, setShow] = useState(false);
    let [selectedId, setSelected] = useState(null)

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setSelected(id)
    }

    let onSubmit = async (data) => {
        try {
            let response = await privteApiInstace.post(
                categories_endpoints.POST_CATEGORY,
                data
            )
            toast.success("category added successfully");
            getCategories();
            handleCloseAdd();
        } catch (e) {
            toast.error("category not added");
            console.log(e)
        }
    }

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
            handleClose()
            getRecipes();
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

            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group mt-3">
                            <input
                                {...register("name")}
                                type="text"
                                className="form-control py-3 my-3"
                                placeholder="Category Name"
                            />
                        </div>
                        {errors.name && (
                            <span className="text-danger mt-2">{errors.name.message}</span>
                        )}
                        <button type="submit" disabled={isSubmitted} className="btn w-100 btn-success mt-3">{isSubmitted ? "saving ..." : 'Save'}</button>
                    </form>
                </Modal.Body>
            </Modal>

            <div className='p-3'>
                <table className="table m-2">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recipes.length ? recipes.map((recipe) =>
                                <tr key={recipe.id}>
                                    <td data-label="Name">{recipe?.name}</td>
                                    <td data-label="Image">
                                        <img
                                            src={
                                                recipe?.imagePath
                                                    ? `${IMAGE_URL}/${recipe?.imagePath}`
                                                    : `${noData}`}
                                            loading='lazy'
                                            alt="Food Image"
                                            className='img-fluid rounded w-100 d-block'
                                            style={{ maxWidth: '80px' }}
                                        />
                                    </td>
                                    <td data-label="Price">{recipe?.price}</td>
                                    <td data-label="Description">{recipe?.description}</td>
                                    <td data-label="Tag">{recipe?.tag?.name}</td>
                                    <td
                                        data-label="Category"
                                        className={`${recipe?.category[0]?.name ?? 'text-danger'}`}
                                    >
                                        {recipe?.category[0]?.name}
                                    </td>

                                    <td data-label="Action">
                                        <i className="fa fa-edit text-warning mx-2" aria-hidden="true"
                                        ></i>
                                        <i className="fa fa-trash text-danger" aria-hidden="true"
                                            onClick={() => handleShow(recipe?.id)}></i>
                                    </td>
                                </tr>
                            ) : <NoFound />
                        }
                    </tbody>
                </table>
                <DeleteConfirmation show={show} handleClose={handleClose} deleteFunc={() => deleteRecipe(selectedId)} deleteItem={"Reciepe"} />
            </div>
        </>
    )
}