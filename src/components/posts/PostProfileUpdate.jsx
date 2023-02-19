import React from "react";
import {TextArea} from "../common/form-control/FormControl";
import {Field, reduxForm} from "redux-form";
import Preloader from "../common/Preloader";

const PostProfileUpdate = (props) => {
    if (!props.profile) {
        return <Preloader/>;
    }

    const onSubmit = (formData) => {
        props.onSaveProfile(formData);
    }

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h3 mb-5 fw-normal text-center">Edit Profile</h1>
            <div className="container">
                <PostProfileUpdateReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

const PostProfileUpdateForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="mb-3">
                <Field component={TextArea} name={"description"} label={"Description"}/>
                <div className="invalid-feedback"></div>
            </div>
            <button className="btn btn-lg btn-outline-success w-100 mt-2" type="submit">Edit</button>
        </form>
    );
}

const PostProfileUpdateReduxForm = reduxForm({
    form: "postProfileUpdateForm",
    enableReinitialize: true
})(PostProfileUpdateForm);

export default PostProfileUpdate;