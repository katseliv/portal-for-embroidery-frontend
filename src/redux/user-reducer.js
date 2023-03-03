import {designerProfileAPI, userAPI} from "../api/api";
import {reset, stopSubmit} from "redux-form";
import {loginThunkCreator} from "./auth-reducer";
import {setInitialPathActionCreator} from "./folder-reducer";

const ADD_USER = '/user/ADD-USER';
const UPDATE_USER = '/user/UPDATE-USER';
const DELETE_USER = '/user/DELETE-USER';
const SET_USERS = '/user/SET-USERS';
const SET_USER_PROFILE = '/user/SET-USER-PROFILE';
const SET_CURRENT_PAGE = '/user/SET-CURRENT-PAGE';
const SET_USERS_TOTAL_COUNT = '/user/SET-USERS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = '/user/TOGGLE-IS-FETCHING';

let initialState = {
    profile: null,
    users: [],
    currentPage: 1,
    pageSize: 5,
    totalCount: 4,
    isFetching: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, {...action.newUser}]
            };
        case UPDATE_USER:
            const base64StringImage = action.newProfile.base64StringImage === ""
                ? state.profile.base64StringImage
                : action.newProfile.base64StringImage;
            return {
                ...state,
                profile: {...state.profile, ...action.newProfile, base64StringImage: base64StringImage}
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(c => c.id !== action.userId)
            };
        case SET_USERS:
            return {...state, users: action.users};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_USERS_TOTAL_COUNT:
            return {...state, totalCount: action.totalCount};
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching};
        default:
            return state;
    }
}

export const addUserActionCreator = (newUser) => ({type: ADD_USER, newUser: newUser});
export const updateUserActionCreator = (userId, newProfile) => ({
    type: UPDATE_USER,
    userId: userId,
    newProfile: newProfile
});
export const deleteUserActionCreator = (userId) => ({type: DELETE_USER, userId: userId});

export const setUsersActionCreator = (users) => ({type: SET_USERS, users: users});
export const setUserProfileActionCreator = (profile) => ({
    type: SET_USER_PROFILE,
    profile: profile
});
export const setCurrentPageActionCreator = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalCountActionCreator = (totalCount) => ({
    type: SET_USERS_TOTAL_COUNT,
    totalCount: totalCount
});
export const setIsFetchingActionCreator = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
});

export const registerUserThunkCreator = (user) => {
    return async (dispatch) => {
        try {
            let responseCreateUser = await userAPI.registerUser(user);
            if (responseCreateUser.status === 201) {
                let newUser = responseCreateUser.data;
                let responseGetUser = await userAPI.getUser(newUser);
                if (responseGetUser.status === 200) {
                    dispatch(loginThunkCreator(user.email, user.password));
                    dispatch(addUserActionCreator(responseGetUser.data));
                    dispatch(reset("userRegistrationForm"));
                }
            }
        } catch (error) {
            const messages = error.response.data.messages;
            let message = messages.length > 0 ? messages[0] : "Some error occurred...";
            dispatch(stopSubmit("userRegistrationForm", {_error: message}))
            return Promise.reject(message);
        }
    };
}
export const registerDesignerThunkCreator = (designer) => {
    return async (dispatch) => {
        try {
            let responseCreateUser = await designerProfileAPI.createDesignerProfile(designer);
            if (responseCreateUser.status === 201) {
                let newUser = responseCreateUser.data;
                let responseGetUser = await userAPI.getUser(newUser);
                if (responseGetUser.status === 200) {
                    dispatch(loginThunkCreator(designer.email, designer.password));
                    dispatch(addUserActionCreator(responseGetUser.data));
                    dispatch(reset("designerRegistrationForm"));
                }
            }
        } catch (error) {
            const messages = error.response.data.messages;
            let message = messages.length > 0 ? messages[0] : "Some error occurred...";
            dispatch(stopSubmit("designerRegistrationForm", {_error: message}))
            return Promise.reject(message);
        }
    };
}
export const addUserThunkCreator = (user) => {
    return async (dispatch) => {
        try {
            let responseCreateUser = await userAPI.createUser(user);
            if (responseCreateUser.status === 201) {
                let newUser = responseCreateUser.data;
                let responseGetUser = await userAPI.getUser(newUser);
                if (responseGetUser.status === 200) {
                    dispatch(addUserActionCreator(responseGetUser.data));
                    dispatch(reset("userProfileCreateForm"));
                }
            }
        } catch (error) {
            const messages = error.response.data.messages;
            let message = messages.length > 0 ? messages[0] : "Some error occurred...";
            dispatch(stopSubmit("userProfileCreateForm", {_error: message}))
            return Promise.reject(message);
        }
    };
}
export const updateUserThunkCreator = (userId, newProfile) => {
    return async (dispatch) => {
        try {
            let response = await userAPI.updateUser(userId, newProfile);
            if (response.status === 200) {
                dispatch(updateUserActionCreator(userId, newProfile));
            }
        } catch (error) {
            const messages = error.response.data.messages;
            let message = messages.length > 0 ? messages[0] : "Some error occurred...";
            dispatch(stopSubmit("userProfileUpdateForm", {_error: message}))
            return Promise.reject(message);
        }
    };
}
export const deleteUserThunkCreator = (userId) => {
    return async (dispatch) => {
        let response = await userAPI.deleteUser(userId);
        if (response.status === 200) {
            dispatch(deleteUserActionCreator(userId));
        }
    };
}
export const getUsersThunkCreator = () => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        let response = await userAPI.getUsers();
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setUsersActionCreator(response.data.viewDtoList));
            dispatch(setTotalCountActionCreator(response.data.totalCount));
        }
    };
}
export const getUsersByNumberAndSizeThunkCreator = (pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(pageNumber));
        let response = await userAPI.getUsersByNumberAndSize(pageNumber, pageSize);
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setUsersActionCreator(response.data.viewDtoList));
        }
    };
}
export const getUserProfileThunkCreator = (userId) => {
    return async (dispatch) => {
        userAPI.getUser(userId).then(response => {
            if (response.status === 200) {
                dispatch(setUserProfileActionCreator(response.data));
                dispatch(setInitialPathActionCreator());
            }
        });
    };
}
export const getDesignerProfileThunkCreator = (designerId) => {
    return async (dispatch) => {
        designerProfileAPI.getDesignerProfile(designerId).then(response => {
            if (response.status === 200) {
                dispatch(setUserProfileActionCreator(response.data));
                dispatch(setInitialPathActionCreator());
            }
        });
    };
}