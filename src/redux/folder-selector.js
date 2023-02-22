export const getFolderProfile = (state) => {
    return state.folderPage.profile;
};

export const getFolders = (state) => {
    return state.folderPage.folders.sort((a, b) => a.id > b.id ? 1 : -1);
};

export const getCurrentPageOfFolders = (state) => {
    return state.folderPage.currentPage;
};

export const getPageSizeOfFolders = (state) => {
    return state.folderPage.pageSize;
};

export const getTotalCountOfFolders = (state) => {
    return state.folderPage.totalCount;
};

export const getIsFetchingOfFolders = (state) => {
    return state.folderPage.isFetching;
};