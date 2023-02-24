import React, {useEffect, useState} from 'react';
import folder from "../../images/folder.svg";

const FolderItem = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [text, setText] = useState(props.name);

    useEffect(() => {
        setText(props.name);
    }, [props.name]);

    const onTextChange = (e) => {
        setText(e.currentTarget.value);
    };

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        // props.onUpdateComment(props.number, text);
    };

    return (
        <div className="col">
            <div className="h-50">
                <img src={folder} className="card-img-top" width={40} height={40}
                     onDoubleClick={() => {
                         props.onFolderChange(props.number);
                         props.onSetPath(props.name);
                     }} alt="..."/>
                <div className="">
                    {!editMode
                        ? <p className="card-title text-center" onDoubleClick={activateEditMode}>{props.name}</p>
                        : <input className="form-control form-control-sm" autoFocus={true} onChange={onTextChange}
                                 onBlur={deactivateEditMode} value={text}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default FolderItem;