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
        setEditMode(true);
    };

    const onUploadImage = (e) => {
        if (e.target.file.length) {
            props.saveImage(e.target.file[0]);
        }
    }

    const onSaveProfile = (profile) => {
        props.onSaveProfile(profile).then(() => {
            setEditMode(false);
        });
    }

    return (
        <>
            {editMode
                ? <UserProfileUpdate profile={props.profile} onSaveProfile={onSaveProfile}/>
                : <UserProfileInfo profile={props.profile}
                                   isOwner={props.isOwner}
                                   onUploadImage={onUploadImage}
                                   activateEditMode={activateEditMode}/>
            }
        </>
    );
}

export default UserProfile;