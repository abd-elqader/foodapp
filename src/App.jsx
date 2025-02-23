import './App.css'
import DashboardLayout from './Modules/Shared/DashboardLayout/DashboardLayout.jsx'
import AuthLayout from './Modules/Shared/AuthLayout/AuthLayout.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './Modules/Authentication/Login/Login.jsx'
import ForgetPass from './Modules/Authentication/ForgetPass/ForgetPass.jsx'
import ResetPass from './Modules/Authentication/ResetPass/ResetPass.jsx'
import ChangePass from './Modules/Authentication/ChangePass/ChangePass.jsx'
import VerifyAccount from './Modules/Authentication/VerifyAccount/VerifyAccount.jsx'
import NoFound from './Modules/Shared/NoFound/NoFound.jsx'
import Dashboard from './Modules/Dashboard/Dashboard.jsx'
import UsersList from './Modules/Users/UsersList/UsersList.jsx'
import RecipesList from './Modules/Recipes/RecipesList/RecipesList.jsx'
import RecipeData from './Modules/Recipes/RecipeData/RecipeData.jsx'
import CategoriesList from './Modules/Categories/CategoriesList/CategoriesList.jsx'
import CategoryData from './Modules/Categories/CategoryData/CategoryData.jsx'
import Register from './Modules/Authentication/Register/Register.jsx'
import { ToastContainer } from 'react-toastify'
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";
import ProtectedRoute from "./Modules/Shared/ProtectedRoute/ProtectedRoute.jsx";

function App() {

  const [loginData, setLoginData] = useState(null)

    let saveLoginData = () => {
        let encodeData = localStorage.getItem('token')
        let decodeData = jwtDecode(encodeData);
        setLoginData(decodeData)

    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
          saveLoginData(localStorage.getItem('token'))
        }
    },[])

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      elementError: <NoFound />,
      children: [
        {
          index: true,
          element: <Login saveLoginData={saveLoginData}/>
        },{
          path: 'login',
          element: <Login saveLoginData={saveLoginData}/>
        }, {
          path: "register",
          element: <Register />
        }, {
          path: 'forget-password',
          element: <ForgetPass />
        }, {
          path: 'reset-password',
          element: <ResetPass />
        }, {
          path: 'change-password',
          element: <ChangePass />
        }, {
          path: 'verify-account',
          element: <VerifyAccount />
        }
      ]
    }, {
      path: "dashboard",
      element: <ProtectedRoute ><DashboardLayout loginData={loginData}/></ProtectedRoute>,
      elementError: <NoFound />,
      children: [
        {
          index: true,
          element: <Dashboard  />
        }, {
          path: "recipes-data",
          element: <RecipeData />
        }, {
          path: "recipes-list",
          element: <RecipesList />
        }, {
          path: "Categories-data",
          element: <CategoryData />
        }, {
          path: "Categories-list",
          element: <CategoriesList />
        }, {
          path: "users-list",
          element: <UsersList />
        }
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    </>
  )
}

export default App
