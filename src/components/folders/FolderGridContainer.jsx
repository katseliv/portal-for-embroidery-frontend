import React from "react";
import {connect} from "react-redux";
import {
    addFolderThunkCreator,
    getFoldersOfParentFolderByNumberAndSizeThunkCreator,
    getFoldersOfUserByNumberAndSizeThunkCreator,
    getFoldersThunkCreator,
    setCurrentPageActionCreator,
    setInitialPathActionCreator,
    setIsFetchingActionCreator,
    setPathActionCreator,
    updateFolderThunkCreator
} from "../../redux/folder-reducer";
import {
    getCurrentFolderOfFolders,
    getCurrentPageOfFolders,
    getFolders,
    getIsFetchingOfFolders,
    getPageSizeOfFolders,
    getPathOfFolders,
    getTotalCountOfFolders
} from "../../redux/folder-selector";
import {getUserProfile} from "../../redux/user-selector";
import {getDesigns} from "../../redux/design-selector";
import {
    addDesignThunkCreator,
    getDesignsOfFolderByNumberAndSizeThunkCreator,
    setDesignsActionCreator,
    updateDesignThunkCreator
} from "../../redux/design-reducer";
import FolderGrid from "./FolderGrid";

class FolderGridContainer extends React.Component {
    componentDidMount() {
        this.refreshFolderGrid();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const profileId = this.props.profile.id;
        const prevProfileId = prevProps.profile.id;
        if (profileId !== prevProfileId) {
            this.refreshFolderGrid();
        }
    }

    refreshFolderGrid() {
        const profileId = this.props.profile.id;
        const pageNumber = 1;
        this.props.setDesignsOfRootFolder();
        this.props.getFoldersOfUserByNumberAndSize(profileId, pageNumber, this.props.pageSizeOfFolders);
    }

    onAddFolder = (folder) => {
        this.props.addFolder(folder);
    }

    onUpdateFolder = (folderId, folderName) => {
        this.props.updateFolder(folderId, folderName);
    }

    onAddDesign = (design) => {
        this.props.addDesign(design);
    }

    onUpdateDesign = (designId, designName) => {
        this.props.updateDesign(designId, designName);
    }

    onPageChange = (pageNumber) => {
        const profileId = this.props.profile.id;
        this.props.getFoldersOfUserByNumberAndSize(profileId, pageNumber, this.props.pageSizeOfFolders);
    }

    onFolderChange = (folderId) => {
        const pageNumber = 1;
        this.props.getFoldersOfFolderByNumberAndSize(folderId, pageNumber, this.props.pageSizeOfFolders);
        this.props.getDesignsOfFolderByNumberAndSize(folderId, pageNumber, this.props.pageSizeOfFolders);
    }

    onBackHome = () => {
        this.props.setInitialPath();
        this.refreshFolderGrid();
        this.props.setDesignsOfRootFolder();
    }

    onSetPath = (folderName) => {
        this.props.setPath(folderName);
    }

    render() {
        return <FolderGrid profileId={this.props.profile.id}
                           folders={this.props.folders}
                           designs={this.props.designs}
                           path={this.props.pathOfFolders}
                           currentFolder={this.props.currentFolderOfFolders}
                           currentPage={this.props.currentPageOfFolders}
                           pageSize={this.props.pageSizeOfFolders}
                           totalCount={this.props.totalCountOfFolders}
                           isFetching={this.props.isFetchingOfFolders}
                           onAddFolder={this.onAddFolder}
                           onUpdateFolder={this.onUpdateFolder}
                           onAddDesign={this.onAddDesign}
                           onUpdateDesign={this.onUpdateDesign}
                           onPageChange={this.onPageChange}
                           onFolderChange={this.onFolderChange}
                           onBackHome={this.onBackHome}
                           onSetPath={this.onSetPath}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        profile: getUserProfile(state),
        folders: getFolders(state),
        designs: getDesigns(state),
        pathOfFolders: getPathOfFolders(state),
        currentFolderOfFolders: getCurrentFolderOfFolders(state),
        currentPageOfFolders: getCurrentPageOfFolders(state),
        pageSizeOfFolders: getPageSizeOfFolders(state),
        totalCountOfFolders: getTotalCountOfFolders(state),
        isFetchingOfFolders: getIsFetchingOfFolders(state),
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addFolder: (folder) => {
            dispatch(addFolderThunkCreator(folder));
        },
        updateFolder: (folderId, folderName) => {
            dispatch(updateFolderThunkCreator(folderId, folderName));
        },
        getFolders: () => {
            dispatch(getFoldersThunkCreator());
        },
        getFoldersOfUserByNumberAndSize: (userId, pageNumber, pageSize) => {
            dispatch(getFoldersOfUserByNumberAndSizeThunkCreator(userId, pageNumber, pageSize));
        },
        getFoldersOfFolderByNumberAndSize: (folderId, pageNumber, pageSize) => {
            dispatch(getFoldersOfParentFolderByNumberAndSizeThunkCreator(folderId, pageNumber, pageSize));
        },
        addDesign: (design) => {
            dispatch(addDesignThunkCreator(design));
        },
        updateDesign: (designId, designName) => {
            dispatch(updateDesignThunkCreator(designId, designName));
        },
        getDesignsOfFolderByNumberAndSize: (folderId, pageNumber, pageSize) => {
            dispatch(getDesignsOfFolderByNumberAndSizeThunkCreator(folderId, pageNumber, pageSize));
        },
        setInitialPath: () => {
            dispatch(setInitialPathActionCreator());
        },
        setDesignsOfRootFolder: () => {
            dispatch(setDesignsActionCreator([]));
        },
        setPath: (folderName) => {
            dispatch(setPathActionCreator(folderName));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber));
        },
        setIsFetching: (isFetching) => {
            dispatch(setIsFetchingActionCreator(isFetching));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderGridContainer);