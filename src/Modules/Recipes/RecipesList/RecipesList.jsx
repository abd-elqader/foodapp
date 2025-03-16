import image from '../../../assets/recipe_header.png';
import Header from "../../Shared/Header/Header.jsx";
import NoFound from "../../Shared/NoFound/NoFound.jsx";
import noData from '../../../assets/noData.png'
import { useEffect, useState } from "react";
import { axios_instance_auth, CATEGORIES_URLS, RECIPES_URLS } from "../../services/urls/urls.js";
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation.jsx';
import { IMAGE_URL, tags_endpoints } from '../../services/api/apiConfig.js';
import { Link } from "react-router-dom";
import Loading from '../../Shared/Loading/Loading.jsx';
import { Pagination } from '../../Shared/Pagination/Pagination.jsx';


export default function RecipesList() {
    // list
    const [recipes, setRecipes] = useState([]);
    // filter
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [name, setName] = useState('')
    const [tagValue, setTagValue] = useState('')
    const [catValue, setCatValue] = useState('')
    const [isLoading, setIsLoading] = useState(true);

    // for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    let getCategories = async () => {
        try {
            let response = await axios_instance_auth.get(
                CATEGORIES_URLS.GET_CATEGORIES, {
            }
            )
            setCategories(response.data.data)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
    let getTags = async () => {
        try {
            let response = await axios_instance_auth.get(
                tags_endpoints.GET_TAGS, {
            });
            setTags(response.data)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }

    const [show, setShow] = useState(false);
    let [selectedId, setSelected] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setSelected(id)
    }

    const getNameValue = (e) => {
        setName(e.target.value)
        getRecipes(3, 1, e.target.value, tagValue, catValue)
    }

    const getCatValue = (e) => {
        setCatValue(e.target.value)
        getRecipes(3, 1, name, tagValue, e.target.value)
    }

    const getTagValue = (e) => {
        setTagValue(e.target.value)
        getRecipes(3, 1, name, e.target.value, catValue)
    }

    let getRecipes = async (pageSize, pageNumber, name, tag, cat) => {
        try {
            setIsLoading(true);
            let response = await axios_instance_auth.get(
                RECIPES_URLS.GET_RECIPES,
                {
                    params: {
                        pageSize: pageSize,
                        pageNumber: pageNumber,
                        name: name,
                        tagId: tag,
                        categoryId: cat,
                    },
                }
            )
            setRecipes(response?.data?.data)
            setTotalPages(response?.data?.totalNumberOfPages);
        } catch (e) {
            console.log(e.response.data.message)
            return (
                <div className="alert alert-danger" role="alert">
                    {e.response.data.message}
                </div>
            )
        } finally {
            setIsLoading(false);
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
        getRecipes(3, currentPage).then(r => console.log(r));
        getCategories();
        getTags();

    }, [currentPage])

    return (
        <>
            <Header
                title="Recipe Table Details"
                description="You can now add your items that any user can order it from the Application and you can edit"
                image={image}
            />

            <div className="title d-flex justify-content-between align-items-center m-2 p-2">
                <div className="caption">
                    <h3>Recipes Details</h3>
                    <span>you can check details</span>
                </div>
                <Link to="/dashboard/recipes-data" className="btn btn-success p-3">
                    Add New Recipe
                </Link>
            </div>

            <div className="search-bar-container">
                <div className="row ">
                    <div className='col-md-6 search-bar btn-group'>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            className="form-control"
                            placeholder="Search"
                            onChange={getNameValue}
                        />
                    </div>
                    <div className='col-md-3 select-category'>
                        <select
                            name="category"
                            id="category"
                            className="form-select"
                            onChange={getCatValue}
                        >
                            {categories?.map(({ id, name }) => (
                                <option key={id} value={id}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='col-md-3 select-tag'>
                        <select
                            name="tag"
                            id="tag"
                            className="form-select"
                            onChange={getTagValue}
                        >
                            {tags?.map(({ id, name }) => (
                                <option key={id} value={id}>{name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className='p-3'>
                <table className="table m-2">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">tag</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <Loading colSpan={7} />
                            ) : (recipes.length ? recipes.map((recipe) =>
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
                                        <div className="btn-group">
                                            <a className="dropdown-toggle"
                                                data-bs-toggle="dropdown" aria-expanded='false'>
                                                <i className="fa-solid fa-ellipsis text-muted"></i>
                                            </a>
                                            <ul className="dropdown-menu rounded-2 px-2 ">
                                                <li className="d-flex align-items-center justify-content-center">
                                                    <i className="fa-solid fa-eye text-success"></i>
                                                    <a className="dropdown-item">view</a>

                                                </li>
                                                <li className="d-flex align-items-center justify-content-center">
                                                    <i className="fa-solid fa-edit text-success"></i>
                                                    <Link className="dropdown-item" to={`/dashboard/recipes-data/${recipe?.id}`}>edit</Link>
                                                </li>
                                                <li className="d-flex align-items-center justify-content-center">
                                                    <i className="fa-solid fa-trash text-success"
                                                        onClick={() => handleShow(recipe?.id)}></i>
                                                    <a className="dropdown-item"
                                                        onClick={() => handleShow(recipe?.id)}>delete</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ) : <NoFound />)
                        }
                    </tbody>
                </table>
                {
                    isLoading ? ('') :
                        (<Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                            entityType="categories"
                        />)
                }

                <DeleteConfirmation show={show} handleClose={handleClose} deleteFunc={() => deleteRecipe(selectedId)}
                    deleteItem={"Reciepe"} />
            </div>
        </>
    )
}