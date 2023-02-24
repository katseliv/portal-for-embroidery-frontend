import React from 'react';
import file from "../../../images/file.svg";

const FileItem = (props) => {
    return (
        <div className="col">
            <div className="h-50">
                <img src={file} className="card-img-top" width={40} height={40} alt="..."/>
                <div className="">
                    <p className="card-title text-center">{props.name}</p>
                </div>
            </div>
        </div>
    );
}

export default FileItem;