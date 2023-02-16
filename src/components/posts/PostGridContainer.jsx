import React from "react";
import {connect} from "react-redux";
import PostGrid from "./PostGrid";
import {
    addPostThunkCreator,
    deletePostThunkCreator,
    dislikeFlowThunkCreator, getPostsByNumberAndSizeThunkCreator, getPostsThunkCreator,
    likeFlowThunkCreator, setCurrentPageActionCreator, setIsFetchingActionCreator,
    updatePostThunkCreator
} from "../../redux/post-reducer";
import {
    getCurrentPageOfPosts,
    getIsFetchingOfPosts,
    getIsLikingInProgressOfPosts,
    getPageSizeOfPosts,
    getPosts,
    getTotalCountOfPosts
} from "../../redux/post-selector";


class PostGridContainer extends React.Component {
    componentDidMount() {
        this.props.getPosts();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props || nextState !== this.props;
    }

    getPosts = (pageNumber) => {
        this.props.getPostsByNumberAndSize(pageNumber, this.props.pageSizeOfPosts);
    }

    likePost = (postId) => {
        this.props.likePost(postId);
    }

    dislikePost = (postId) => {
        this.props.dislikePost(postId);
    }

    render() {
        return <PostGrid posts={this.props.posts}
                         currentPage={this.props.currentPageOfPosts}
                         pageSize={this.props.pageSizeOfPosts}
                         totalCount={this.props.totalCountOfPosts}
                         isFetching={this.props.isFetchingOfPosts}
                         isLikingInProgress={this.props.isLikingInProgressOfPost}
                         getPosts={this.getPosts}
                         like={this.likePost}
                         dislike={this.dislikePost}/>;
    }

}

let mapStateToProps = (state) => {
    return {
        posts: getPosts(state),
        currentPageOfPosts: getCurrentPageOfPosts(state),
        pageSizeOfPosts: getPageSizeOfPosts(state),
        totalCountOfPosts: getTotalCountOfPosts(state),
        isFetchingOfPosts: getIsFetchingOfPosts(state),
        isLikingInProgressOfPost: getIsLikingInProgressOfPosts(state),
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (designerId, designId, description) => {
            dispatch(addPostThunkCreator(designerId, designId, description));
        },
        updatePost: (postId, description) => {
            dispatch(updatePostThunkCreator(postId, description));
        },
        deletePost: (postId) => {
            dispatch(deletePostThunkCreator(postId));
        },
        likePost: (postId) => {
            dispatch(likeFlowThunkCreator(postId));
        },
        dislikePost: (postId) => {
            dispatch(dislikeFlowThunkCreator(postId));
        },
        getPosts: () => {
            dispatch(getPostsThunkCreator());
        },
        getPostsByNumberAndSize: (pageNumber, pageSize) => {
            dispatch(getPostsByNumberAndSizeThunkCreator(pageNumber, pageSize));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber));
        },
        setIsFetching: (isFetching) => {
            dispatch(setIsFetchingActionCreator(isFetching));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostGridContainer);