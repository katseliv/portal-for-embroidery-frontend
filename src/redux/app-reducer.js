import {getUserThunkCreator} from "./auth-reducer";

const SET_INITIALIZED = "SET-INITIALIZED";

let initialState = {
    initialized: false,
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
        let promise = dispatch(getUserThunkCreator(userId));
        Promise.all([promise]).then(() => {
            dispatch(setInitializedActionCreator());
        });
    };
}