import Header from "../../Shared/Header/Header.jsx";
import { useEffect, useState } from "react";
import category_image from "../../../assets/category_header.png";
import { axios_instance_auth, CATEGORIES_URLS } from "../../services/urls/urls.js";
import NoFound from "../../Shared/NoFound/NoFound.jsx";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { categories_endpoints } from "../../services/api/apiConfig.js";
import { privteApiInstace } from "../../services/api/apiInstance.js";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation.jsx";
import globals from "globals";

export default function CategoriesList() {
    const [categories, setCategories] = useState([]);
    let [selectedId, setSelected] = useState(null)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setSelected(id)
    }

    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);


    let {
        register,
        formState: { errors, isSubmitted },
        handleSubmit
    } = useForm();

    let onSubmit = async (data) => {
        try {
            await privteApiInstace.post(
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

    let deleteCategory = async () => {
        try {
            let respones =await axios_instance_auth.delete(
                CATEGORIES_URLS.DELETE_CATEGORY(selectedId),
            )
            console.log(respones);
            getCategories();
            handleClose();
            toast.success("category deleted successfully");
        } catch (e) {
            toast.error("category not deleted");
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
                <button className="btn btn-success" onClick={handleShowAdd}>Add New Category</button>
            </div>

            <Modal show={showAdd} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
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

            <div className='container'>
                <div className="table-responsive">
                    <table className="table table-hover table-striped text-center align-middle">
                        <thead className="overflow-visible">
                            <tr>
                                <th scope="col">name</th>
                                <th scope="col">creationData</th>
                                <th scope="col">actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.length ? categories.map((category) =>
                                    <tr key={category.id}>
                                        <td>{category.name}</td>
                                        <td>{category.creationDate}</td>
                                        <td>
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
                                                        <a className="dropdown-item" onClick={() => handleShow(category?.id)}>edit</a>
                                                    </li>
                                                    <li className="d-flex align-items-center justify-content-center">
                                                        <i className="fa-solid fa-trash text-success" onClick={() => handleShow(category?.id)}></i>
                                                        <a className="dropdown-item" onClick={() => handleShow(category?.id)}>delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ) : <NoFound />
                            }
                        </tbody>
                    </table>
                    <DeleteConfirmation show={show} handleClose={handleClose} deleteFunc={() => deleteCategory(selectedId)} deleteItem={"category"} />
                </div>
            </div>
        </>
    )
}