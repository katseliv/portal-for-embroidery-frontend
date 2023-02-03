import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import "../common/PageNavigation.module.css";
import {
    addCommentActionCreator,
    dislikeActionCreator,
    likeActionCreator,
    setCommentsActionCreator,
    setCurrentPageActionCreator,
    setIsFetchingActionCreator, setIsLikingInProgressActionCreator,
    setTotalCountActionCreator,
    updateNewCommentTextActionCreator
} from "../../redux/comment-reducer";
import CommentList from "./CommentList";
import {commentAPI} from "../../api/api";

class CommentListContainer extends React.Component {

    newCommentItem = React.createRef();

    componentDidMount() {
        this.props.setIsFetching(true);
        commentAPI.getComments().then(response => {
            this.props.setIsFetching(false);
            this.props.setComments(response.data.viewDtoList);
            this.props.setTotalCommentsCount(response.data.totalCount);
        });
    }

    onPageChange = (pageNumber) => {
        this.props.setIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        commentAPI.getCommentsByNumberAndSize(pageNumber, this.props.pageSize).then(response => {
            this.props.setIsFetching(false);
            this.props.setComments(response.data.viewDtoList);
        })
    }

    onCommentChange = () => {
        let text = this.newCommentItem.current.value;
        this.props.updateNewCommentText(text);
    }

    onAddComment = () => {
        this.props.onAddComment();
    }

    like = (commentId) => {
        this.props.setIsLikingInProgress(true);
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
                this.props.setIsLikingInProgress(false);
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
                            onPageChange={this.onPageChange}
                            onCommentChange={this.onCommentChange}
                            onAddComment={this.onAddComment}
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
        setIsLikingInProgress: (isLikingInProgress) => {
            dispatch(setIsLikingInProgressActionCreator(isLikingInProgress));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);