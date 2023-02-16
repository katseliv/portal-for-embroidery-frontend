import {userAPI} from "../api/api";

const UPDATE_PROFILE_BODY = "/profile/UPDATE-PROFILE-BODY";
const SET_USER_PROFILE = "/profile/SET-USER-PROFILE";
const SAVE_IMAGE = "/profile/SAVE-IMAGE";

let initialState = {
    profile: null
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_BODY:
            state.profileBody = action.body;
            return state;
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SAVE_IMAGE:
            return {...state, profile: {...action.profile, base64StringImage: action.image}};
        default:
            return state;
    }
}

export const setUserProfileActionCreator = (profile) => ({
    type: SET_USER_PROFILE,
    profile: profile
});
export const saveImageActionCreator = (image) => ({
    type: SAVE_IMAGE,
    image: image
});

export const getUserProfileThunkCreator = (userId) => {
    return (dispatch) => {
        userAPI.getUser(userId).then(response => {
            if (response.status === 200) {
                dispatch(setUserProfileActionCreator(response.data));
            }
        });
    };
}
export const saveImageThunkCreator = (image) => {
    return async (dispatch) => {
        let response = await userAPI.saveImage(image);

        if (response.status === 200) {
            dispatch(saveImageActionCreator(response.data.base64StringImage));
        }
    };
}