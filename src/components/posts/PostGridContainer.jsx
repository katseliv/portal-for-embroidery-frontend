import React from "react";
import {connect} from "react-redux";
import PostGrid from "./PostGrid";
import {
    addPostThunkCreator,
    deletePostThunkCreator,
    dislikeFlowThunkCreator,
    getPostsByNumberAndSizeThunkCreator, getPostsByTagThunkCreator,
    getPostsThunkCreator,
    likeFlowThunkCreator,
    setCurrentPageActionCreator,
    setIsFetchingActionCreator
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

    onAddPost = (post) => {
        this.props.addPost(post);
    }

    onDeletePost = (postId) => {
        this.props.deletePost(postId);
    }

    getPosts = () => {
        this.props.getPosts();
    }

    getPostsByNumber = (pageNumber) => {
        this.props.getPostsByNumberAndSize(pageNumber, this.props.pageSizeOfPosts);
    }

    getPostsByTag = (tagName) => {
        this.props.getPostsByTag(tagName);
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
                         getPostsByNumber={this.getPostsByNumber}
                         getPostsByTag={this.getPostsByTag}
                         onAddPost={this.onAddPost}
                         onDeletePost={this.onDeletePost}
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
        addPost: (post) => {
            dispatch(addPostThunkCreator(post));
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
        getPostsByTag: (tagName) => {
            dispatch(getPostsByTagThunkCreator(tagName));
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