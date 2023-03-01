import React from "react";
import {Field, reduxForm} from "redux-form";
import {MultipleFileInput, Select, TextArea} from "../common/form-control/FormControl";
import {getExtension, getFileName, mapFileToBase64} from "../../utils/file-helpers";
import Preloader from "../common/Preloader";

const errorStyle = {color: "#dc3545"};

const PostProfileCreate = (props) => {
    if (props.isFetching) {
        return <Preloader/>;
    }

    const onSubmit = async (formData) => {
        let files = [];
        for (let i = 0; i < formData.files.length; i++) {
            let result = await mapFileToBase64(formData.files[i]);
            files.push({
                name: getFileName(formData.files[i].name),
                extension: getExtension(formData.files[i].name),
                base64StringFile: result,
                folderId: null
            });
        }

        formData.files = files;
        props.onAddPost(formData);
    }

    const mappedDesigners = props.designers.map(designer =>
        <option value={designer.id}>{designer.firstName + " " + designer.lastName}</option>);
    const mappedDesigns = props.designs.map(design => <option value={design.id}>{design.name}</option>);

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h3 mb-5 fw-normal text-center">Create New Post</h1>
            <div className="container">
                <PostProfileCreateReduxForm designers={mappedDesigners} designs={mappedDesigns} onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

const PostProfileCreateForm = ({designers, designs, handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <Field component={Select} name={"designerId"} label={"Select designer"}>
                    {designers}
                </Field>
            </div>
            <div className="mb-3">
                <Field component={Select} name={"designId"} label={"Select design"}>
                    {designs}
                </Field>
            </div>
            <div className="mb-3">
                <Field component={MultipleFileInput} name={"files"} label={"Select files"}/>
            </div>
            <div className="mb-3">
                <Field component={TextArea} name={"description"} label={"Description"}/>
            </div>
            {error && <div className="mb-3" style={errorStyle}>{error}</div>}
            <button className="btn btn-lg btn-outline-success w-100 mt-2" type="submit">Create</button>
        </form>
    );
}

const PostProfileCreateReduxForm = reduxForm({
    form: "postProfileCreateForm",
    enableReinitialize: true
})(PostProfileCreateForm);

export default PostProfileCreate;