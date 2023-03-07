import React from "react";

let Error = (props) => {
    const onBackHome = () => {
      props.navigate("/");
      props.setGlobalError(null);
    }

    return (
        <div className="container p-lg-5 m-lg-5 overflow-hidden">
            <div className="container py-5 overflow-hidden">
                <h1 className="h1 mb-5 fw-normal text-center">Error Page</h1>
                <div className="container w-25">
                    <h6 className="h3 mb-3 fw-normal text-center">{props.globalError.error + " " + props.globalError.status}</h6>
                    <h6 className="h3 mb-3 fw-normal text-center">{props.globalError.messages[0]}</h6>
                    <div className="py-4">
                        <button className="btn btn-outline-secondary w-100" onClick={() => onBackHome()}>Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error;