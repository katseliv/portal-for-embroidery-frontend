export const getUsers = (state) => {
    return state.userPage.users.sort((a, b) => a.id > b.id ? 1 : -1);
};