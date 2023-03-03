import React from 'react';
import person from '../../images/person-square.svg';
import FolderGridContainer from "../folders/FolderGridContainer";

const pStyle = {
    fontWeight: 600,
};

const UserProfileInfo = (props) => {
    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-5 fw-normal text-center">Profile</h1>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="mb-3">
                            <img src={props.profile.base64StringImage
                                ? `data:image/jpeg;base64,${props.profile.base64StringImage}` : person} className="img-fluid" alt=""/>
                        </div>
                        <p><span style={pStyle}>Username:</span> {props.profile.username}</p>
                        <p></p>
                        <p><span style={pStyle}>First Name:</span> {props.profile.firstName}</p>
                        <p></p>
                        <p><span style={pStyle}>Last Name:</span> {props.profile.lastName}</p>
                        <p></p>
                        <p><span style={pStyle}>Email:</span> {props.profile.email}</p>
                        <p></p>
                        <p><span style={pStyle}>Phone Number:</span> {props.profile.phoneNumber}</p>
                        <p></p>
                        {props.profile.role === "DESIGNER" && props.profile.experiencedSince && props.profile.description &&
                            <>
                                <p><span style={pStyle}>Experience:</span> {props.profile.experiencedSince}</p>
                                <p></p>
                                <p><span style={pStyle}>Description:</span> {props.profile.description}</p>
                                <p></p>
                            </>
                        }
                        {props.isOwner && <button className="btn btn-lg btn-outline-success w-100 mt-2"
                                                  onClick={props.activateEditMode}>Edit</button>}
                    </div>
                    <div className="col-8">
                        {props.profile.id && <FolderGridContainer/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfileInfo;