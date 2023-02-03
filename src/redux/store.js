import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {userReducer} from "./user-reducer";
import {designReducer} from "./design-reducer";
import {commentReducer} from "./comment-reducer";
import {postReducer} from "./post-reducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    userPage: userReducer,
    postPage: postReducer,
    designPage: designReducer,
    commentPage: commentReducer,
})

let store = createStore(reducers);

export default store;