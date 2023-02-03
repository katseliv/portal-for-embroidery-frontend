const UPDATE_PROFILE_BODY = "UPDATE-PROFILE-BODY";
const SET_USER_PROFILE = "SET-USER-PROFILE";

let initialState = {
    profile: null
}

export const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_PROFILE_BODY:
            state.profileBody = action.body;
            return state;
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        default:
            return state;
    }
}

export const setUserProfileActionCreator = (profile) => ({
    type: SET_USER_PROFILE,
    profile: profile
});