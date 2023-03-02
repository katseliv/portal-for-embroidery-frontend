import React from "react";
import Carousel from "../common/Carousel";
import Preloader from "../common/Preloader";
import CommentListContainer from "../comments/CommentListContainer";
import {base64ToArrayBuffer, saveByteArray} from "../../utils/file-helpers";

const PostProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>;
    }

    let mappedFiles = props.profile.files.map(file =>
        <a key={file.id} className="link-success px-1" href="javascript: undefined;"
           onClick={() => saveByteArray(file.name, file.extension, base64ToArrayBuffer(file.base64StringFile))}>
            {file.name + "." + file.extension}
        </a>);
    let mappedTags = props.profile.tags.map((tag, index) =>
        <a key={index} className="link-success px-1" href="javascript: undefined;">
            {"#" + tag}
        </a>);

    return (
        <div>
            <div className="container p-5 overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-5 mb-3">
                            <Carousel files={props.profile.files}/>
                        </div>
                        <div className="col-7">
                            <h1 className="h4 mb-5 fw-normal text-center">{props.profile.designName}</h1>
                            <h6 className="h5 mb-3 fw-normal text-right">{props.profile.description}</h6>
                            <h6 className="h5 mb-3 fw-normal text-right">As with all forms of matter, a liquid
                                is composed of particles—atoms and molecules—that move about in relation to each
                                other. Each state is distinguished from the others by the behavior of its
                                particles. The particles in a liquid are situated near each other but
                                are not as close together as the particles in solids—nor as far apart as those
                                in gases. Unlike the particles in solids, which are fixed in place, the
                                particles in liquids can slide past each other, though they cannot move as
                                freely as the particles in gases.
                            </h6>
                            <h6 className="h5 mb-3 fw-normal text-right">
                                Author: {props.profile.designerFirstName + " " + props.profile.designerLastName}
                            </h6>
                            <h6 className="h5 mb-3 fw-normal text-right">
                                Files: {mappedFiles}
                            </h6>
                            <h6 className="h5 mb-3 fw-normal text-right">
                                Tags: {mappedTags}
                            </h6>
                            {props.isAuthenticated && props.userProfile && (props.userProfile.role === "ADMIN" || props.userProfile.role === "DESIGNER")
                                ? <div className="btn-group mt-2 w-100" role="group">
                                    <button className="btn btn-lg btn-outline-success"
                                            onClick={props.activateCreateTagsMode}>
                                        Add Tags
                                    </button>
                                    <button className="btn btn-lg btn-outline-success" onClick={props.activateEditMode}>
                                        Edit
                                    </button>
                                </div>
                                : <button className="btn btn-lg btn-outline-secondary w-100"
                                          onClick={() => props.navigate("/designs")}>
                                    Back
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <CommentListContainer postId={props.profile.id} userId={props.authorizedUserId}/>
        </div>
    );
}

export default PostProfileInfo;