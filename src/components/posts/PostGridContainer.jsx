import React from "react";
import {connect} from "react-redux";
import PostGrid from "./PostGrid";
import {dislikeFlowThunkCreator, likeFlowThunkCreator} from "../../redux/post-reducer";
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
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props || nextState !== this.props;
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
        likePost: (commentId) => {
            dispatch(likeFlowThunkCreator(commentId));
        },
        dislikePost: (commentId) => {
            dispatch(dislikeFlowThunkCreator(commentId));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostGridContainer);