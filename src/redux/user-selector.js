export const getUserProfile = (state) => {
    return state.userPage.profile;
};

export const getUsers = (state) => {
    return state.userPage.users.sort((a, b) => a.id > b.id ? 1 : -1);
};

export const getCurrentPageOfUsers = (state) => {
    return state.userPage.currentPage;
};

export const getPageSizeOfUsers = (state) => {
    return state.userPage.pageSize;
};

export const getTotalCountOfUsers = (state) => {
    return state.userPage.totalCount;
};

export const getIsFetchingOfUsers = (state) => {
    return state.userPage.isFetching;
};