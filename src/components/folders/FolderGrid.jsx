import React from 'react';
import FolderItem from "./FolderItem";
import Preloader from "../common/Preloader";
import FileItem from "./files/FileItem";

const FolderGrid = (props) => {
    if (props.isFetching) {
        return <Preloader/>;
    }

    let foldersData = props.folders.map(folder => <FolderItem key={folder.id} number={folder.id} name={folder.name}
                                                              editMode={!!folder.editMode}
                                                              onUpdateFolder={props.onUpdateFolder}
                                                              onFolderChange={props.onFolderChange}
                                                              onSetPath={props.onSetPath}/>);
    let filesData = props.files.map(file => <FileItem key={file.id} number={file.id} name={file.name}
                                                      onUpdateFile={props.onUpdateFile}/>);

    const onAddFolder = () => {
        let currentFolderId = props.currentFolder ? props.currentFolder.id : null;
        props.onAddFolder({
            name: "New Folder",
            parentFolderId: currentFolderId,
            creatorDesignerId: props.profileId
        });
    };

    const onActivateCreateMode = () => {
        props.activateCreateMode();
    };

    return (
        <div className="container p-0 overflow-hidden">
            <h1 className="h4 mb-3 fw-normal px-3">Folders & Files: {props.path}</h1><br/>
            <div className="container w-100">
                <div className="row row-cols-1 row-cols-md-5 g-4 border-top">
                    {foldersData}
                    {filesData}
                </div>
                <div className="row">
                    <div className="px-0">
                        <div className="btn-group mt-lg-4" role="group" aria-label="Basic outlined example">
                            <button className="btn btn-outline-secondary" onClick={() => props.onBackHome()}>
                                Back To Home
                            </button>
                            <button className="btn btn-outline-success" onClick={onAddFolder}>Create New Folder</button>
                            {props.currentFolder &&
                                <button className="btn btn-outline-success" onClick={onActivateCreateMode}>
                                    Create New File
                                </button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FolderGrid;