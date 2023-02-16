import React from "react";
import {connect} from "react-redux";
import "../common/PageNavigation.module.css";
import {
    addCommentThunkCreator,
    deleteCommentThunkCreator,
    getCommentsByNumberAndSizeThunkCreator,
    getCommentsThunkCreator,
    setCurrentPageActionCreator,
    setIsFetchingActionCreator,
    updateCommentThunkCreator
} from "../../redux/comment-reducer";
import CommentList from "./CommentList";
import {
    getComments,
    getCurrentPageOfComments,
    getIsFetchingOfComments,
    getPageSizeOfComments,
    getTotalCountOfComments
} from "../../redux/comment-selector";
import {getIsAuthenticated} from "../../redux/auth-selector";

class CommentListContainer extends React.Component {
    componentDidMount() {
        this.props.getComments();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props || nextState !== this.props;
    }

    onPageChange = (pageNumber) => {
        this.props.getCommentsByNumberAndSize(pageNumber, this.props.pageSize);
    }

    onAddComment = (values) => {
        this.props.addComment(this.props.postId, this.props.userId, values.text);
    }

    onUpdateComment = (commentId, text) => {
        this.props.updateComment(commentId, text);
    }

    onDeleteComment = (commentId) => {
        this.props.deleteComment(commentId);
    }

    render() {
        return <CommentList comments={this.props.comments}
                            currentPage={this.props.currentPage}
                            pageSize={this.props.pageSize}
                            totalCount={this.props.totalCount}
                            isFetching={this.props.isFetching}
                            isAuthenticated={this.props.isAuthenticated}
                            onPageChange={this.onPageChange}
                            onAddComment={this.onAddComment}
                            onUpdateComment={this.onUpdateComment}
                            onDeleteComment={this.onDeleteComment}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        comments: getComments(state),
        currentPage: getCurrentPageOfComments(state),
        pageSize: getPageSizeOfComments(state),
        totalCount: getTotalCountOfComments(state),
        isFetching: getIsFetchingOfComments(state),
        isAuthenticated: getIsAuthenticated(state),
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addComment: (postId, userId, text) => {
            dispatch(addCommentThunkCreator(postId, userId, text));
        },
        updateComment: (commentId, text) => {
            dispatch(updateCommentThunkCreator(commentId, text));
        },
        deleteComment: (commentId) => {
            dispatch(deleteCommentThunkCreator(commentId));
        },
        getComments: () => {
            dispatch(getCommentsThunkCreator());
        },
        getCommentsByNumberAndSize: (pageNumber, pageSize) => {
            dispatch(getCommentsByNumberAndSizeThunkCreator(pageNumber, pageSize));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber));
        },
        setIsFetching: (isFetching) => {
            dispatch(setIsFetchingActionCreator(isFetching));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);