import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input, Select} from "../common/form-control/FormControl";
import {
    mustBeEmail, mustBePassword,
    mustContainLetter, mustNotBeOutOfRange,
    mustNotContainLetter,
    mustNotContainNumber,
    requiredField
} from "../../utils/validators/validators";

const errorStyle = {color: "#dc3545"};

const UserProfileCreate = (props) => {
    const onSubmit = (formData) => {
        props.onAddUser(formData);
    }

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h3 mb-5 fw-normal text-center">Create Profile</h1>
            <div className="container w-25">
                <UserProfileCreateReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

const UserProfileCreateForm = ({handleSubmit, error}) => {
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
                <Field component={Select} name={"roleId"} label={"Role"}>
                    <option value="1">Admin</option>
                    <option value="2">Designer</option>
                    <option value="3">User</option>
                </Field>
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
        </form>
    );
}

const UserProfileCreateReduxForm = reduxForm({
    form: "userProfileCreateForm",
    enableReinitialize: true
})(UserProfileCreateForm);

export default UserProfileCreate;