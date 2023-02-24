import React from 'react';
import FolderItem from "./FolderItem";
import Preloader from "../common/Preloader";
import FileItem from "./files/FileItem";

const FolderGrid = (props) => {
    if (props.isFetching) {
        return <Preloader/>;
    }

    let foldersData = props.folders.map(folder => <FolderItem key={folder.id} number={folder.id} name={folder.name}
                                                              onFolderChange={props.onFolderChange}
                                                              onSetPath={props.onSetPath}/>);
    let filesData = props.files.map(file => <FileItem key={file.id} number={file.id} name={file.name}/>);

    return (
        <div className="container p-0 overflow-hidden">
            <h1 className="h4 mb-3 fw-normal px-3">Folders & Files: {props.path}</h1><br/>
            <div className="container w-100">
                <div className="row row-cols-1 row-cols-md-5 g-4 border-top">
                    {foldersData}
                    {filesData}
                </div>
                <div className="row">
                    <div className="col-8 p-0">
                        <button className="btn btn-outline-secondary mt-lg-4" type="file"
                                onClick={() => props.onBackHome()}>
                            Back To Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FolderGrid;