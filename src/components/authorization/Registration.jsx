import React from 'react';
import {Input} from "../common/form-control/FormControl";
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";

const Registration = (props) => {
    const onSubmit = (formData) => {
        props.onSignUp({...formData, roleId: 3});
    }

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-5 fw-normal text-center">Registration</h1>
            <div className="container w-25">
                <RegistrationReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

const RegistrationForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <Field component={Input} name={"username"} label={"Username"}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"firstName"} label={"First Name"}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"lastName"} label={"Last Name"}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"email"} label={"Email"}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"phoneNumber"} label={"Phone Number"}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"password"} label={"Password"} type={"password"}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"passwordConfirmation"} label={"Password Confirmation"} type={"password"}/>
            </div>
            <button className="btn btn-lg btn-outline-success w-100 mt-2">Submit</button>
            <p className="mt-3 mb-3 text-center">Already have an account?<br/>
                <NavLink className="text-dark" to="/sign-in">Sign In!</NavLink>
            </p>
        </form>
    );
}

const RegistrationReduxForm = reduxForm({
    form: "registrationForm",
    enableReinitialize: true
})(RegistrationForm);

export default Registration;