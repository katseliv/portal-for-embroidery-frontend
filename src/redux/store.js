import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {userReducer} from "./user-reducer";
import {commentReducer} from "./comment-reducer";
import {postReducer} from "./post-reducer";
import {authReducer} from "./auth-reducer";
import {appReducer} from "./app-reducer";
import {reducer as formReducer} from "redux-form";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    appPage: appReducer,
    authPage: authReducer,
    profilePage: profileReducer,
    userPage: userReducer,
    postPage: postReducer,
    commentPage: commentReducer,
    form: formReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;