import React from "react";
import {connect} from "react-redux";
import {
    getFoldersByNumberAndSizeThunkCreator,
    getFoldersThunkCreator,
    setCurrentPageActionCreator,
    setIsFetchingActionCreator
} from "../../redux/folder-reducer";
import {
    getCurrentPageOfFolders,
    getFolders,
    getIsFetchingOfFolders,
    getPageSizeOfFolders,
    getTotalCountOfFolders
} from "../../redux/folder-selector";
import FolderGrid from "./FolderGrid";

class FolderGridContainer extends React.Component {

    componentDidMount() {
        this.props.getFoldersByNumberAndSize(1, this.props.pageSizeOfFolders);
    }

    onPageChange = (pageNumber) => {
        this.props.getFoldersByNumberAndSize(pageNumber, this.props.pageSizeOfFolders);
    }

    render() {
        return <FolderGrid folders={this.props.folders}
                           currentPage={this.props.currentPageOfFolders}
                           pageSize={this.props.pageSizeOfFolders}
                           totalCount={this.props.totalCountOfFolders}
                           isFetching={this.props.isFetchingOfFolders}
                           onPageChange={this.onPageChange}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        folders: getFolders(state),
        currentPageOfFolders: getCurrentPageOfFolders(state),
        pageSizeOfFolders: getPageSizeOfFolders(state),
        totalCountOfFolders: getTotalCountOfFolders(state),
        isFetchingOfFolders: getIsFetchingOfFolders(state),
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getFolders: () => {
            dispatch(getFoldersThunkCreator());
        },
        getFoldersByNumberAndSize: (pageNumber, pageSize) => {
            dispatch(getFoldersByNumberAndSizeThunkCreator(pageNumber, pageSize));
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