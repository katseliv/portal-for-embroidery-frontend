import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {userReducer} from "./user-reducer";
import {designReducer} from "./design-reducer";
import {commentReducer} from "./comment-reducer";
import {postReducer} from "./post-reducer";
import {authReducer} from "./auth-reducer";
import {reducer as formReducer} from "redux-form";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    authPage: authReducer,
    profilePage: profileReducer,
    userPage: userReducer,
    postPage: postReducer,
    designPage: designReducer,
    commentPage: commentReducer,
    form: formReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;