import React from "react";
import {connect} from "react-redux";
import "../common/page-navigation/PageNavigation.module.css";
import {
    addCommentThunkCreator,
    deleteCommentThunkCreator,
    getCommentsByNumberAndSizeThunkCreator,
    getCommentsOfPostByNumberAndSizeThunkCreator,
    getCommentsOfPostThunkCreator,
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
        this.props.getCommentsOfPost(this.props.postId);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props || nextState !== this.props;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const postId = this.props.postId;
        const prevPostId = prevProps.postId;
        if (postId !== prevPostId) {
            this.props.getCommentsOfPost(postId);
        }
    }

    onPageChange = (pageNumber) => {
        this.props.getCommentsOfPostByNumberAndSize(this.props.postId, pageNumber, this.props.pageSizeOfComments);
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
                            currentPage={this.props.currentPageOfComments}
                            pageSize={this.props.pageSizeOfComments}
                            totalCount={this.props.totalCountOfComments}
                            isFetching={this.props.isFetchingOfComments}
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
        currentPageOfComments: getCurrentPageOfComments(state),
        pageSizeOfComments: getPageSizeOfComments(state),
        totalCountOfComments: getTotalCountOfComments(state),
        isFetchingOfComments: getIsFetchingOfComments(state),
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
        getCommentsOfPost: (postId) => {
            dispatch(getCommentsOfPostThunkCreator(postId));
        },
        getCommentsByNumberAndSize: (pageNumber, pageSize) => {
            dispatch(getCommentsByNumberAndSizeThunkCreator(pageNumber, pageSize));
        },
        getCommentsOfPostByNumberAndSize: (postId, pageNumber, pageSize) => {
            dispatch(getCommentsOfPostByNumberAndSizeThunkCreator(postId, pageNumber, pageSize));
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