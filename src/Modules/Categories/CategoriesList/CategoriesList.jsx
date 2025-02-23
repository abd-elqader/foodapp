import Header from "../../Shared/Header/Header.jsx";
import {useEffect, useState} from "react";
import category_image from "../../../assets/category_header.png";
import {axios_instance_auth, CATEGORIES_URLS} from "../../services/urls/urls.js";
import NoFound from "../../Shared/NoFound/NoFound.jsx";

export default function CategoriesList() {
    const [categories, setCategories] = useState([]);
    let getCategories = async () => {
        try {
            let response = await axios_instance_auth.get(
                CATEGORIES_URLS.GET_CATEGORIES
            )
            setCategories(response.data.data)
        } catch (e) {
            console.log(e.response.data.message)
            return (
                <div className="alert alert-danger" role="alert">
                    {e.response.data.message}
                </div>
            )
        }
    }

    let deleteCategory = async (id) => {
        try {
            await axios_instance_auth.delete(
                CATEGORIES_URLS.DELETE_CATEGORY(id),
            )
            await getCategories();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCategories()
        console.log(categories)
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
                        categories.length ? categories.map((category) =>
                            <tr key={category.id}>
                                <th scope="row">{category.id}</th>
                                <td>{category.name}</td>
                                <td>{category.creationDate}</td>
                                <td>
                                    <i className="fa fa-edit text-warning mx-2" aria-hidden="true"
                                    ></i>
                                    <i className="fa fa-trash text-danger" aria-hidden="true"
                                       onClick={() => deleteCategory(category.id)}></i>
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