import React from 'react';
import FileItem from "./FileItem";
import Preloader from "../../common/Preloader";

const FileGrid = (props) => {
    if (props.isFetching) {
        return <Preloader/>;
    }

    const filesData = props.files.map(folder => <FileItem key={folder.id} number={folder.id} name={folder.name}
                                                          onUpdateFile={props.onUpdateFile}/>);

    const onActivateCreateMode = () => {
        props.activateCreateMode();
    };

    return (
        <div className="container p-0 overflow-hidden">
            <h1 className="h4 mb-3 fw-normal px-3">Files of Design</h1><br/>
            <div className="container w-100">
                <div className="row row-cols-1 row-cols-md-5 g-4 border-top">
                    {filesData}
                </div>
                <div className="row">
                    <div className="px-0 mt-lg-4">
                        <button className="btn btn-outline-success" onClick={onActivateCreateMode}>
                            Create New File
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FileGrid;