import {reset, stopSubmit} from "redux-form";
import {commentAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const ADD_COMMENT = '/comment/ADD-COMMENT';
const UPDATE_COMMENT = '/comment/UPDATE-COMMENT';
const DELETE_COMMENT = '/comment/DELETE-COMMENT';
const SET_COMMENTS = '/comment/SET-COMMENTS';
const SET_CURRENT_PAGE = '/comment/SET-CURRENT-PAGE';
const SET_COMMENTS_TOTAL_COUNT = '/comment/SET-COMMENTS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = '/comment/TOGGLE-IS-FETCHING';

let initialState = {
    comments: [],
    currentPage: 1,
    pageSize: 5,
    totalCount: 4,
    isFetching: false
}

export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                comments: [...state.comments, {...action.newComment, liked: false}]
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                comments: updateObjectInArray(state.comments, action.commentId, "id", {text: action.text})
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(c => c.id !== action.commentId)
            }
        case SET_COMMENTS:
            return {...state, comments: action.comments}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_COMMENTS_TOTAL_COUNT:
            return {...state, totalCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}

export const addCommentActionCreator = (newComment) => ({type: ADD_COMMENT, newComment: newComment});
export const updateCommentActionCreator = (commentId, text) => ({
    type: UPDATE_COMMENT,
    commentId: commentId,
    text: text
});
export const deleteCommentActionCreator = (commentId) => ({type: DELETE_COMMENT, commentId: commentId});
export const setCommentsActionCreator = (comments) => ({type: SET_COMMENTS, comments: comments});
export const setCurrentPageActionCreator = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalCountActionCreator = (totalCount) => ({
    type: SET_COMMENTS_TOTAL_COUNT,
    totalCount: totalCount
});
export const setIsFetchingActionCreator = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
});

export const addCommentThunkCreator = (postId, userId, text) => {
    return async (dispatch) => {
        try {
            let responseCreateComment = await commentAPI.createComment(postId, userId, text);
            if (responseCreateComment.status === 201) {
                let newCommentId = responseCreateComment.data;
                let responseGetComment = await commentAPI.getComment(newCommentId);
                if (responseGetComment.status === 200) {
                    dispatch(addCommentActionCreator(responseGetComment.data));
                    dispatch(reset("commentForm"));
                }
            }
        } catch (error) {
            const messages = error.response.data.messages;
            let message = messages.length > 0 ? messages[0] : "Some error occurred...";
            dispatch(stopSubmit("commentForm", {_error: message}))
            return Promise.reject(message);
        }
    };
}
export const updateCommentThunkCreator = (commentId, text) => {
    return async (dispatch) => {
        let response = await commentAPI.updateComment(commentId, text);
        if (response.status === 200) {
            dispatch(updateCommentActionCreator(commentId, text));
        }
    };
}
export const deleteCommentThunkCreator = (commentId) => {
    return async (dispatch) => {
        let response = await commentAPI.deleteComment(commentId);
        if (response.status === 200) {
            dispatch(deleteCommentActionCreator(commentId));
        }
    };
}
export const getCommentsThunkCreator = () => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        let response = await commentAPI.getComments();
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setCommentsActionCreator(response.data.viewDtoList));
            dispatch(setTotalCountActionCreator(response.data.totalCount));
        }
    };
}
export const getCommentsOfPostThunkCreator = (postId) => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        let response = await commentAPI.getCommentsOfPost(postId);
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setCommentsActionCreator(response.data.viewDtoList));
            dispatch(setTotalCountActionCreator(response.data.totalCount));
        }
    };
}
export const getCommentsByNumberAndSizeThunkCreator = (pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(pageNumber));
        let response = await commentAPI.getCommentsByNumberAndSize(pageNumber, pageSize);
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setCommentsActionCreator(response.data.viewDtoList));
        }
    };
}
export const getCommentsOfPostByNumberAndSizeThunkCreator = (postId, pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(pageNumber));
        let response = await commentAPI.getCommentsOfPostByNumberAndSize(postId, pageNumber, pageSize);
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setCommentsActionCreator(response.data.viewDtoList));
        }
    };
}