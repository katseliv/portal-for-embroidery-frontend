import {authAPI, userAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {setUserProfileActionCreator} from "./profile-reducer";

const SET_USER_DATA = "SET-USER";

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuthenticated: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                id: action.id,
                login: action.login,
                email: action.email,
                isAuthenticated: action.isAuthenticated
            };
        default:
            return state;
    }
}

export const setUserActionCreator = (id, login, email, isAuthenticated) => ({
    type: SET_USER_DATA, id: id, login: login, email: email, isAuthenticated: isAuthenticated
});

export const getUserThunkCreator = (userId) => {
    return (dispatch) => {
        userAPI.getUser(userId).then(response => {
            if (response.status === 200) {
                dispatch(setUserActionCreator(response.data.id, response.data.login, response.data.email, true));
                dispatch(setUserProfileActionCreator(response.data));
            }
        });
    };
}
export const loginThunkCreator = (email, password) => {
    return (dispatch) => {
        authAPI.login(email, password).then(response => {
            if (response.status === 200) {
                dispatch(getUserThunkCreator(response.data.id));
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error...";
                dispatch(stopSubmit("loginForm", {_error: message}))
                return Promise.reject(message);
            }
        });
    };
}
export const logoutThunkCreator = () => {
    return (dispatch) => {
        authAPI.logout().then(response => {
            if (response.status === 200) {
                dispatch(setUserActionCreator(null, null, null, true));
            }
        });
    };
}