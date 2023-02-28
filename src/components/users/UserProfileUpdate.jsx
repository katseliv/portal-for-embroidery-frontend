import React from "react";
import {Field, reduxForm} from "redux-form";
import Preloader from "../common/Preloader";
import {FileInput, Input} from "../common/form-control/FormControl";
import {mapFileToBase64} from "../../utils/file-helpers";

const UserProfileUpdate = (props) => {
    if (!props.profile) {
        return <Preloader/>;
    }

    const onSubmit = async (formData) => {
        const base64StringImage = formData.image ? await mapFileToBase64(formData.image[0]) : "";
        formData = {...props.profile, ...formData, base64StringImage: base64StringImage};
        props.onSaveProfile(formData);
    }

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h3 mb-5 fw-normal text-center">Edit Profile</h1>
            <div className="container w-25">
                <UserProfileUpdateReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

const UserProfileUpdateForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <Field component={Input} name={"username"} label={"Username"}/>
                <div className="invalid-feedback"></div>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"firstName"} label={"First Name"}/>
                <div className="invalid-feedback"></div>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"lastName"} label={"Last Name"}/>
                <div className="invalid-feedback"></div>
            </div>
            <div className="mb-3">
                <Field component={FileInput} name={"image"} label={"Image"} type="file"/>
                <div className="invalid-feedback"></div>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"email"} label={"Email"}/>
                <div className="invalid-feedback"></div>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"phoneNumber"} label={"Phone Number"}/>
                <div className="invalid-feedback"></div>
            </div>
            <button className="btn btn-lg btn-outline-success w-100 mt-2">Edit</button>
        </form>
    );
}

const UserProfileUpdateReduxForm = reduxForm({
    form: "userProfileUpdateForm",
    enableReinitialize: true
})(UserProfileUpdateForm);

export default UserProfileUpdate;