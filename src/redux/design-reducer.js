import {designAPI} from "../api/api";
import {reset, stopSubmit} from "redux-form";
import {updateObjectInArray} from "../utils/object-helpers";

const ADD_DESIGN = '/design/ADD-DESIGN';
const UPDATE_DESIGN = '/design/UPDATE-DESIGN';
const DELETE_DESIGN = '/design/DELETE-DESIGN';
const SET_DESIGNS = '/design/SET-DESIGNS';
const SET_DESIGN_PROFILE = '/design/SET-DESIGN-PROFILE';
const SET_CURRENT_PAGE = '/design/SET-CURRENT-PAGE';
const SET_DESIGNS_TOTAL_COUNT = '/design/SET-DESIGNS-TOTAL-COUNT';
const TOGGLE_IS_FETCHING = '/design/TOGGLE-IS-FETCHING';

let initialState = {
    profile: null,
    designs: [],
    currentPage: 1,
    pageSize: 10,
    totalCount: 4,
    isFetching: false
}

export const designReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_DESIGN:
            return {
                ...state,
                designs: [...state.designs, {...action.newDesign, editMode: true}]
            }
        case UPDATE_DESIGN:
            return {
                ...state,
                designs: updateObjectInArray(state.designs, action.designId, "id", {name: action.name})
            }
        case DELETE_DESIGN:
            return {
                ...state,
                designs: state.designs.filter(c => c.id !== action.designId)
            }
        case SET_DESIGNS:
            return {...state, designs: action.designs}
        case SET_DESIGN_PROFILE:
            return {...state, profile: action.profile};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_DESIGNS_TOTAL_COUNT:
            return {...state, totalCount: action.totalCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        default:
            return state;
    }
}


export const addDesignActionCreator = (newDesign) => ({type: ADD_DESIGN, newDesign: newDesign});
export const updateDesignActionCreator = (designId, designName) => ({
    type: UPDATE_DESIGN,
    designId: designId,
    name: designName
});
export const deleteDesignActionCreator = (designId) => ({type: DELETE_DESIGN, designId: designId});

export const setDesignsActionCreator = (designs) => ({type: SET_DESIGNS, designs: designs});
export const setDesignProfileActionCreator = (profile) => ({
    type: SET_DESIGN_PROFILE,
    profile: profile
});
export const setCurrentPageActionCreator = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage: currentPage});
export const setTotalCountActionCreator = (totalCount) => ({
    type: SET_DESIGNS_TOTAL_COUNT,
    totalCount: totalCount
});
export const setIsFetchingActionCreator = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching: isFetching
});

export const addDesignThunkCreator = (design) => {
    return async (dispatch) => {
        try {
            let responseCreateDesign = await designAPI.createDesign(design);
            if (responseCreateDesign.status === 201) {
                let newDesignId = responseCreateDesign.data;
                let responseGetDesign = await designAPI.getDesign(newDesignId);
                if (responseGetDesign.status === 200) {
                    dispatch(addDesignActionCreator(responseGetDesign.data));
                    dispatch(reset("designCreateForm"));
                }
            }
        } catch (error) {
            const messages = error.response.data.messages;
            let message = messages.length > 0 ? messages[0] : "Some error occurred...";
            dispatch(stopSubmit("designCreateForm", {_error: message}))
            return Promise.reject(message);
        }
    };
}
export const updateDesignThunkCreator = (designId, designName) => {
    return async (dispatch) => {
        let response = await designAPI.updateDesign(designId, designName);
        if (response.status === 200) {
            dispatch(updateDesignActionCreator(designId, designName));
        }
    };
}
export const deleteDesignThunkCreator = (designId) => {
    return async (dispatch) => {
        let response = await designAPI.deleteDesign(designId);
        if (response.status === 200) {
            dispatch(deleteDesignActionCreator(designId));
        }
    };
}
export const getDesignsThunkCreator = () => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        let response = await designAPI.getDesigns();
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setDesignsActionCreator(response.data.viewDtoList));
            dispatch(setTotalCountActionCreator(response.data.totalCount));
        }
    };
}
export const getDesignsByNumberAndSizeThunkCreator = (pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(pageNumber));
        let response = await designAPI.getDesignsByNumberAndSize(pageNumber, pageSize);
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setDesignsActionCreator(response.data.viewDtoList));
        }
    };
}
export const getDesignsOfFolderByNumberAndSizeThunkCreator = (folderId, pageNumber, pageSize) => {
    return async (dispatch) => {
        dispatch(setIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(pageNumber));
        let response = await designAPI.getDesignsOfFolderByNumberAndSize(folderId, pageNumber, pageSize);
        if (response.status === 200) {
            dispatch(setIsFetchingActionCreator(false));
            dispatch(setDesignsActionCreator(response.data.viewDtoList));
        }
    };
}
export const getDesignProfileThunkCreator = (designId) => {
    return async (dispatch) => {
        designAPI.getDesign(designId).then(response => {
            if (response.status === 200) {
                dispatch(setDesignProfileActionCreator(response.data));
            }
        });
    };
}