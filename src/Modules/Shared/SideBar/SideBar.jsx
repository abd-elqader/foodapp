import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../../assets/sidebar_logo.png';
import { useState } from "react";

export default function SideBar({ handleShow }) {
    let navigate = useNavigate()

    const [isCollapsed, setIsCollapsed] = useState(false);

    let toggleCollapsed = () => {
        setIsCollapsed(!isCollapsed);
    }

    let logout = () => {
        localStorage.removeItem('token');
        navigate('/login');

    }

    return (
        <div className='sidebar-container'>
            <Sidebar collapsed={isCollapsed}>
                <Menu>
                    <MenuItem onClick={toggleCollapsed} className='my-4 logo-li' icon={<img src={logo} className="sidebar-logo" alt="" />}></MenuItem>
                    <MenuItem icon={<i className="fa fa-home" aria-hidden="true"></i>} component={<Link to="/dashboard" />}> Dashboard </MenuItem>
                    <MenuItem icon={<i className="fa-solid fa-users" aria-hidden="true"></i>} component={<Link to="/dashboard/users-List" />}> users </MenuItem>
                    <MenuItem icon={<i className="fa-solid fa-kitchen-set" aria-hidden="true"></i>} component={<Link to="/dashboard/recipes-list" />}> recipes </MenuItem>
                    <MenuItem icon={<i className="fa-solid fa-layer-group" aria-hidden="true"></i>} component={<Link to="/dashboard/categories-list" />}> categories </MenuItem>
                    <MenuItem onClick={handleShow}
                        icon={<i className="fa-solid fa-lock" aria-hidden="true"></i>}
                    >
                        change password
                    </MenuItem>
                    <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={logout}> Logout </MenuItem>
                </Menu>
            </Sidebar>;
        </div>
    )
}