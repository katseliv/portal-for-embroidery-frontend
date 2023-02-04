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
    setCommentsActionCreator,
    setCurrentPageActionCreator,
    setIsFetchingActionCreator,
    setIsLikingInProgressActionCreator,
    setTotalCountActionCreator, updateCommentThunkCreator,
    updateNewCommentTextActionCreator
} from "../../redux/comment-reducer";
import CommentList from "./CommentList";

class CommentListContainer extends React.Component {

    newCommentItem = React.createRef();

    componentDidMount() {
        this.props.getComments();
    }

    onPageChange = (pageNumber) => {
        this.props.getCommentsByNumberAndSize(pageNumber, this.props.pageSize);
    }

    onCommentChange = () => {
        let text = this.newCommentItem.current.value;
        this.props.updateNewCommentText(text);
    }

    onAddComment = () => {
        this.props.onAddComment();
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
                            newCommentText={this.props.newCommentText}
                            newCommentItem={this.newCommentItem}
                            isFetching={this.props.isFetching}
                            isLikingInProgress={this.props.isLikingInProgress}
                            onPageChange={this.onPageChange}
                            onCommentChange={this.onCommentChange}
                            onAddComment={this.onAddComment}
                            onUpdateComment={this.onUpdateComment}
                            like={this.like}
                            dislike={this.dislike}

        />;
    }
}

let mapStateToProps = (state) => {
    return {
        comments: state.commentPage.comments,
        newCommentText: state.commentPage.newCommentText,
        currentPage: state.commentPage.currentPage,
        pageSize: state.commentPage.pageSize,
        totalCount: state.commentPage.totalCount,
        isFetching: state.commentPage.isFetching,
        isLikingInProgress: state.commentPage.isLikingInProgress,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        like: (commentId) => {
            dispatch(likeActionCreator(commentId));
        },
        dislike: (commentId) => {
            dispatch(dislikeActionCreator(commentId));
        },
        updateNewCommentText: (text) => {
            dispatch(updateNewCommentTextActionCreator(text));
        },
        onAddComment: () => {
            dispatch(addCommentActionCreator());
        },
        setComments: (comments) => {
            dispatch(setCommentsActionCreator(comments));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber));
        },
        setTotalCommentsCount: (totalCount) => {
            dispatch(setTotalCountActionCreator(totalCount));
        },
        setIsFetching: (isFetching) => {
            dispatch(setIsFetchingActionCreator(isFetching));
        },
        setIsLikingInProgress: (isFetching, id) => {
            dispatch(setIsLikingInProgressActionCreator(isFetching, id));
        },
        updateComment: (commentId, text) => {
            dispatch(updateCommentThunkCreator(commentId, text));
        },
        getComments: () => {
            dispatch(getCommentsThunkCreator());
        },
        getCommentsByNumberAndSize: (pageNumber, pageSize) => {
            dispatch(getCommentsByNumberAndSizeThunkCreator(pageNumber, pageSize));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);