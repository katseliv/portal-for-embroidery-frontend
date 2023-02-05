import {commentAPI} from "../api/api";

const LIKE = 'LIKE';
const DISLIKE = 'DISLIKE';
const ADD_COMMENT = 'ADD-COMMENT';
const UPDATE_COMMENT = 'UPDATE-COMMENT';
const SET_COMMENTS = 'SET-COMMENTS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_COMMENTS_TOTAL_COUNT = 'SET-COMMENTS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_LIKING_PROGRESS = 'TOGGLE-IS-LIKING-PROGRESS';

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
            debugger;
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.commentId) {
                        return {...comment, liked: true}
                    }
                    return comment;
                })
            }
        case DISLIKE:
            return {
                ...state,
                comments: state.comments.map(comment => {
                    if (comment.id === action.commentId) {
                        return {...comment, liked: false}
                    }
                    return comment;
                })
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
export const updateCommentActionCreator = (commentId, text) => ({type: UPDATE_COMMENT, commentId: commentId, text: text});
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

export const updateCommentThunkCreator = (commentId, text) => {
    return (dispatch) => {
        commentAPI.updateComment(commentId, text).then(response => {
            if (response.status === 200) {
                dispatch(updateCommentActionCreator(commentId, text));
            }
        });
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