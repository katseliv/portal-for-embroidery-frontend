import React from 'react';
import {NavLink} from "react-router-dom";
import postageHeart from '../../images/postage-heart.svg';

function Header(props) {
    debugger
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo03"
                            aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavLink className="navbar-brand" to="/">Portal for Embroidery</NavLink>
                    <NavLink className="navbar-brand" to="/">
                        <img className="align-content-center" src={postageHeart} height="25" width="25" alt=""/>
                    </NavLink>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-5 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile">Profile</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users">Users</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/designs">Designs</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/designs">My Designs</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about-us">About Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contacts">Contacts</NavLink>
                            </li>
                        </ul>
                        {props.isAuthenticated
                            ?
                            <form className="d-flex">
                                <button className="btn btn-outline-danger" onClick={props.logout}>Sign Out</button>
                            </form>
                            :
                            <>
                                <NavLink className="link-secondary nav-link" to="/sign-up">Sign Up</NavLink>
                                <form className="d-flex" action="/sign-in">
                                    <button className="btn btn-outline-success" type="submit">Sign In</button>
                                </form>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;