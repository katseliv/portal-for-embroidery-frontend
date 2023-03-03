import React from 'react';
import {Input} from "../common/form-control/FormControl";
import {NavLink} from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {
    mustBeEmail, mustBePassword,
    mustContainLetter, mustNotBeOutOfRange,
    mustNotContainLetter,
    mustNotContainNumber,
    requiredField
} from "../../utils/validators/validators";

const errorStyle = {color: "#dc3545"};

const RegistrationForUser = (props) => {
    const onSubmit = (formData) => {
        props.onSignUp({...formData, roleId: 3});
    }

    return <RegistrationForUserReduxForm onSubmit={onSubmit}/>;
}

const RegistrationForUserForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <Field component={Input} name={"username"} label={"Username"}
                       validate={[requiredField, mustContainLetter]}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"firstName"} label={"First Name"}
                       validate={[requiredField, mustNotContainNumber]}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"lastName"} label={"Last Name"}
                       validate={[requiredField, mustNotContainNumber]}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"email"} label={"Email"} validate={[requiredField, mustBeEmail]}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"phoneNumber"} label={"Phone Number"}
                       validate={[requiredField, mustNotContainLetter, mustNotBeOutOfRange]}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"password"} label={"Password"} validate={[requiredField, mustBePassword]}
                       type={"password"}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"passwordConfirmation"} label={"Password Confirmation"}
                       validate={[requiredField, mustBePassword]} type={"password"}/>
            </div>
            {error && <div className="mb-3" style={errorStyle}>{error}</div>}
            <button className="btn btn-lg btn-outline-success w-100 mt-2">Submit</button>
            <p className="mt-3 mb-3 text-center">Already have an account?<br/>
                <NavLink className="text-dark" to="/sign-in">Sign In!</NavLink>
            </p>
        </form>
    );
}

const RegistrationForUserReduxForm = reduxForm({
    form: "userRegistrationForm",
    enableReinitialize: true
})(RegistrationForUserForm);

export default RegistrationForUser;