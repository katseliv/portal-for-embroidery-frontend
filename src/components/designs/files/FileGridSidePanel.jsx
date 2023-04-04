import React, {useState} from 'react';
import Preloader from "../../common/Preloader";
import FileCreate from "./FileCreate";
import FileGrid from "./FileGrid";

const FileGridSidePanel = (props) => {
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
                ? <FileCreate profile={props.profile} onAddFile={onAddFile}/>
                : <FileGrid files={props.files}
                            isFetching={props.isFetching}
                            onUpdateFile={props.onUpdateFile}
                            activateCreateMode={activateCreateMode}/>}
        </>
    );
}

export default FileGridSidePanel;