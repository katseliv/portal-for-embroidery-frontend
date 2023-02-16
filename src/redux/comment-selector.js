import {createSelector} from "reselect";

export const getComments = (state) => {
    return state.commentPage.comments.sort((a, b) => a.id > b.id ? 1 : -1);
};

export const getCurrentPageOfComments = (state) => {
    return state.commentPage.currentPage;
};

export const getPageSizeOfComments = (state) => {
    return state.commentPage.pageSize;
};

export const getTotalCountOfComments = (state) => {
    return state.commentPage.totalCount;
};

export const getIsFetchingOfComments = (state) => {
    return state.commentPage.isFetching;
};

export const getCommentsDifficultSelector = createSelector(getComments, getIsFetchingOfComments, (comments, isFetching) => {
    return comments.filter(c => isFetching);
});