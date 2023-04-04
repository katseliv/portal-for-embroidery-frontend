import React from "react";
import {Field, reduxForm} from "redux-form";
import {FileInput} from "../../common/form-control/FormControl";
import {getExtension, getFileName, mapFileToBase64} from "../../../utils/file-helpers";

const errorStyle = {color: "#dc3545"};

const FileCreate = (props) => {
    const onSubmit = async (formData) => {
        const result = await mapFileToBase64(formData.files[0]);
        const newFile = {
            name: getFileName(formData.files[0].name),
            extension: getExtension(formData.files[0].name),
            base64StringFile: result,
            designId: props.profile.id
        };
        props.onAddFile(newFile);
    }

    return (
        <div>
            <h1 className="h4 mb-3 fw-normal px-3 text-center">Download New File</h1>
            <div className="container w-100 border-top">
                <FileCreateReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

const FileCreateForm = ({handleSubmit, error}) => {
    return (
        <form className="py-3" onSubmit={handleSubmit}>
            <div className="mb-3">
                <Field component={FileInput} name={"files"} label={"Select file"}/>
            </div>
            {error && <div className="mb-3" style={errorStyle}>{error}</div>}
            <button className="btn btn-lg btn-outline-success w-100 mt-2" type="submit">Create</button>
        </form>
    );
}

const FileCreateReduxForm = reduxForm({
    form: "fileCreateForm",
    enableReinitialize: true
})(FileCreateForm);

export default FileCreate;