import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";
import {userReducer} from "./user-reducer";
import {postReducer} from "./post-reducer";
import {commentReducer} from "./comment-reducer";
import {folderReducer} from "./folder-reducer";
import {fileReducer} from "./file-reducer";
import {reducer as formReducer} from "redux-form";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    appPage: appReducer,
    authPage: authReducer,
    userPage: userReducer,
    postPage: postReducer,
    commentPage: commentReducer,
    folderPage: folderReducer,
    filePage: fileReducer,
    form: formReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;