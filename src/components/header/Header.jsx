import React from 'react';
import {NavLink} from "react-router-dom";
import postageHeart from '../../images/postage-heart.svg';

const Header = (props) => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Portal for Embroidery</NavLink>
                    <NavLink className="navbar-brand" to="/">
                        <img className="align-content-center" src={postageHeart} height="25" width="25" alt=""/>
                    </NavLink>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav me-auto mb-5 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>
                            {props.isAuthenticated &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                                </li>
                            }
                            {props.isAuthenticated && props.profile && props.profile.role === "ADMIN" &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/users">Users</NavLink>
                                </li>
                            }
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/designs">Designs</NavLink>
                            </li>
                            {props.isAuthenticated && props.profile && props.profile.role === "DESIGNER" &&
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/designs">My Designs</NavLink>
                                </li>
                            }
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about-us">About Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contacts">Contacts</NavLink>
                            </li>
                        </ul>
                        {props.isAuthenticated
                            ? <button className="btn btn-outline-danger" onClick={() => props.logout()}>Sign Out</button>
                            : <>
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