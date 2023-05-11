import React, {useState} from "react";
import Carousel from "../common/Carousel";
import Preloader from "../common/Preloader";
import CommentListContainer from "../comments/CommentListContainer";
import {base64ToArrayBuffer, saveByteArray} from "../../utils/file-helpers";
import ModelPanel from "../common/ModelPanel";

const PostProfileInfo = (props) => {
    const [modelMode, setModelMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>;
    }

    const activateModelMode = () => {
        setModelMode(true);
    };

    const deactivateModelMode = () => {
        setModelMode(false);
    };

    const mappedFiles = props.profile.files.map(file =>
        <a key={file.id} className="link-success px-1" href="javascript: undefined;"
           onClick={() => saveByteArray(file.name, file.extension, base64ToArrayBuffer(file.base64StringFile))}>
            {file.name + "." + file.extension}
        </a>);
    const mappedTags = props.profile.tags.map((tag, index) =>
        <a key={index} className="link-success px-1" href="javascript: undefined;">
            {"#" + tag}
        </a>);

    return (
        <div>
            {modelMode
                ? <ModelPanel files={props.profile.files} deactivateModelMode={deactivateModelMode}/>
                : <div>
                    <div className="container p-5 overflow-hidden">
                        <div className="container">
                            <div className="row">
                                <div className="col-5 mb-3">
                                    <Carousel files={props.profile.files}/>
                                </div>
                                <div className="col-7">
                                    <h1 className="h4 mb-5 fw-normal text-center">{props.profile.designName}</h1>
                                    <h6 className="h5 mb-3 fw-normal text-right">{props.profile.description}</h6>
                                    <h6 className="h5 mb-3 fw-normal text-right">This lotus design will look fabulous
                                        stitched on a cushion cover, or framed as a decoration for your wall.
                                        DMC Mouliné Spécial threads will show your stitches off at their best.
                                        Our patterns and quality supplies make it easy for you to complete your
                                        project. Colourfast and fade resistant DMC threads keep stitches looking
                                        vibrant for generations to come.</h6>
                                    <h6 className="h5 mb-3 fw-normal text-right">
                                        Author: {props.profile.designerFirstName + " " + props.profile.designerLastName}
                                    </h6>
                                    <h6 className="h5 mb-3 fw-normal text-right">
                                        Files: {mappedFiles}
                                    </h6>
                                    <h6 className="h5 mb-3 fw-normal text-right">
                                        Tags: {mappedTags}
                                    </h6>
                                    {props.isAuthenticated && (props.authorizedUserRole === "ADMIN" || props.authorizedUserRole === "DESIGNER")
                                        ? <div className="btn-group mt-2 w-100" role="group">
                                            <button className="btn btn-lg btn-outline-success" onClick={activateModelMode}>
                                                Show Model
                                            </button>
                                            <button className="btn btn-lg btn-outline-success"
                                                    onClick={props.activateCreateTagsMode}>
                                                Add Tags
                                            </button>
                                            <button className="btn btn-lg btn-outline-success"
                                                    onClick={props.activateEditMode}>
                                                Edit
                                            </button>
                                        </div>
                                        : <div className="btn-group mt-2 w-100" role="group">
                                            <button className="btn btn-lg btn-outline-success" onClick={activateModelMode}>
                                                Show Model
                                            </button>
                                            <button className="btn btn-lg btn-outline-secondary"
                                                    onClick={() => props.navigate("/designs")}>
                                                Back
                                            </button>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <CommentListContainer postId={props.profile.id} userId={props.authorizedUserId}/>
                </div>}
        </div>
    );
}

export default PostProfileInfo;