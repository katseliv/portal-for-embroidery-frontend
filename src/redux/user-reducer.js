const SET_USERS = '/user/SET-USERS';
const SET_CURRENT_PAGE = '/user/SET-CURRENT-PAGE';
const SET_USERS_TOTAL_COUNT = '/user/SET-USERS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = '/user/TOGGLE-IS-FETCHING';

let initialState = {
    users: [],
    currentPage: 1,
    pageSize: 5,
    totalCount: 4,
    isFetching: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_USERS_TOTAL_COUNT:
            return {...state, totalCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}

export const setUsersActionCreator = (users) => ({type: SET_USERS, users: users});
export const setCurrentPageActionCreator = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalCountActionCreator = (totalCount) => ({
    type: SET_USERS_TOTAL_COUNT,
    totalCount: totalCount
});
export const setIsFetchingActionCreator = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
});
