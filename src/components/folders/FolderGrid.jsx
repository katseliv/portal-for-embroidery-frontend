import React from 'react';
import FolderItem from "./FolderItem";
import Preloader from "../common/Preloader";
import DesignItem from "./designs/DesignItem";

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
    const designData = props.designs.map(design => <DesignItem key={design.id} number={design.id}
                                                               name={design.name}
                                                               editMode={!!design.editMode}
                                                               onUpdateDesign={props.onUpdateDesign}/>);

    const onAddFolder = () => {
        const currentFolderId = props.currentFolder ? props.currentFolder.id : null;
        props.onAddFolder({
            name: "New Folder",
            parentFolderId: currentFolderId,
            creatorUserId: props.profileId
        });
    };

    const onAddDesign = () => {
        const currentFolderId = props.currentFolder ? props.currentFolder.id : null;
        props.onAddDesign({
            name: "New Design",
            folderId: currentFolderId,
            creatorDesignerId: props.profileId
        });
    };

    return (
        <div className="container p-0 overflow-hidden">
            <h1 className="h4 mb-3 fw-normal px-3">Folders & Designs: {props.path}</h1><br/>
            <div className="container w-100">
                <div className="row row-cols-1 row-cols-md-5 g-4 border-top">
                    {foldersData}
                    {designData}
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
                            <button className="btn btn-outline-success" onClick={onAddDesign}>
                                Create New Design
                            </button>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FolderGrid;