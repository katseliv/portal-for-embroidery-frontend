import React from 'react';
import {NavLink} from "react-router-dom";

function Registration(props) {
    let onSignUp = () => {
        let dataForm = {}
        props.signUp(dataForm);
    }

    return (
        <div className="Authorization">
            <div className="container p-5 overflow-hidden">
                <h1 className="h4 mb-5 fw-normal text-center">Registration</h1>
                <div className="container w-25">
                    <form id="userForm" action="@{/users/register}" encType="multipart/form-data" method="post">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input className="form-control" id="username"></input>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input className="form-control" id="firstName"></input>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input className="form-control" id="lastName"></input>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input className="form-control" type="file" id="image"></input>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input className="form-control" type="email" id="email"></input>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                            <input className="form-control" id="phoneNumber"></input>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input className="form-control" type="password" id="inputPassword"></input>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input className="form-control" type="password" id="confirmPassword"></input>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="mb-3 text-center text-danger">
                        </div>
                        <button type="button" onClick={onSignUp} className="btn btn-lg btn-outline-success w-100 mt-2">Submit
                        </button>
                        <p className="mt-3 mb-3 text-center">Already have an account?<br/>
                            <NavLink className="text-dark" to="/sign-in">Sign In!</NavLink>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registration;