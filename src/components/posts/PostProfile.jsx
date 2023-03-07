import React, {useState} from "react";
import Preloader from "../common/Preloader";
import TagsCreate from "./tags/TagsCreate";
import PostProfileInfo from "./PostProfileInfo";
import PostProfileUpdate from "./PostProfileUpdate";

const PostProfile = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [createTagsMode, setCreateTagsMode] = useState(false);

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

    const activateCreateTagsMode = () => {
        setCreateTagsMode(true);
    };

    const onAddTags = (tags) => {
        props.onAddTags(props.profile.id, tags)
        setCreateTagsMode(false);
    }

    return (
        <>
            {editMode
                ? <PostProfileUpdate profile={props.profile} onSaveProfile={onSaveProfile}/>
                : createTagsMode
                    ? <TagsCreate onAddTags={onAddTags}/>
                    : <PostProfileInfo profile={props.profile}
                                       authorizedUserId={props.authorizedUserId}
                                       authorizedUserRole={props.authorizedUserRole}
                                       isAuthenticated={props.isAuthenticated}
                                       navigate={props.navigate}
                                       activateCreateTagsMode={activateCreateTagsMode}
                                       activateEditMode={activateEditMode}/>}
        </>
    );
}

export default PostProfile;