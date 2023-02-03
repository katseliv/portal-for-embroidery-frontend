import React from 'react';
import {NavLink} from "react-router-dom";

const linkStyle = {
    color: "#530FAD",
};

function UserItem(props) {
    return (
        <tr>
            <th scope="row"><NavLink to={`/profile/${props.number}`} style={linkStyle}>{props.number}</NavLink></th>
            <td>{props.username}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>
                <form action="/" method="get">
                    <button type="submit" className="btn btn-outline-success">Edit</button>
                </form>
            </td>
            <td>
                <form action="/" method="delete">
                    <button type="submit" className="btn btn-outline-danger">Delete</button>
                </form>
            </td>
        </tr>
    );
}

export default UserItem;