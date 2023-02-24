export const getFileProfile = (state) => {
    return state.filePage.profile;
};

export const getFiles = (state) => {
    return state.filePage.files.sort((a, b) => a.id > b.id ? 1 : -1);
};

export const getCurrentPageOfFiles = (state) => {
    return state.filePage.currentPage;
};

export const getPageSizeOfFiles = (state) => {
    return state.filePage.pageSize;
};

export const getTotalCountOfFiles = (state) => {
    return state.filePage.totalCount;
};

export const getIsFetchingOfFiles = (state) => {
    return state.filePage.isFetching;
};