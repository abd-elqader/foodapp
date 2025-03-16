import Header from "../../Shared/Header/Header.jsx";
import { useEffect, useState } from "react";
import user_image from "../../../assets/category_header.png";
import { axios_instance_auth, USERS_URLS } from "../../services/urls/urls.js";

import NoFound from "../../Shared/NoFound/NoFound.jsx";
import noData from '../../../assets/noData.png'
import { Pagination } from "../../Shared/Pagination/Pagination.jsx";
import { IMAGE_URL } from "../../services/api/apiConfig.js";
import Loading from "../../Shared/Loading/Loading.jsx";

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');

    const getUserNameValue = (e) => {
        setUserName(e.target.value)
        getUsers(3, 1, e.target.value, email, country)
    }

    const getEmailValue = (e) => {
        setEmail(e.target.value)
        getUsers(3, 1, userName, e.target.value, country)
    }

    const getCountryValue = (e) => {
        setCountry(e.target.value)
        getUsers(3, 1, userName, email, e.target.value)
    }

    let getUsers = async (pageSize, pageNumber, userName, email, country) => {
        try {
            setIsLoading(true);
            let response = await axios_instance_auth.get(
                USERS_URLS.GET_USERS,
                {
                    params: {
                        pageSize: pageSize,
                        pageNumber: pageNumber,
                        userName: userName,
                        email: email,
                        country: country,
                    },
                }
            )
            setUsers(response.data.data)
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


    let deleteUser = async (id) => {
        try {
            await axios_instance_auth.delete(
                USERS_URLS.DELETE_USER(id),
            )
            await getUsers();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUsers(3, currentPage).then(r => console.log(r))
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
                    <h3>users Details</h3>
                    <span>you can check details</span>
                </div>
            </div>

            <div className="search-bar-container">
                <div className="row ">
                    <div className='col-md-4 search-bar btn-group'>
                        <input
                            type="text"
                            id="search-userName"
                            className="form-control"
                            placeholder="Search by userName"
                            onChange={getUserNameValue}
                        />
                    </div>
                    <div className='col-md-4 search-bar btn-group'>
                        <input
                            type="text"
                            id="search-email"
                            className="form-control"
                            placeholder="Search by email"
                            onChange={getEmailValue}
                        />
                    </div>
                    <div className='col-md-4 search-bar btn-group'>
                        <input
                            type="text"
                            id="search-country"
                            className="form-control"
                            placeholder="Search by country"
                            onChange={getCountryValue}
                        />
                    </div>
                </div>
            </div>

            <div className='table-container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">userName</th>
                            <th scope="col">email</th>
                            <th scope="col">Country</th>
                            <th scope="col">phoneNumber</th>
                            <th scope="col">imagePath</th>
                            <th scope="col">role</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <Loading colSpan={8} />
                            ) :
                                (users.length ? users.map((user) =>
                                    <tr key={user.id} className="body-row">
                                        <th scope="row">{user.id}</th>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.country}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>
                                            <img
                                                src={
                                                    user.imagePath ? `${IMAGE_URL}/${user.imagePath}` : `${noData}`
                                                }
                                                loading='lazy'
                                                alt="user"
                                                className='img-fluid rounded w-100 d-block'
                                                style={{ maxWidth: '80px' }}
                                            />
                                        </td>
                                        <td>{user.group?.name}</td>
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
                                                        <i className="fa-solid fa-trash text-success"
                                                            onClick={() => handleShow(user?.id)}></i>
                                                        <a className="dropdown-item"
                                                            onClick={() => handleShow(user?.id)}>delete</a>
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
                            entityType="users"
                        />)
                }
            </div>
        </>
    )
}