import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import * as giIcon from "react-icons/gi";
import * as faIcon from "react-icons/fa";
import * as imIcon from "react-icons/im";
import * as mdIcon from "react-icons/md";
import * as biIcon from "react-icons/bi";
import * as riIcon from "react-icons/ri";
import * as bsIcon from "react-icons/bs";
import * as fiIcon from "react-icons/fi";


const NavLeft = () => {

    const navigate = useNavigate()

    const logOut = (e) => {
        localStorage.removeItem('token')
        navigate('/')
        window.location.reload(false)
    }

    return (
        <>
            <nav className="navbar navbar-default" role="navigation">

                <div className="nav_top">
                    <img className='logo' src={require('../../assets/img/logo.png')} alt="Logo" />
                    <fiIcon.FiLogOut style={{ cursor: 'pointer' }} className='fs-2' onClick={logOut} />
                </div>

                <div className="nav_img">
                    <img src={require('../../assets/img/User/comments-2.jpg')} alt="Logo" />
                </div>
                <div className="nav_name">
                    <h4>Brian Hughes</h4>
                </div>

                <ul className='menu'>
                    <li><Link to='/'><span><riIcon.RiDashboard3Fill /> </span>Dashboard</Link></li>
                    <li><Link to='/district'><span></span>District</Link></li>


                    <li><Link to='/company'><span><bsIcon.BsFillBuildingsFill /> </span>Company</Link></li>
                    <li><Link to='/expense'><span><giIcon.GiExpense /></span>expense</Link></li>
                    <li><Link to='/expenseCategory'><span><biIcon.BiCategory /></span>expenseCategory</Link></li>
                    <li><Link to='/customer'><span><faIcon.FaUserFriends /></span>customer</Link></li>
                    <li><Link to='/site'><span><biIcon.BiSitemap /></span>site</Link></li>
                </ul>

            </nav>
        </>
    )
}

export default NavLeft
