import React, {useState} from 'react';
import Preloader from "../common/Preloader";
import UserProfileInfo from "./UserProfileInfo";
import UserProfileUpdate from "./UserProfileUpdate";

const UserProfile = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>;
    }

    const activateEditMode = () => {
        props.initializeUser();
        setEditMode(true);
    };

    const onSaveProfile = (profile) => {
        if (props.profile.role === "DESIGNER") {
            props.onSaveDesignerProfile(props.profile.id, profile);
        } else {
            props.onSaveUserProfile(props.profile.id, profile);
        }
        setEditMode(false);
    }

    return (
        <>
            {editMode
                ? <UserProfileUpdate profile={props.profile} onSaveProfile={onSaveProfile}/>
                : <UserProfileInfo profile={props.profile}
                                   isOwner={props.isOwner}
                                   activateEditMode={activateEditMode}/>
            }
        </>
    );
}

export default UserProfile;