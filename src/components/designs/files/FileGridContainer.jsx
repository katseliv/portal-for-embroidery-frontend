import React from "react";
import {connect} from "react-redux";
import FileGridSidePanel from "./FileGridSidePanel";
import {getFiles, getIsFetchingOfFiles, getPageSizeOfFiles} from "../../../redux/file-selector";
import {
    addFileThunkCreator,
    updateFileThunkCreator,
    getFilesOfDesignByNumberAndSizeThunkCreator
} from "../../../redux/file-reducer";
import {getDesignProfile} from "../../../redux/design-selector";

class FileGridContainer extends React.Component {
    componentDidMount() {
        this.refreshFileGrid();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const profileId = this.props.profile.id;
        const prevProfileId = prevProps.profile.id;
        if (profileId !== prevProfileId) {
            this.refreshFileGrid();
        }
    }

    refreshFileGrid() {
        const profileId = this.props.profile.id;
        const pageNumber = 1;
        this.props.getFilesOfDesignByNumberAndSize(profileId, pageNumber, this.props.pageSizeOfFiles);
    }

    onAddFile = (file) => {
        this.props.addFile(file);
    }

    onUpdateFile = (fileId, fileName) => {
        this.props.updateFile(fileId, fileName);
    }

    render() {
        return <FileGridSidePanel profile={this.props.profile}
                                  files={this.props.files}
                                  isFetching={this.props.isFetchingOfFiles}
                                  onAddFile={this.onAddFile}
                                  onUpdateFile={this.onUpdateFile}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        profile: getDesignProfile(state),
        files: getFiles(state),
        pageSizeOfFiles: getPageSizeOfFiles(state),
        isFetchingOfFiles: getIsFetchingOfFiles(state),
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addFile: (file) => {
            dispatch(addFileThunkCreator(file));
        },
        updateFile: (fileId, fileName) => {
            dispatch(updateFileThunkCreator(fileId, fileName));
        },
        getFilesOfDesignByNumberAndSize: (designId, pageNumber, pageSize) => {
            dispatch(getFilesOfDesignByNumberAndSizeThunkCreator(designId, pageNumber, pageSize));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileGridContainer);