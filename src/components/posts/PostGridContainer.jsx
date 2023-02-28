import React from "react";
import {connect} from "react-redux";
import PostGrid from "./PostGrid";
import {
    addPostThunkCreator,
    deletePostThunkCreator,
    dislikeFlowThunkCreator,
    getPostsByNumberAndSizeThunkCreator, getPostsByTagThunkCreator, getPostsByUserThunkCreator,
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
import {getAuthorizedUserId, getIsAuthenticated} from "../../redux/auth-selector";

class PostGridContainer extends React.Component {
    componentDidMount() {
        this.refreshPostGrid();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props || nextState !== this.props;
    }

    refreshPostGrid() {
        if (this.props.isAuthenticated) {
            const userId = this.props.authorizedUserId;
            this.props.getPostsByUser(userId);
        } else {
            this.props.getPosts();
        }
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

    getPostsByUser = (userId) => {
        this.props.getPostsByUser(userId);
    }

    getPostsByTag = (tagName) => {
        this.props.getPostsByTag(tagName);
    }

    likePost = (postId) => {
        this.props.likePost(postId, this.props.authorizedUserId);
    }

    dislikePost = (postId) => {
        this.props.dislikePost(postId, this.props.authorizedUserId);
    }

    render() {
        return <PostGrid posts={this.props.posts}
                         currentPage={this.props.currentPageOfPosts}
                         pageSize={this.props.pageSizeOfPosts}
                         totalCount={this.props.totalCountOfPosts}
                         isFetching={this.props.isFetchingOfPosts}
                         isLikingInProgress={this.props.isLikingInProgressOfPost}
                         isAuthenticated={this.props.isAuthenticated}
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
        authorizedUserId: getAuthorizedUserId(state),
        isAuthenticated: getIsAuthenticated(state),
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
        likePost: (postId, userId) => {
            dispatch(likeFlowThunkCreator(postId, userId));
        },
        dislikePost: (postId, userId) => {
            dispatch(dislikeFlowThunkCreator(postId, userId));
        },
        getPosts: () => {
            dispatch(getPostsThunkCreator());
        },
        getPostsByUser: (userId) => {
            dispatch(getPostsByUserThunkCreator(userId));
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