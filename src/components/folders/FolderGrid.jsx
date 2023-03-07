import React from 'react';
import FolderItem from "./FolderItem";
import Preloader from "../common/Preloader";
import FileItem from "./files/FileItem";

const FolderGrid = (props) => {
    if (props.isFetching) {
        return <Preloader/>;
    }

    const foldersData = props.folders.map(folder => <FolderItem key={folder.id} number={folder.id}
                                                                name={folder.name}
                                                                editMode={!!folder.editMode}
                                                                onUpdateFolder={props.onUpdateFolder}
                                                                onFolderChange={props.onFolderChange}
                                                                onSetPath={props.onSetPath}/>);
    const filesData = props.files.map(file => <FileItem key={file.id} number={file.id} name={file.name}
                                                        onUpdateFile={props.onUpdateFile}/>);

    const onAddFolder = () => {
        const currentFolderId = props.currentFolder ? props.currentFolder.id : null;
        props.onAddFolder({
            name: "New Folder",
            parentFolderId: currentFolderId,
            creatorUserId: props.profileId
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
                    <div className="px-0 mt-lg-4">
                        <button className="btn btn-outline-secondary me-2" onClick={() => props.onBackHome()}>
                            Back To Home
                        </button>
                        <button className="btn btn-outline-success me-2" onClick={onAddFolder}>
                            Create New Folder
                        </button>
                        {props.currentFolder &&
                            <button className="btn btn-outline-success" onClick={onActivateCreateMode}>
                                Create New File
                            </button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FolderGrid;