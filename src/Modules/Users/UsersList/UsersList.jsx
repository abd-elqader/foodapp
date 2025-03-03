import Header from "../../Shared/Header/Header.jsx";
import {useEffect, useState} from "react";
import user_image from "../../../assets/category_header.png";
import {axios_instance_auth, USERS_URLS} from "../../services/urls/urls.js";

import NoFound from "../../Shared/NoFound/NoFound.jsx";

export default function UsersList() {
    const [users, setUsers] = useState([]);

    const [expend, setExpend] = useState(false);

    let toggleExpend = () => {
        setExpend(!expend)
    }

    let getUsers = async () => {
        try {
            let response = await axios_instance_auth.get(
                USERS_URLS.GET_USERS
            )
            setUsers(response.data.data)
        } catch (e) {
            console.log(e.response.data.message)
            return (
                <div className="alert alert-danger" role="alert">
                    {e.response.data.message}
                </div>
            )
        }
    }

    //
    // let deleteUser = async (id) => {
    //     try {
    //         await axios_instance_auth.delete(
    //             USERS_URLS.DELETE_USER(id),
    //         )
    //         await getUsers();
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    useEffect(() => {
         getUsers().then(r => console.log(r))
    }, [])


    return (
        <>
            <Header
                title={"Users List"}
                description={"You can now add your items that any user can order it from the Application and you can edit"}
                image={user_image}
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
                    <thead style={{ backgroundColor: '#f0ad4e', color: 'white' }}>

                    <tr >
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">creationData</th>
                        <th scope="col">actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.length ? users.map((category) =>
                            <tr key={category.id}>
                                <th scope="row">{category.id}</th>
                                <td>{category.name}</td>
                                <td>{category.creationDate}</td>
                                <td>
                                    {/*<div className="btn-group">*/}
                                    {/*    <button type="button" className="btn btn-danger dropdown-toggle"*/}
                                    {/*            data-toggle="dropdown" aria-haspopup="true" aria-expanded={expend}*/}
                                    {/*            onClick={() => toggleExpend()}>*/}
                                    {/*        Action*/}
                                    {/*    </button>*/}
                                    {/*    <div className="dropdown-menu">*/}
                                    {/*        <a className="dropdown-item" href="#">Action</a>*/}
                                    {/*        <a className="dropdown-item" href="#">Another action</a>*/}
                                    {/*        <a className="dropdown-item" href="#">Something else here</a>*/}
                                    {/*        <div className="dropdown-divider"></div>*/}
                                    {/*        <a className="dropdown-item" href="#">Separated link</a>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="btn-group">
                                        <a className="dropdown-toggle"
                                                data-bs-toggle="dropdown" aria-expanded={expend}>
                                            <i className="fa-solid fa-ellipsis"></i>
                                        </a>
                                        <ul className="dropdown-menu rounded-2 px-2 ">
                                            <li className="d-flex align-items-center justify-content-center"><i className="fa-solid fa-eye text-success"></i><a className="dropdown-item" href="#">view</a></li>
                                            <li className="d-flex align-items-center justify-content-center"><i className="fa-solid fa-trash text-success"></i><a className="dropdown-item" href="#">edit</a></li>
                                        </ul>
                                    </div>
                                    {/*<i className="fa fa-edit text-warning mx-2" aria-hidden="true"*/}
                                    {/*></i>*/}
                                    {/*<i className="fa fa-trash text-danger" aria-hidden="true"*/}
                                    {/*   onClick={() => deleteCategory(category.id)}></i>*/}
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