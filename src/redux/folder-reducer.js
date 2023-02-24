import {folderAPI} from "../api/api";
import {reset, stopSubmit} from "redux-form";
import {updateObjectInArray} from "../utils/object-helpers";

const ADD_FOLDER = '/folder/ADD-FOLDER';
const UPDATE_FOLDER = '/folder/UPDATE-FOLDER';
const DELETE_FOLDER = '/folder/DELETE-FOLDER';
const SET_FOLDERS = '/folder/SET-FOLDERS';
const SET_FOLDER_PROFILE = '/folder/SET-FOLDER-PROFILE';
const SET_INITIAL_PATH = '/folder/SET-INITIAL-PATH';
const SET_PATH = '/folder/SET-PATH';
const SET_CURRENT_PAGE = '/folder/SET-CURRENT-PAGE';
const SET_FOLDERS_TOTAL_COUNT = '/folder/SET-FOLDERS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = '/folder/TOGGLE-IS-FETCHING';

let initialState = {
    profile: null,
    folders: [],
    path: "/home",
    currentFolder: null,
    currentPage: 1,
    pageSize: 10,
    totalCount: 4,
    isFetching: false
}

export const folderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FOLDER:
            return {
                ...state,
                folders: [...state.folders, {...action.newFolder}]
            }
        case UPDATE_FOLDER:
            return {
                ...state,
                profile: {...action.newProfile},
                folders: updateObjectInArray(state.folders, action.folderId, "id", {...action.newProfile})
            }
        case DELETE_FOLDER:
            return {
                ...state,
                folders: state.folders.filter(c => c.id !== action.folderId)
            }
        case SET_FOLDERS:
            return {...state, folders: action.folders}
        case SET_FOLDER_PROFILE:
            return {...state, profile: action.profile};
        case SET_INITIAL_PATH:
            return {...state, path: "/home", currentFolder: null};
        case SET_PATH:
            return {...state, path: state.path + "/" + action.currentFolder, currentFolder: action.currentFolder}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_FOLDERS_TOTAL_COUNT:
            return {...state, totalCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}


export const addFolderActionCreator = (newFolder) => ({type: ADD_FOLDER, newFolder: newFolder});
export const updateFolderActionCreator = (folderId, newProfile) => ({
    type: UPDATE_FOLDER,
    folderId: folderId,
    newProfile: newProfile
});
export const deleteFolderActionCreator = (folderId) => ({type: DELETE_FOLDER, folderId: folderId});

export const setFoldersActionCreator = (folders) => ({type: SET_FOLDERS, folders: folders});
export const setFolderProfileActionCreator = (profile) => ({
    type: SET_FOLDER_PROFILE,
    profile: profile
});
export const setInitialPathActionCreator = () => ({type: SET_INITIAL_PATH});
export const setPathActionCreator = (currentFolder) => ({type: SET_PATH, currentFolder: currentFolder});
export const setCurrentPageActionCreator = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalCountActionCreator = (totalCount) => ({
    type: SET_FOLDERS_TOTAL_COUNT,
    totalCount: totalCount
});
export const setIsFetchingActionCreator = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
});

export const addFolderThunkCreator = (folder) => {
    return async (dispatch) => {
        let responseCreateFolder = await folderAPI.createFolder(folder);
        if (responseCreateFolder.status === 201) {
            let newFolderId = responseCreateFolder.data;
            let responseGetFolder = await folderAPI.getFolder(newFolderId);
            if (responseGetFolder.status === 200) {
                dispatch(addFolderActionCreator(responseGetFolder.data));
                dispatch(reset('folderForm'));
            }
        }
    };
}
export const updateFolderThunkCreator = (folderId, newProfile) => {
    return async (dispatch) => {
        let response = await folderAPI.updateFolder(folderId, newProfile);
        if (response.status === 200) {
            dispatch(updateFolderActionCreator(folderId, newProfile));
        } else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error...";
            dispatch(stopSubmit("folderProfileUpdateForm", {_error: message}));
        }
    };
}
export const deleteFolderThunkCreator = (folderId) => {
    return async (dispatch) => {
        let response = await folderAPI.deleteFolder(folderId);
        if (response.status === 200) {
            dispatch(deleteFolderActionCreator(folderId));
        }
    };
}
export const getFoldersThunkCreator = () => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        let response = await folderAPI.getFolders();
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setFoldersActionCreator(response.data.viewDtoList));
            dispatch(setTotalCountActionCreator(response.data.totalCount));
        }
    };
}
export const getFoldersByNumberAndSizeThunkCreator = (pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(pageNumber));
        let response = await folderAPI.getFoldersByNumberAndSize(pageNumber, pageSize);
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setFoldersActionCreator(response.data.viewDtoList));
        }
    };
}
export const getFoldersOfUserByNumberAndSizeThunkCreator = (userId, pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(pageNumber));
        let response = await folderAPI.getFoldersOfUserByNumberAndSize(userId, pageNumber, pageSize);
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setFoldersActionCreator(response.data.viewDtoList));
        }
    };
}
export const getFoldersOfParentFolderByNumberAndSizeThunkCreator = (folderId, pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(pageNumber));
        let response = await folderAPI.getFoldersOfParentFolderByNumberAndSize(folderId, pageNumber, pageSize);
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setFoldersActionCreator(response.data.viewDtoList));
        }
    };
}
export const getFolderProfileThunkCreator = (folderId) => {
    return async (dispatch) => {
        folderAPI.getFolder(folderId).then(response => {
            if (response.status === 200) {
                dispatch(setFolderProfileActionCreator(response.data));
            }
        });
    };
}