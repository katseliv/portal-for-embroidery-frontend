import {createSelector} from "reselect";

export const getComments = (state) => {
    return state.commentPage.comments;
};

export const getCurrentPage = (state) => {
    return state.commentPage.currentPage;
};

export const getPageSize = (state) => {
    return state.commentPage.pageSize;
};

export const getTotalCount = (state) => {
    return state.commentPage.totalCount;
};

export const getIsFetching = (state) => {
    return state.commentPage.isFetching;
};

export const getIsLikingInProgress = (state) => {
    return state.commentPage.isLikingInProgress;
};

export const getCommentsDifficultSelector = createSelector(getComments, getIsFetching, (comments, isFetching) => {
    return comments.filter(c => isFetching);
});