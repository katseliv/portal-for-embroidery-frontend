import React from 'react';
import {NavLink} from "react-router-dom";

const linkStyle = {
    color: "#530FAD",
};

const UserItem = (props) => {
    return (
        <tr>
            <th scope="row"><NavLink to={`/profile/${props.number}`} style={linkStyle}>{props.number}</NavLink></th>
            <td>{props.username}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>
                <button className="btn btn-outline-success">Edit</button>
            </td>
            <td>
                <button className="btn btn-outline-danger" onClick={() => props.onDeleteUser(props.number)}>
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default UserItem;