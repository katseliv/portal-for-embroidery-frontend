import React from 'react';
import FolderItem from "./FolderItem";
import Preloader from "../common/Preloader";

const FolderGrid = (props) => {
    if (props.isFetching) {
        return <Preloader/>;
    }

    let foldersData = props.folders.map(folder => <FolderItem key={folder.id} number={folder.id} name={folder.name}/>);

    return (
        <div className="container p-0 overflow-hidden">
            <h1 className="h4 mb-3 fw-normal text-center">Folders</h1><br/>
            <div className="container w-100">
                <div className="row row-cols-1 row-cols-md-5 g-4 border-top">
                    {foldersData}
                    {/*<FolderItem name={"Folder (1)"}/>*/}
                    {/*<FolderItem name={"Folder (2)"}/>*/}
                    {/*<FolderItem name={"Folder (3)"}/>*/}
                    {/*<FolderItem name={"Folder (4)"}/>*/}
                    {/*<FolderItem name={"Folder (5)"}/>*/}
                    {/*<FolderItem name={"In Progress"}/>*/}
                    {/*<FolderItem name={"Favorite posts"}/>*/}
                    {/*<FolderItem name={"Basket"}/>*/}
                </div>
            </div>
        </div>
    );
}

export default FolderGrid;