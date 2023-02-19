import React from "react";
import {TextArea} from "../common/form-control/FormControl";
import {Field, reduxForm} from "redux-form";

const PostProfileCreate = (props) => {
    const onSubmit = (formData) => {
        props.onSaveProfile(formData);
    }

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h3 mb-5 fw-normal text-center">Create New Post</h1>
            <div className="container">
                <PostProfileCreateReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

const PostProfileCreateForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="mb-3">
                <Field component={TextArea} name={"description"} label={"Description"}/>
                <div className="invalid-feedback"></div>
            </div>
            <button className="btn btn-lg btn-outline-success w-100 mt-2" type="submit">Create</button>
        </form>
    );
}

const PostProfileCreateReduxForm = reduxForm({
    form: "postProfileCreateForm",
    enableReinitialize: true
})(PostProfileCreateForm);

export default PostProfileCreate;