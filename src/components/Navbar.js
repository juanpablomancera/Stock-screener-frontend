import React from "react"
import logo from "../images/logo2.png"
import "../ComponentsStyles/navbar.css"
import {Outlet, Link} from "react-router-dom"

export default function Navbar(){
    return(
        <nav>
            <Link to="/" style={{ textDecoration: 'none',color:'#1E1E24' }}><img src={logo} alt="" className="logo-img"/></Link>

            <ul className="sections">
                <li>
                    <Link to="/login" style={{ textDecoration: 'none',color:'#1E1E24' }}>Login</Link>
                </li>
                <li>
                    <Link to="/register" style={{ textDecoration: 'none',color:'#1E1E24' }}>Register</Link>
                </li>
                <li>
                    <Link to="/stockscreener" style={{ textDecoration: 'none',color:'#1E1E24' }}>Stock screener</Link>
                </li>
                <li>
                    <Link to="/crypto" style={{ textDecoration: 'none',color:'#1E1E24' }}>Crypto screener</Link>
                </li>
            </ul>
            <Outlet />
        </nav>
    )
}