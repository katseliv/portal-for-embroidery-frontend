import {getUserProfileThunkCreator} from "./user-reducer";
import {getIdFromLocalStorage, getTokenDataFromLocalStorage} from "../utils/local-storage-helpers";
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
        if (userId) {
            const promiseUserProfile = dispatch(getUserProfileThunkCreator(userId));
            const promiseUserAuth = dispatch(setUserActionCreator(userId, tokenData.accessToken, tokenData.refreshToken, true));
            Promise.all([promiseUserProfile, promiseUserAuth]).then(() => {
                dispatch(setInitializedActionCreator());
            });
        } else {
            dispatch(setInitializedActionCreator());
        }
    };
}