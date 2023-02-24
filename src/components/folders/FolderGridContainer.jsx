import React from "react";
import {connect} from "react-redux";
import {
    getFoldersOfParentFolderByNumberAndSizeThunkCreator,
    getFoldersOfUserByNumberAndSizeThunkCreator,
    getFoldersThunkCreator,
    setCurrentPageActionCreator, setInitialPathActionCreator,
    setIsFetchingActionCreator,
    setPathActionCreator
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
import FolderGrid from "./FolderGrid";
import {
    getCurrentPageOfFiles,
    getFiles,
    getIsFetchingOfFiles,
    getPageSizeOfFiles,
    getTotalCountOfFiles
} from "../../redux/file-selector";
import {getFilesOfFolderByNumberAndSizeThunkCreator, setFilesActionCreator} from "../../redux/file-reducer";
import {getUserProfile} from "../../redux/user-selector";

class FolderGridContainer extends React.Component {
    componentDidMount() {
        this.refreshFolderGrid();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let profileId = this.props.profile.id;
        let prevProfileId = prevProps.profile.id;
        if (profileId !== prevProfileId) {
            this.refreshFolderGrid();
        }
    }

    refreshFolderGrid() {
        const pageNumber = 1;
        this.props.getFoldersOfUserByNumberAndSize(this.props.profile.id, pageNumber, this.props.pageSizeOfFolders);
        this.props.getFilesOfFolderByNumberAndSize(null, pageNumber, this.props.pageSizeOfFolders);
    }

    onPageChange = (pageNumber) => {
        this.props.getFoldersOfUserByNumberAndSize(this.props.profile.id, pageNumber, this.props.pageSizeOfFolders);
    }

    onFolderChange = (folderId) => {
        const pageNumber = 1;
        this.props.getFoldersOfFolderByNumberAndSize(folderId, pageNumber, this.props.pageSizeOfFolders);
        this.props.getFilesOfFolderByNumberAndSize(folderId, pageNumber, this.props.pageSizeOfFolders);
    }

    onBackHome = () => {
        this.props.setInitialPath();
        this.refreshFolderGrid();
        this.props.setFilesOfRootFolder();
    }

    onSetPath = (folderName) => {
        this.props.setPath(folderName);
    }

    render() {
        return <FolderGrid folders={this.props.folders}
                           files={this.props.files}
                           path={this.props.pathOfFolders}
                           currentFolder={this.props.currentFolderOfFolders}
                           currentPage={this.props.currentPageOfFolders}
                           pageSize={this.props.pageSizeOfFolders}
                           totalCount={this.props.totalCountOfFolders}
                           isFetching={this.props.isFetchingOfFolders}
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
        pathOfFolders: getPathOfFolders(state),
        currentFolderOfFolders: getCurrentFolderOfFolders(state),
        currentPageOfFolders: getCurrentPageOfFolders(state),
        pageSizeOfFolders: getPageSizeOfFolders(state),
        totalCountOfFolders: getTotalCountOfFolders(state),
        isFetchingOfFolders: getIsFetchingOfFolders(state),
        files: getFiles(state),
        currentPageOfFiles: getCurrentPageOfFiles(state),
        pageSizeOfFiles: getPageSizeOfFiles(state),
        totalCountOfFiles: getTotalCountOfFiles(state),
        isFetchingOfFiles: getIsFetchingOfFiles(state),
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getFolders: () => {
            dispatch(getFoldersThunkCreator());
        },
        getFoldersOfUserByNumberAndSize: (userId, pageNumber, pageSize) => {
            dispatch(getFoldersOfUserByNumberAndSizeThunkCreator(userId, pageNumber, pageSize));
        },
        getFoldersOfFolderByNumberAndSize: (folderId, pageNumber, pageSize) => {
            dispatch(getFoldersOfParentFolderByNumberAndSizeThunkCreator(folderId, pageNumber, pageSize));
        },
        getFilesOfFolderByNumberAndSize: (folderId, pageNumber, pageSize) => {
            dispatch(getFilesOfFolderByNumberAndSizeThunkCreator(folderId, pageNumber, pageSize));
        },
        setInitialPath: () => {
            dispatch(setInitialPathActionCreator());
        },
        setFilesOfRootFolder: () => {
            dispatch(setFilesActionCreator([]));
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