import React from "react";
import preloader from "../../images/preloader.svg";

const Preloader = () => {
    return (
        <div className="text-center">
            <img src={preloader} alt={"Preloader"}/>
        </div>
    );
}

export default Preloader;