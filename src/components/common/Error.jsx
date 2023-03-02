import React from "react";

let Error = (props) => {
    return (
        <div className="container p-lg-5 m-lg-5 overflow-hidden">
            <div className="container py-5 overflow-hidden">
                <h1 className="h1 mb-5 fw-normal text-center">Error Page</h1>
                <div className="container w-25">
                    <h6 className="h3 mb-3 fw-normal text-center">{props.error + " " + props.status}</h6>
                    <h6 className="h3 mb-3 fw-normal text-center">{props.message}</h6>
                </div>
            </div>
        </div>
    );
}

export default Error;