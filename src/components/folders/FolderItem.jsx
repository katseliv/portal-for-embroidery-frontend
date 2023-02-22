import React from 'react';
import folder from "../../images/folder.svg";

const FolderItem = (props) => {
    return (
        <div className="col">
            <div className="h-50">
                <img src={folder} className="card-img-top" width={40} height={40} alt="..."/>
                <div className="">
                    <p className="card-title text-center">{props.name}</p>
                </div>
            </div>
        </div>
    );
}

export default FolderItem;