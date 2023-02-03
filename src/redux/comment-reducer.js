const LIKE = 'LIKE';
const DISLIKE = 'DISLIKE';
const UPDATE_NEW_COMMENT_TEXT = 'UPDATE-NEW-COMMENT-TEXT';
const ADD_COMMENT = 'ADD-COMMENT';
const SET_COMMENTS = 'SET-COMMENTS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_COMMENTS_TOTAL_COUNT = 'SET-COMMENTS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_LIKING_PROGRESS = 'TOGGLE-IS-LIKING-PROGRESS';

let initialState = {
    comments: [],
    newCommentText: '',
    currentPage: 1,
    pageSize: 5,
    totalCount: 4,
    isFetching: false,
    isLikingInProgress: false
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
        case UPDATE_NEW_COMMENT_TEXT:
            return {
                ...state,
                newCommentText: action.newText
            }
        case ADD_COMMENT:
            let newComment = {
                id: 5,
                userFirstName: 'Anonymous',
                userLastName: '',
                text: state.newCommentText,
                creationDatetime: '2022-12-27',
                liked: false
            };
            return {
                ...state,
                newCommentText: '',
                comments: [...state.comments, newComment]
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
            return {...state, isLikingInProgress: action.isLikingInProgress}
        default:
            return state;
    }
}

export const likeActionCreator = (commentId) => ({type: LIKE, commentId: commentId});
export const dislikeActionCreator = (commentId) => ({type: DISLIKE, commentId: commentId});
export const updateNewCommentTextActionCreator = (text) => ({type: UPDATE_NEW_COMMENT_TEXT, newText: text})
export const addCommentActionCreator = () => ({type: ADD_COMMENT});
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
export const setIsLikingInProgressActionCreator = (isLikingInProgress) => ({
    type: TOGGLE_IS_LIKING_PROGRESS,
    isLikingInProgress: isLikingInProgress
});