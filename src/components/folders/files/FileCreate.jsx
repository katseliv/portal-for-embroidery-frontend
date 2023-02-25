import React from "react";
import {Field, reduxForm} from "redux-form";
import {FileInput} from "../../common/form-control/FormControl";
import {getExtension, getFileName, mapFileToBase64} from "../../../utils/file-helpers";

const FileCreate = (props) => {
    const onSubmit = async (formData) => {
        let currentFolderId = props.currentFolder ? props.currentFolder.id : null;
        let result = await mapFileToBase64(formData.files[0]);
        let newFile = {
            name: getFileName(formData.files[0].name),
            extension: getExtension(formData.files[0].name),
            base64StringFile: result,
            folderId: currentFolderId
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

const FileCreateForm = (props) => {
    return (
        <form className="py-3" onSubmit={props.handleSubmit}>
            <div className="mb-3">
                <Field component={FileInput} name={"files"} label={"Select file"}/>
            </div>
            <button className="btn btn-lg btn-outline-success w-100 mt-2" type="submit">Create</button>
        </form>
    );
}

const FileCreateReduxForm = reduxForm({
    form: "fileCreateForm",
    enableReinitialize: true
})(FileCreateForm);

export default FileCreate;