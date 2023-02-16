import React from 'react';
import FolderItem from "./FolderItem";

function FolderGrid() {
    return (
        <div className="container p-0 overflow-hidden">
            <h1 className="h4 mb-3 fw-normal text-center">Folders</h1><br/>
            <div className="container w-100">
                <div className="row row-cols-1 row-cols-md-5 g-4 border-top">
                    <FolderItem name={"Folder (1)"}/>
                    <FolderItem name={"Folder (2)"}/>
                    <FolderItem name={"Folder (3)"}/>
                    <FolderItem name={"Folder (4)"}/>
                    <FolderItem name={"Folder (5)"}/>
                    <FolderItem name={"In Progress"}/>
                    <FolderItem name={"Favorite posts"}/>
                    <FolderItem name={"Basket"}/>
                </div>
            </div>
        </div>
    );
}

export default FolderGrid;