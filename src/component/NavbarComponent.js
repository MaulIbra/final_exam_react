import React from 'react';
import logo from '../assets/logo.png'
import {Link, withRouter} from "react-router-dom";

const NavbarComponent = (props) => {
    return (
        <div className="custom-navbar">
            <div className="navbar-logo">
                <img src={logo}/>
                <a className="navbar-logo-brand">aulana</a>
            </div>
            <div className="navbar-menu-container">
                <Link to="/" className={props.history.location.pathname === '/' ? "navbar-menu-active" : "navbar-menu"} style={{ textDecoration: 'none' }}>Home</Link>
                <Link to="/region" className={props.history.location.pathname === '/region' ? "navbar-menu-active" : "navbar-menu"} style={{ textDecoration: 'none' }}>Region</Link>
            </div>
        </div>
    );
};

export default withRouter(NavbarComponent);