import React from "react";
import liquid from "../../images/liquid.png";
import liquid2 from "../../images/liquid2.png";
import abstract from "../../images/abstract.png";
import Carousel from "../common/Carousel";
import Preloader from "../common/Preloader";
import CommentListContainer from "../comments/CommentListContainer";

const PostProfile = (props) => {
    if (!props.profile) {
        return <Preloader/>;
    }

    let mappedFiles = props.profile.files.map(file => <a className="link-success px-1"
                                                         href="/">{file.name + "." + file.extension}</a>);
    let mappedTags = props.profile.tags.map(tag => <a className="link-success px-1" href="/">{"#" + tag}</a>);

    return (
        <div>
            <div className="container p-5 overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-5 mb-3">
                            <Carousel firstImage={liquid} secondImage={liquid2} thirdImage={abstract}/>
                            {/*<Carousel firstImage={`data:image/jpeg;base64,${props.profile.files[0]}`}*/}
                            {/*          secondImage={`data:image/jpeg;base64,${props.profile.files[1]}`}*/}
                            {/*          thirdImage={`data:image/jpeg;base64,${props.profile.files[2]}`}/>*/}
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
                            <form method="get" action="/designs/design/update">
                                <button type="submit" className="btn btn-lg btn-outline-success w-100 mt-2">Edit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <CommentListContainer postId={props.profile.id} userId={13}/>
        </div>
    );
}

export default PostProfile;