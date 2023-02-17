import {reset} from "redux-form";
import {postAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const LIKE = '/post/LIKE';
const DISLIKE = '/post/DISLIKE';
const ADD_POST = '/post/ADD-COMMENT';
const UPDATE_POST = '/post/UPDATE-COMMENT';
const DELETE_POST = '/post/DELETE-COMMENT';
const SET_POSTS = '/post/SET-POSTS';
const SET_POST_PROFILE = '/post/SET-POST-PROFILE';
const SET_CURRENT_PAGE = '/post/SET-CURRENT-PAGE';
const SET_POSTS_TOTAL_COUNT = '/post/SET-POSTS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = '/post/TOGGLE-IS-FETCHING';
const TOGGLE_IS_LIKING_PROGRESS = '/post/TOGGLE-IS-LIKING-PROGRESS';

let initialState = {
    profile: null,
    posts: [],
    currentPage: 1,
    pageSize: 5,
    totalCount: 4,
    isFetching: false,
    isLikingInProgress: []
}

export const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {...action.newPost, liked: false}]
            }
        case UPDATE_POST:
            return {
                ...state,
                posts: updateObjectInArray(state.posts, action.postId, "id", {text: action.text})
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(c => c.id !== action.postId)
            }
        case LIKE:
            return {
                ...state,
                posts: updateObjectInArray(state.posts, action.postId, "id", {liked: true})
            }
        case DISLIKE:
            return {
                ...state,
                posts: updateObjectInArray(state.posts, action.postId, "id", {liked: false})
            }
        case SET_POSTS:
            return {...state, posts: [...action.posts]}
        case SET_POST_PROFILE:
            return {...state, profile: action.profile};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_POSTS_TOTAL_COUNT:
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

export const setPostProfileActionCreator = (profile) => ({
    type: SET_POST_PROFILE,
    profile: profile
});
export const addPostActionCreator = (newPost) => ({type: ADD_POST, newPost: newPost});
export const updatePostActionCreator = (postId, text) => ({
    type: UPDATE_POST,
    postId: postId,
    text: text
});
export const deletePostActionCreator = (postId) => ({type: DELETE_POST, postId: postId});
export const setPostsActionCreator = (posts) => ({type: SET_POSTS, posts: posts});
export const setCurrentPageActionCreator = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalCountActionCreator = (totalCount) => ({
    type: SET_POSTS_TOTAL_COUNT,
    totalCount: totalCount
});
export const likeActionCreator = (postId) => ({type: LIKE, postId: postId});
export const dislikeActionCreator = (postId) => ({type: DISLIKE, postId: postId});
export const setIsFetchingActionCreator = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
});
export const setIsLikingInProgressActionCreator = (isFetching, id) => ({
    type: TOGGLE_IS_LIKING_PROGRESS,
    isFetching: isFetching,
    id: id
});

export const getPostProfileThunkCreator = (postId) => {
    return (dispatch) => {
        postAPI.getPost(postId).then(response => {
            if (response.status === 200) {
                dispatch(setPostProfileActionCreator(response.data));
            }
        });
    };
}
export const addPostThunkCreator = (designerId, designId, description) => {
    return async (dispatch) => {
        let responseCreatePost = await postAPI.createPost(designerId, designId, description);
        if (responseCreatePost.status === 201) {
            let newPostId = responseCreatePost.data;
            let responseGetPost = await postAPI.getPost(newPostId);
            if (responseGetPost.status === 200) {
                dispatch(addPostActionCreator(responseGetPost.data));
                dispatch(reset('postForm'));
            }
        }
    };
}
export const updatePostThunkCreator = (postId, description) => {
    return async (dispatch) => {
        let response = await postAPI.updatePost(postId, description);
        if (response.status === 200) {
            dispatch(updatePostActionCreator(postId, description));
        }
    };
}
export const deletePostThunkCreator = (postId) => {
    return async (dispatch) => {
        let response = await postAPI.deletePost(postId);
        if (response.status === 200) {
            dispatch(deletePostActionCreator(postId));
        }
    };
}
export const getPostsThunkCreator = () => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        let response = await postAPI.getPosts();
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setPostsActionCreator(response.data.viewDtoList));
            dispatch(setTotalCountActionCreator(response.data.totalCount));
        }
    };
}
export const getPostsByNumberAndSizeThunkCreator = (pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(pageNumber));
        let response = await postAPI.getPostsByNumberAndSize(pageNumber, pageSize);
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setPostsActionCreator(response.data.viewDtoList));
        }
    };
}
export const likeDislikeFlowThunkCreator = async (dispatch, postId, userId, apiMethod, actionCreator) => {
    dispatch(setIsLikingInProgressActionCreator(true, postId));
    let response = await apiMethod({postId, userId});
    if (response.status === 200) {
        dispatch(actionCreator(postId));
    }
    dispatch(setIsLikingInProgressActionCreator(false, postId));
}
export const likeFlowThunkCreator = (postId) => {
    return async (dispatch) => {
        let userId = 13;
        await likeDislikeFlowThunkCreator(dispatch, postId, userId, postAPI.likePost.bind({postId: postId, userId: userId}), likeActionCreator);
    };
}
export const dislikeFlowThunkCreator = (postId) => {
    return async (dispatch) => {
        let userId = 13;
        await likeDislikeFlowThunkCreator(dispatch, postId, userId, postAPI.dislikePost.bind({postId: postId, userId: userId}), dislikeActionCreator);
    };
}
