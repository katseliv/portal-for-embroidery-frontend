import React from "react";
import {FieldArray, reduxForm} from "redux-form";
import {TagsInput} from "../../common/form-control/FormControl";

const errorStyle = {color: "#dc3545"};

const TagsCreate = (props) => {
    const onSubmit = async (formData) => {
        props.onAddTags(formData.tags);
    }

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h3 mb-5 fw-normal text-center">Add New Tags</h1>
            <div className="container w-25">
                <TagsCreateReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

const TagsCreateForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <FieldArray component={TagsInput} name="tags"/>
            {error && <div className="mb-3" style={errorStyle}>{error}</div>}
            <button className="btn btn-lg btn-outline-success w-100 mt-2" type="submit">Add Tags</button>
        </form>
    );
}

const TagsCreateReduxForm = reduxForm({
    form: "tagsCreateForm",
    enableReinitialize: true
})(TagsCreateForm);

export default TagsCreate;