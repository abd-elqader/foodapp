import Header from "../../Shared/Header/Header.jsx";
import { useEffect, useState } from "react";
import category_image from "../../../assets/category_header.png";
import { axios_instance_auth, CATEGORIES_URLS } from "../../services/urls/urls.js";
import NoFound from "../../Shared/NoFound/NoFound.jsx";
import { Button, Modal } from "react-bootstrap";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation.jsx";
import { useForm } from "react-hook-form";

export default function CategoriesList() {
    const [categories, setCategories] = useState([]);
    const [show, setShow] = useState(false);
    let [selectedId, setSelected] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setSelected(id)
    }


    let { register, formState: { errors, isSubmitted }, handleSubmit } = useForm();

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
            handleClose()
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
                <button className="btn btn-success" onClick={() => { alert("hello") }}>Add New Category</button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-group mt-3">
                                <span className="input-group-text" id="basic-addon1"><i className="fa-solid fa-mobile-screen-button"></i></span>
                                <input {...register("name", { required: 'field is required' })} type="text" className="form-control" placeholder="Enter category name" />
                            </div>
                            {errors.name && <span className="text-danger mt-2">{errors.name.message}</span>}
                            <button type="submit" disabled={isSubmitting} className="btn w-100 btn-success mt-3">{isSubmitting ? "Submitting ..." : 'Submit'}</button>
                        </form>
                    </div>
                    <h5>Delete this {deleteItem}</h5>
                    <p>are you sure you want to delete this item</p>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="denger" onClick={deleteFunc}>
                        Delete this {deleteItem}
                    </Button> */}
                </Modal.Footer>
            </Modal>

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
                                            onClick={() => handleShow(category?.id)}></i>
                                        {/* <i className="fa fa-trash text-danger" aria-hidden="true"
                                            onClick={() => deleteCategory(category.id)}></i> */}
                                    </td>
                                </tr>
                            ) : <NoFound />
                        }
                    </tbody>

                    <DeleteConfirmation show={show} handleClose={handleClose} deleteFunc={() => deleteCategory(selectedId)} deleteItem={"category"} />
                </table>
            </div>
        </>
    )
}