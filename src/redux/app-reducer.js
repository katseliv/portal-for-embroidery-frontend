import {getDesignerProfileThunkCreator, getUserProfileThunkCreator} from "./user-reducer";
import {
    getIdFromLocalStorage,
    getRoleFromLocalStorage,
    getTokenDataFromLocalStorage
} from "../utils/local-storage-helpers";
import {setUserActionCreator} from "./auth-reducer";

const SET_INITIALIZED = "/app/SET-INITIALIZED";
const SET_GLOBAL_ERROR = "/app/SET-GLOBAL-ERROR";

let initialState = {
    initialized: false,
    globalError: null
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
            };
        case SET_GLOBAL_ERROR:
            return {
                ...state,
                globalError: action.error,
            };
        default:
            return state;
    }
}

export const setInitializedActionCreator = () => ({type: SET_INITIALIZED});
export const setGlobalErrorActionCreator = (error) => ({type: SET_GLOBAL_ERROR, error: error});

export const initializeAppThunkCreator = () => {
    return (dispatch) => {
        const userId = getIdFromLocalStorage();
        const tokenData = getTokenDataFromLocalStorage();
        const role = getRoleFromLocalStorage();
        if (userId) {
            const promiseUserProfile = role !== "DESIGNER" ? dispatch(getUserProfileThunkCreator(userId)) : dispatch(getDesignerProfileThunkCreator(userId));
            const promiseUserAuth = dispatch(setUserActionCreator(userId, role, tokenData.accessToken, tokenData.refreshToken, true));
            Promise.all([promiseUserProfile, promiseUserAuth]).then(() => {
                dispatch(setInitializedActionCreator());
            });
        } else {
            dispatch(setInitializedActionCreator());
        }
    };
}