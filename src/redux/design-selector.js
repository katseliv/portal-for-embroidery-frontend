export const getDesignProfile = (state) => {
    return state.designPage.profile;
};

export const getDesigns = (state) => {
    return state.designPage.designs.sort((a, b) => a.id > b.id ? 1 : -1);
};

export const getCurrentPageOfDesigns = (state) => {
    return state.designPage.currentPage;
};

export const getPageSizeOfDesigns = (state) => {
    return state.designPage.pageSize;
};

export const getTotalCountOfDesigns = (state) => {
    return state.designPage.totalCount;
};

export const getIsFetchingOfDesigns = (state) => {
    return state.designPage.isFetching;
};