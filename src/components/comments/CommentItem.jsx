import React, {useEffect, useState} from "react";

const iStyle = {
    color: "#530FAD"
};
const borderStyle = {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#00000019",
    borderRadius: "0.25rem"
};
const CommentItem = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [text, setText] = useState(props.text);

    useEffect(() => {
        setText(props.text);
    }, [props.text]);

    const onTextChange = (e) => {
        setText(e.currentTarget.value);
    };

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.onUpdateComment(props.number, text);
    };

    return (
        <div aria-live="polite" aria-atomic="true"
             className="container justify-content-center align-items-center px-5 py-3 w-100">
            <div className="comment" style={borderStyle} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <i className="rounded me-2 bi-person-fill align-content-center" style={iStyle}></i>
                    <strong className="me-auto">{props.author}</strong>
                    <small>{props.date}</small>
                    {props.isAuthenticated &&
                        <button className="btn-close" aria-label="Закрыть"
                                onClick={() => props.onDeleteComment(props.number)}/>}
                </div>
                <div className="toast-body">
                    {!editMode
                        ? <span onDoubleClick={activateEditMode}>{text || "No comment..."}</span>
                        : <input className="form-control" autoFocus={true} onChange={onTextChange}
                                 onBlur={deactivateEditMode} value={text}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default CommentItem;