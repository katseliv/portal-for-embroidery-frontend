import {createSelector} from "reselect";

export const getPosts = (state) => {
    return state.postPage.posts.sort((a, b) => a.id > b.id ? 1 : -1);
};

export const getCurrentPageOfPosts = (state) => {
    return state.postPage.currentPage;
};

export const getPageSizeOfPosts = (state) => {
    return state.postPage.pageSize;
};

export const getTotalCountOfPosts = (state) => {
    return state.postPage.totalCount;
};

export const getIsFetchingOfPosts = (state) => {
    return state.postPage.isFetching;
};

export const getIsLikingInProgressOfPosts = (state) => {
    return state.postPage.isLikingInProgress;
};