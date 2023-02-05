import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import "../common/PageNavigation.module.css";
import {
    addCommentActionCreator,
    dislikeActionCreator,
    getCommentsByNumberAndSizeThunkCreator,
    getCommentsThunkCreator,
    likeActionCreator,
    setCurrentPageActionCreator,
    setIsFetchingActionCreator,
    setIsLikingInProgressActionCreator,
    updateCommentThunkCreator
} from "../../redux/comment-reducer";
import CommentList from "./CommentList";

class CommentListContainer extends React.Component {
    componentDidMount() {
        this.props.getComments();
    }

    onPageChange = (pageNumber) => {
        this.props.getCommentsByNumberAndSize(pageNumber, this.props.pageSize);
    }

    onAddComment = (values) => {
        this.props.addComment(values.newCommentText);
    }

    onUpdateComment = (commentId, text) => {
        this.props.updateComment(commentId, text);
    }

    like = (commentId) => {
        this.props.setIsLikingInProgress(true, commentId);
        axios.post(
            `http://localhost:8080/api/v1/posts?${commentId}`,
            {},
            {
                headers: {
                    "Authorization": ""
                }
            })
            .then(response => {
                if (response.status === 200) {
                    this.props.like(commentId);
                }
                this.props.setIsLikingInProgress(false, commentId);
            })
        this.props.like(commentId);
    }

    dislike = (commentId) => {
        this.props.dislike(commentId);
    }

    render() {
        return <CommentList comments={this.props.comments}
                            totalCount={this.props.totalCount}
                            pageSize={this.props.pageSize}
                            currentPage={this.props.currentPage}
                            isFetching={this.props.isFetching}
                            isLikingInProgress={this.props.isLikingInProgress}
                            onPageChange={this.onPageChange}
                            onAddComment={this.onAddComment}
                            onUpdateComment={this.onUpdateComment}
                            like={this.like}
                            dislike={this.dislike}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        comments: state.commentPage.comments,
        currentPage: state.commentPage.currentPage,
        pageSize: state.commentPage.pageSize,
        totalCount: state.commentPage.totalCount,
        isFetching: state.commentPage.isFetching,
        isLikingInProgress: state.commentPage.isLikingInProgress,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addComment: (newCommentText) => {
            dispatch(addCommentActionCreator(newCommentText));
        },
        updateComment: (commentId, text) => {
            dispatch(updateCommentThunkCreator(commentId, text));
        },
        like: (commentId) => {
            dispatch(likeActionCreator(commentId));
        },
        dislike: (commentId) => {
            dispatch(dislikeActionCreator(commentId));
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
        setIsLikingInProgress: (isFetching, id) => {
            dispatch(setIsLikingInProgressActionCreator(isFetching, id));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);