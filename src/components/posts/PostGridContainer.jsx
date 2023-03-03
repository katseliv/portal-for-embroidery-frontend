import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {useLocation} from "react-router-dom";
import PostGrid from "./PostGrid";
import {
    addPostThunkCreator,
    deletePostThunkCreator,
    dislikeFlowThunkCreator,
    getDesignersThunkCreator,
    getDesignsThunkCreator,
    getPostsByDesignerThunkCreator,
    getPostsByNumberAndSizeThunkCreator,
    getPostsByTagThunkCreator,
    getPostsByUserThunkCreator,
    getPostsThunkCreator,
    likeFlowThunkCreator,
    setCurrentPageActionCreator,
    setIsFetchingActionCreator
} from "../../redux/post-reducer";
import {
    getCurrentPageOfPosts,
    getDesigners,
    getDesigns,
    getIsFetchingOfPosts,
    getIsLikingInProgressOfPosts,
    getPageSizeOfPosts,
    getPosts,
    getTotalCountOfPosts
} from "../../redux/post-selector";
import {getUserProfile} from "../../redux/user-selector";
import {getAuthorizedUserId, getIsAuthenticated} from "../../redux/auth-selector";

class PostGridContainer extends React.Component {
    componentDidMount() {
        this.refreshPostGrid();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props || nextState !== this.props;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let pathName = this.props.location.pathname;
        let prevPathName = prevProps.location.pathname;
        if (pathName !== prevPathName) {
            this.refreshPostGrid();
        }
    }

    refreshPostGrid() {
        if (this.props.isAuthenticated) {
            const userId = this.props.authorizedUserId;
            let pathName = this.props.location.pathname;
            if (pathName === "/my-designs") {
                this.props.getPostsByDesigner(userId);
            } else {
                this.props.getPostsByUser(userId);
            }
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

    getPostsByUser = (userId) => {
        this.props.getPostsByUser(userId);
    }

    getPostsByTag = (tagName) => {
        this.props.getPostsByTag(tagName);
    }

    getPostsByNumberAndSize = () => {
        this.props.getPostsByNumberAndSize(this.props.currentPageOfPosts, this.props.pageSizeOfPosts);
    }

    setCurrentPage = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
    }

    getDesigners = () => {
        this.props.getDesigners();
    }

    getDesigns = () => {
        this.props.getDesigns();
    }

    likePost = (postId) => {
        this.props.likePost(postId, this.props.authorizedUserId);
    }

    dislikePost = (postId) => {
        this.props.dislikePost(postId, this.props.authorizedUserId);
    }

    render() {
        return <PostGrid profile={this.props.profile}
                         posts={this.props.posts}
                         designers={this.props.designers}
                         designs={this.props.designs}
                         currentPage={this.props.currentPageOfPosts}
                         pageSize={this.props.pageSizeOfPosts}
                         totalCount={this.props.totalCountOfPosts}
                         isFetching={this.props.isFetchingOfPosts}
                         isLikingInProgress={this.props.isLikingInProgressOfPost}
                         isAuthenticated={this.props.isAuthenticated}
                         getPosts={this.getPosts}
                         getPostsByTag={this.getPostsByTag}
                         getPostsByNumberAndSize={this.getPostsByNumberAndSize}
                         setCurrentPage={this.setCurrentPage}
                         getDesigners={this.getDesigners}
                         getDesigns={this.getDesigns}
                         onAddPost={this.onAddPost}
                         onDeletePost={this.onDeletePost}
                         like={this.likePost}
                         dislike={this.dislikePost}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        posts: getPosts(state),
        designers: getDesigners(state),
        designs: getDesigns(state),
        currentPageOfPosts: getCurrentPageOfPosts(state),
        pageSizeOfPosts: getPageSizeOfPosts(state),
        totalCountOfPosts: getTotalCountOfPosts(state),
        isFetchingOfPosts: getIsFetchingOfPosts(state),
        isLikingInProgressOfPost: getIsLikingInProgressOfPosts(state),
        profile: getUserProfile(state),
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
        getPostsByDesigner: (designerId) => {
            dispatch(getPostsByDesignerThunkCreator(designerId));
        },
        getPostsByTag: (tagName) => {
            dispatch(getPostsByTagThunkCreator(tagName));
        },
        getPostsByNumberAndSize: (pageNumber, pageSize) => {
            dispatch(getPostsByNumberAndSizeThunkCreator(pageNumber, pageSize));
        },
        getDesigners: () => {
            dispatch(getDesignersThunkCreator());
        },
        getDesigns: () => {
            dispatch(getDesignsThunkCreator());
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber));
        },
        setIsFetching: (isFetching) => {
            dispatch(setIsFetchingActionCreator(isFetching));
        },
    }
}

function withLocation(Component) {
    return props => <Component {...props} location={useLocation()}/>;
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withLocation)(PostGridContainer);