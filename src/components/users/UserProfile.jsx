import React from 'react';
import girl from '../../images/girl.png';
import FolderGrid from "../folders/FolderGrid";
import Preloader from "../common/Preloader";
import UserProfileStatus from "./UserProfileStatus";

const pStyle = {
    fontWeight: 600,
};

function UserProfile(props) {
    if (!props.profile) {
        return <Preloader/>;
    }

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-5 fw-normal text-center">Profile</h1>
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="mb-3">
                            <img src={girl} className="img-fluid" alt=""/>
                        </div>
                        <UserProfileStatus status={"Texting to you..."}/>
                        <p></p>
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
                        <form method="get" action="/profile/update">
                            <button type="submit" className="btn btn-lg btn-outline-success w-100 mt-2">Edit</button>
                        </form>
                    </div>
                    <div className="col-8"><FolderGrid/></div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;