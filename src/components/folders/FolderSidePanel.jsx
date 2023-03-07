import React, {useState} from "react";
import Preloader from "../common/Preloader";
import FolderGrid from "./FolderGrid";
import FileCreate from "./files/FileCreate";

const FolderSidePanel = (props) => {
    const [createMode, setCreateMode] = useState(false);

    if (props.isFetching) {
        return <Preloader/>;
    }

    const activateCreateMode = () => {
        setCreateMode(true);
    };

    const onAddFile = (file) => {
        props.onAddFile(file);
        setCreateMode(false);
    }

    return (
        <>
            {createMode
                ? <FileCreate currentFolder={props.currentFolder} onAddFile={onAddFile}/>
                : <FolderGrid profileId={props.profileId}
                              folders={props.folders}
                              files={props.files}
                              path={props.path}
                              currentFolder={props.currentFolder}
                              currentPage={props.currentPage}
                              pageSize={props.pageSize}
                              totalCount={props.totalCount}
                              isFetching={props.isFetching}
                              onAddFolder={props.onAddFolder}
                              onUpdateFolder={props.onUpdateFolder}
                              onUpdateFile={props.onUpdateFile}
                              onPageChange={props.onPageChange}
                              onFolderChange={props.onFolderChange}
                              onBackHome={props.onBackHome}
                              onSetPath={props.onSetPath}
                              activateCreateMode={activateCreateMode}/>}
        </>
    );
}

export default FolderSidePanel;