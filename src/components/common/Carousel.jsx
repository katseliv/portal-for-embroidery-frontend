import React from "react";
import liquid from "../../images/liquid.png";
import liquid2 from "../../images/liquid2.png";
import abstract from "../../images/abstract.png";

const carouselStyle = {
    width: '100%',
    height: '600px'
};

let Carousel = (props) => {
    let counter = 0;

    let carouselIndicators = props.files.map((file, index) => {
            if (file.extension !== "jpeg") {
                return;
            }
            if (index === 0) {
                return <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                               className="active" aria-current="true"/>;
            } else {
                counter++;
                return <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={counter}/>;
            }
        }
    );

    let carouselItems = props.files.map((file, index) => {
            if (file.extension !== "jpeg") {
                return;
            }
            if (index === 0) {
                return <div className="carousel-item active">
                    <img src={`data:image/${file.extension};base64,${file.base64StringFile}`} className="d-block w-100"
                         alt=""/>
                </div>;
            } else {
                return <div className="carousel-item">
                    <img src={`data:image/${file.extension};base64,${file.base64StringFile}`} className="d-block w-100"
                         alt=""/>
                </div>;
            }
        }
    );

    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {carouselIndicators}
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2}/>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={3}/>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={4}/>
            </div>
            <div className="carousel-inner" style={carouselStyle}>
                {carouselItems}
                <div className="carousel-item">
                    <img src={liquid} className="d-block w-100 active" alt=""/>
                </div>
                <div className="carousel-item">
                    <img src={liquid2} className="d-block w-100" alt=""/>
                </div>
                <div className="carousel-item">
                    <img src={abstract} className="d-block w-100" alt=""/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;