import {authAPI} from "../api/api";
import {stopSubmit} from "redux-form";
import {getUserProfileThunkCreator} from "./user-reducer";

const SET_USER_DATA = "/auth/SET-USER";

let initialState = {
    id: null,
    accessToken: null,
    isAuthenticated: false
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                id: action.id,
                accessToken: action.accessToken,
                isAuthenticated: action.isAuthenticated
            };
        default:
            return state;
    }
}

export const setUserActionCreator = (id, accessToken, isAuthenticated) => ({
    type: SET_USER_DATA, id: id, accessToken: accessToken, isAuthenticated: isAuthenticated
});

export const loginThunkCreator = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await authAPI.login(email, password);
            if (response.status === 200) {
                dispatch(setUserActionCreator(response.data.id, response.data.accessToken, true));
                dispatch(getUserProfileThunkCreator(response.data.id));
            }
        } catch (error) {
            const messages = error.response.data.messages;
            let message = messages.length > 0 ? messages[0] : "Some error occurred...";
            dispatch(stopSubmit("loginForm", {_error: message}))
            return Promise.reject(message);
        }
    };
}
export const logoutThunkCreator = () => {
    return async (dispatch) => {
        let response = await authAPI.logout();
        if (response.status === 200) {
            dispatch(setUserActionCreator(null, null, false));
        }
    };
}