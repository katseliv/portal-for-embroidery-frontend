import React, {useEffect, useState} from 'react';
import design from "../../../images/design.svg";
import {NavLink} from "react-router-dom";

const DesignItem = (props) => {
    const [editMode, setEditMode] = useState(props.editMode);
    const [text, setText] = useState(props.name);

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
        props.onUpdateDesign(props.number, text);
    };

    return (
        <div className="col">
            <div className="h-50">
                <NavLink to={`/profile/design/${props.number}`}>
                    <img src={design} className="card-img-top" width={40} height={40} alt="..."/>
                </NavLink>
                <div className="">
                    {!editMode
                        ? <p className="card-title text-center" onDoubleClick={activateEditMode}>{props.name}</p>
                        : <input className="form-control form-control-sm" autoFocus={true} onChange={onTextChange}
                                 onBlur={deactivateEditMode} value={text}/>}
                </div>
            </div>
        </div>
    );
}

export default DesignItem;