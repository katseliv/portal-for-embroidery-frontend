import React, {useEffect, useState} from "react";
import heartFill from "../../images/heart-fill.svg";
import heart from "../../images/heart.svg";

const iStyle = {
    color: "#530FAD"
};
const borderStyle = {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#00000019",
    borderRadius: "0.25rem"
};

const CommentItemWithHook = React.memo((props) => {
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
        props.onUpdateComment(props.id, text);
    };

    return (
        <div aria-live="polite" aria-atomic="true"
             className="container justify-content-center align-items-center px-5 py-3 w-100">
            <div className="comment" style={borderStyle} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <i className="rounded me-2 bi-person-fill align-content-center" style={iStyle}></i>
                    <strong className="me-auto">{props.author}</strong>
                    <small>{props.date}</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Закрыть">
                    </button>
                </div>
                <div className="toast-body">
                    {/*{this.props.text}*/}
                    {!editMode
                        ? <span onDoubleClick={activateEditMode}>{this.state.text || "No comment..."}</span>
                        : <input className="form-control" autoFocus={true} onChange={onTextChange}
                                 onBlur={deactivateEditMode} value={text}/>
                    }

                    <div className="text-end">
                        {/*disabled={props.isLikingInProgress.some(c => id === c.id)}*/}
                        {props.liked
                            ? <img src={heartFill} onClick={() => {
                                props.dislike(props.id)
                            }} alt={"Unlike"}/>
                            : <img src={heart} onClick={() => {
                                props.like(props.id)
                            }} alt={"Like"}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CommentItemWithHook;