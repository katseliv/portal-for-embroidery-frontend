const carouselStyle = {
    width: '100%',
    height: '600px'
};

let Carousel = (props) => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                        className="active" aria-current="true"/>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"/>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"/>
            </div>
            <div className="carousel-inner" style={carouselStyle}>
                <div className="carousel-item active">
                    <img src={props.firstImage} className="d-block w-100" alt=""/>
                </div>
                <div className="carousel-item">
                    <img src={props.secondImage} className="d-block w-100" alt=""/>
                </div>
                <div className="carousel-item">
                    <img src={props.thirdImage} className="d-block w-100" alt=""/>
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