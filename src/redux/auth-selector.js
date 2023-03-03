export const getAuthorizedUserId = (state) => {
    return state.authPage.id;
};

export const getAuthorizedUserRole = (state) => {
    return state.authPage.role;
};

export const getAccessToken = (state) => {
    return state.authPage.accessToken;
};

export const getIsAuthenticated = (state) => {
    return state.authPage.isAuthenticated;
};