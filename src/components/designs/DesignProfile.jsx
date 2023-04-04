import React from 'react';
import design from "../../images/design.svg";
import Preloader from "../common/Preloader";
import FileGridContainer from "./files/FileGridContainer";

const pStyle = {
    fontWeight: 600,
};

const DesignProfile = (props) => {
    if (!props.profile) {
        return <Preloader/>;
    }

    return (
        <>
            <div className="container p-5 overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="mb-3">
                                <img src={design} className="img-fluid" alt=""/>
                            </div>
                            <p><span style={pStyle}>Design Name:</span> {props.profile.name}</p>
                            <p></p>
                            <p><span style={pStyle}>Folder Name:</span> {props.profile.folderName}</p>
                            <p></p>
                            <p><span
                                style={pStyle}>Creator Designer:</span> {props.profile.creatorDesignerFirstName + " " + props.profile.creatorDesignerLastName}
                            </p>
                            <p></p>
                        </div>
                        <div className="col-8">
                            {props.profile.id && <FileGridContainer/>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DesignProfile;