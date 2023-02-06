import {commentAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const LIKE = '/comment/LIKE';
const DISLIKE = '/comment/DISLIKE';
const ADD_COMMENT = '/comment/ADD-COMMENT';
const DELETE_COMMENT = '/comment/DELETE-COMMENT';
const UPDATE_COMMENT = '/comment/UPDATE-COMMENT';
const SET_COMMENTS = '/comment/SET-COMMENTS';
const SET_CURRENT_PAGE = '/comment/SET-CURRENT-PAGE';
const SET_COMMENTS_TOTAL_COUNT = '/comment/SET-COMMENTS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = '/comment/TOGGLE-IS-FETCHING';
const TOGGLE_IS_LIKING_PROGRESS = '/comment/TOGGLE-IS-LIKING-PROGRESS';

let initialState = {
    comments: [],
    currentPage: 1,
    pageSize: 5,
    totalCount: 4,
    isFetching: false,
    isLikingInProgress: []
}

export const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE:
            return {
                ...state,
                comments: updateObjectInArray(state.comments, action.commentId, "id", {liked: true})
                // comments: state.comments.map(comment => {
                //     if (comment.id === action.commentId) {
                //         return {...comment, liked: true}
                //     }
                //     return comment;
                // })
            }
        case DISLIKE:
            return {
                ...state,
                comments: updateObjectInArray(state.comments, action.commentId, "id", {liked: false})
                // comments: state.comments.map(comment => {
                //     if (comment.id === action.commentId) {
                //         return {...comment, liked: false}
                //     }
                //     return comment;
                // })
            }
        case ADD_COMMENT:
            let newComment = {
                id: 5,
                userFirstName: 'Anonymous',
                userLastName: '',
                text: action.newCommentText,
                creationDatetime: '2022-12-27',
                liked: false
            };
            return {
                ...state,
                comments: [...state.comments, newComment]
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(c => c.id !== action.commentId)
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.commentId) {
                        return {...comment, text: action.text}
                    }
                    return comment;
                })
            }
        case SET_COMMENTS:
            return {...state, comments: action.comments}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_COMMENTS_TOTAL_COUNT:
            return {...state, totalCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_LIKING_PROGRESS:
            return {
                ...state,
                isLikingInProgress: action.isFetching
                    ? [...state.isLikingInProgress, action.id]
                    : [...state.isLikingInProgress.filter(id => id !== action.id)]
            }
        default:
            return state;
    }
}

export const likeActionCreator = (commentId) => ({type: LIKE, commentId: commentId});
export const dislikeActionCreator = (commentId) => ({type: DISLIKE, commentId: commentId});
export const addCommentActionCreator = (newCommentText) => ({type: ADD_COMMENT, newCommentText: newCommentText});
export const deleteCommentActionCreator = (commentId) => ({type: DELETE_COMMENT, commentId: commentId});
export const updateCommentActionCreator = (commentId, text) => ({
    type: UPDATE_COMMENT,
    commentId: commentId,
    text: text
});
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
export const setIsLikingInProgressActionCreator = (isFetching, id) => ({
    type: TOGGLE_IS_LIKING_PROGRESS,
    isFetching: isFetching,
    id: id
});

export const likeDislikeFlowThunkCreator = async (dispatch, commentId, apiMethod, actionCreator) => {
    dispatch(setIsLikingInProgressActionCreator(true, commentId));
    let response = await apiMethod(commentId);

    if (response.status === 200) {
        dispatch(actionCreator(commentId));
    }
    dispatch(setIsLikingInProgressActionCreator(false, commentId));
}

export const likeFlowThunkCreator = (commentId) => {
    return async (dispatch) => {
        likeDislikeFlowThunkCreator(dispatch, commentId, commentAPI.likeComment.bind(commentId), likeActionCreator);
    };
}

export const dislikeFlowThunkCreator = (commentId) => {
    return async (dispatch) => {
        likeDislikeFlowThunkCreator(dispatch, commentId, commentAPI.dislikeComment.bind(commentId), dislikeActionCreator);
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
export const getCommentsThunkCreator = () => {
    return (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        commentAPI.getComments().then(response => {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setCommentsActionCreator(response.data.viewDtoList));
            dispatch(setTotalCountActionCreator(response.data.totalCount));
        });
    };
}
export const getCommentsByNumberAndSizeThunkCreator = (pageNumber, pageSize) => {
    return (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(pageNumber));
        commentAPI.getCommentsByNumberAndSize(pageNumber, pageSize).then(response => {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setCommentsActionCreator(response.data.viewDtoList));
        })
    };
}