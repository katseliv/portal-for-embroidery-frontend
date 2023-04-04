import React from "react";
import {Field, reduxForm} from "redux-form";
import Preloader from "../common/Preloader";
import {DateInput, FileInput, Input, TextArea} from "../common/form-control/FormControl";
import {mapFileToBase64} from "../../utils/file-helpers";
import {
    mustBeEmail,
    mustContainLetter,
    mustNotBeOutOfRange,
    mustNotContainLetter,
    mustNotContainNumber,
    requiredField
} from "../../utils/validators/validators";

const errorStyle = {color: "#dc3545"};

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
                <UserProfileUpdateReduxForm role={props.profile.role} onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

const UserProfileUpdateForm = ({handleSubmit, error, role}) => {
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
                <Field component={FileInput} name={"image"} label={"Image"} type="file"/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"email"} label={"Email"} validate={[requiredField, mustBeEmail]}/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"phoneNumber"} label={"Phone Number"}
                       validate={[requiredField, mustNotContainLetter, mustNotBeOutOfRange]}/>
            </div>
            {role === "DESIGNER" &&
                <>
                    <div className="mb-3">
                        <Field component={DateInput} name={"experiencedSince"} label={"Experienced Since"}/>
                    </div>
                    <div className="mb-3">
                        <Field component={TextArea} name={"description"} label={"Description"}/>
                    </div>
                </>}
            {error && <div className="mb-3" style={errorStyle}>{error}</div>}
            <button className="btn btn-lg btn-outline-success w-100 mt-2">Edit</button>
        </form>
    );
}

const UserProfileUpdateReduxForm = reduxForm({
    form: "userProfileUpdateForm",
    enableReinitialize: true,
})(UserProfileUpdateForm);

export default UserProfileUpdate;