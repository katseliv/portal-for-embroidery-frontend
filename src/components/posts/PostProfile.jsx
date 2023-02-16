import React from "react";
import liquid from '../../images/liquid.png';
import liquid2 from '../../images/liquid2.png';
import abstract from '../../images/abstract.png';
import CommentListContainer from "../comments/CommentListContainer";

const carouselStyle = {
    width: '100%',
    height: '600px'
};

function PostProfile(props) {
    return (
        <div>
            <div className="container p-5 overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-5">
                            <div className="mb-3">
                                <div id="carouselExampleIndicators" className="carousel slide"
                                     data-bs-ride="carousel">
                                    <div className="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to="0" className="active" aria-current="true"
                                                aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators"
                                                data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>
                                    <div className="carousel-inner" style={carouselStyle}>
                                        <div className="carousel-item active">
                                            <img src={liquid} className="d-block w-100" alt=""/>
                                        </div>
                                        <div className="carousel-item">
                                            <img src={liquid2} className="d-block w-100" alt=""/>
                                        </div>
                                        <div className="carousel-item">
                                            <img src={abstract} className="d-block w-100" alt=""/>
                                        </div>
                                    </div>
                                    <button className="carousel-control-prev" type="button"
                                            data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button"
                                            data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-7">
                            <h1 className="h4 mb-5 fw-normal text-center">{props.title}</h1>
                            <h6 className="h5 mb-3 fw-normal text-right">Liquid is one of the three principle
                                states of matter. In its characteristics, a liquid is intermediate between a gas
                                and a solid, the other two principle states. Like gases, liquids can flow and
                                take on the shape of the container in which they are placed—characteristics not
                                found in solids. Like solids, liquids have a fixed volume, whereas gases do not.</h6>
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
                                Files:&nbsp;
                                <a href="public/postage-heart.svg">postage-heart.svg</a>,
                                <a href="public/postage-heart-mini.svg">postage-heart-mini.svg</a>
                            </h6>
                            <h6 className="h5 mb-3 fw-normal text-right">
                                Tags:&nbsp;
                                <a href="/">#liquid</a>,
                                <a href="/">#water</a>
                            </h6>
                            <form method="get" action="/designs/design/update">
                                <button type="submit" className="btn btn-lg btn-outline-success w-100 mt-2">Edit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <CommentListContainer postId={3} userId={13}/>
        </div>
    );
}

export default PostProfile;