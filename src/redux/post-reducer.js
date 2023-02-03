const LIKE = 'LIKE';
const DISLIKE = 'DISLIKE';
const SET_POSTS = 'SET-POSTS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_POSTS_TOTAL_COUNT = 'SET-POSTS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';

let initialState = {
    posts: [],
    currentPage: 1,
    pageSize: 5,
    totalCount: 4,
    isFetching: true
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIKE:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.postId) {
                        return {...post, liked: true}
                    }
                    return post;
                })
            }
        case DISLIKE:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.postId) {
                        return {...post, liked: false}
                    }
                    return post;
                })
            }
        case SET_POSTS:
            return {...state, posts: action.posts}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_POSTS_TOTAL_COUNT:
            return {...state, totalCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}

export const like = (postId) => ({type: LIKE, postId: postId});
export const dislike = (postId) => ({type: DISLIKE, postId: postId});
export const setCommentsActionCreator = (posts) => ({type: SET_POSTS, posts: posts});
export const setCurrentPageActionCreator = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalCountActionCreator = (totalCount) => ({
    type: SET_POSTS_TOTAL_COUNT,
    totalCount: totalCount
});
export const setIsFetchingActionCreator = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
});
