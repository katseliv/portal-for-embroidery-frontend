import React, {useState} from "react";
import Preloader from "../common/Preloader";
import PostProfileInfo from "./PostProfileInfo";
import PostProfileUpdate from "./PostProfileUpdate";

const PostProfile = (props) => {
    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>;
    }

    const activateEditMode = () => {
        props.initializePost();
        setEditMode(true);
    };

    const onSaveProfile = (profile) => {
        props.onSaveProfile(props.profile.id, profile.description);
        setEditMode(false);
    }

    return (
        <>
            {editMode
                ? <PostProfileUpdate profile={props.profile} onSaveProfile={onSaveProfile}/>
                : <PostProfileInfo profile={props.profile} activateEditMode={activateEditMode}/>
            }
        </>
    );
}

export default PostProfile;