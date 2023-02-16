import {getUserProfileThunkCreator} from "./profile-reducer";

const SET_INITIALIZED = "/app/SET-INITIALIZED";

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
        default:
            return state;
    }
}

export const setInitializedActionCreator = () => ({type: SET_INITIALIZED});

export const initializeAppThunkCreator = (userId) => {
    return (dispatch) => {
        let promise = dispatch(getUserProfileThunkCreator(userId));
        Promise.all([promise]).then(() => {
            dispatch(setInitializedActionCreator());
        });
    };
}