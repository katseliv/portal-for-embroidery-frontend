import {fileAPI} from "../api/api";
import {reset, stopSubmit} from "redux-form";
import {updateObjectInArray} from "../utils/object-helpers";

const ADD_FILE = '/file/ADD-FILE';
const UPDATE_FILE = '/file/UPDATE-FILE';
const DELETE_FILE = '/file/DELETE-FILE';
const SET_FILES = '/file/SET-FILES';
const SET_FILE_PROFILE = '/file/SET-FILE-PROFILE';
const SET_CURRENT_PAGE = '/file/SET-CURRENT-PAGE';
const SET_FILES_TOTAL_COUNT = '/file/SET-FILES-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = '/file/TOGGLE-IS-FETCHING';

let initialState = {
    profile: null,
    files: [],
    currentPage: 1,
    pageSize: 10,
    totalCount: 4,
    isFetching: false
}

export const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILE:
            return {
                ...state,
                files: [...state.files, {...action.newFile}]
            }
        case UPDATE_FILE:
            return {
                ...state,
                files: updateObjectInArray(state.files, action.fileId, "id", {name: action.name})
            }
        case DELETE_FILE:
            return {
                ...state,
                files: state.files.filter(c => c.id !== action.fileId)
            }
        case SET_FILES:
            return {...state, files: action.files}
        case SET_FILE_PROFILE:
            return {...state, profile: action.profile};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_FILES_TOTAL_COUNT:
            return {...state, totalCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}


export const addFileActionCreator = (newFile) => ({type: ADD_FILE, newFile: newFile});
export const updateFileActionCreator = (fileId, fileName) => ({
    type: UPDATE_FILE,
    fileId: fileId,
    name: fileName
});
export const deleteFileActionCreator = (fileId) => ({type: DELETE_FILE, fileId: fileId});

export const setFilesActionCreator = (files) => ({type: SET_FILES, files: files});
export const setFileProfileActionCreator = (profile) => ({
    type: SET_FILE_PROFILE,
    profile: profile
});
export const setCurrentPageActionCreator = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalCountActionCreator = (totalCount) => ({
    type: SET_FILES_TOTAL_COUNT,
    totalCount: totalCount
});
export const setIsFetchingActionCreator = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
});

export const addFileThunkCreator = (file) => {
    return async (dispatch) => {
        try {
            let responseCreateFile = await fileAPI.createFile(file);
            if (responseCreateFile.status === 201) {
                let newFileId = responseCreateFile.data;
                let responseGetFile = await fileAPI.getFile(newFileId);
                if (responseGetFile.status === 200) {
                    dispatch(addFileActionCreator(responseGetFile.data));
                    dispatch(reset("fileCreateForm"));
                }
            }
        } catch (error) {
            const messages = error.response.data.messages;
            let message = messages.length > 0 ? messages[0] : "Some error occurred...";
            dispatch(stopSubmit("fileCreateForm", {_error: message}))
            return Promise.reject(message);
        }
    };
}
export const updateFileThunkCreator = (fileId, fileName) => {
    return async (dispatch) => {
        let response = await fileAPI.updateFile(fileId, fileName);
        if (response.status === 200) {
            dispatch(updateFileActionCreator(fileId, fileName));
        }
    };
}
export const deleteFileThunkCreator = (fileId) => {
    return async (dispatch) => {
        let response = await fileAPI.deleteFile(fileId);
        if (response.status === 200) {
            dispatch(deleteFileActionCreator(fileId));
        }
    };
}
export const getFilesThunkCreator = () => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        let response = await fileAPI.getFiles();
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setFilesActionCreator(response.data.viewDtoList));
            dispatch(setTotalCountActionCreator(response.data.totalCount));
        }
    };
}
export const getFilesByNumberAndSizeThunkCreator = (pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(pageNumber));
        let response = await fileAPI.getFilesByNumberAndSize(pageNumber, pageSize);
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setFilesActionCreator(response.data.viewDtoList));
        }
    };
}
export const getFilesOfFolderByNumberAndSizeThunkCreator = (folderId, pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(pageNumber));
        let response = await fileAPI.getFilesOfFolderByNumberAndSize(folderId, pageNumber, pageSize);
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setFilesActionCreator(response.data.viewDtoList));
        }
    };
}
export const getFileProfileThunkCreator = (fileId) => {
    return async (dispatch) => {
        fileAPI.getFile(fileId).then(response => {
            if (response.status === 200) {
                dispatch(setFileProfileActionCreator(response.data));
            }
        });
    };
}