import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {initialize} from 'redux-form';
import {useNavigate, useParams} from "react-router-dom";
import PostProfile from "./PostProfile";
import {getPostProfile} from "../../redux/post-selector";
import {getPostProfileThunkCreator, updatePostThunkCreator} from "../../redux/post-reducer";
import {getAuthorizedUserId, getIsAuthenticated} from "../../redux/auth-selector";

class PostProfileContainer extends React.Component {
    componentDidMount() {
        this.refreshProfile();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps !== this.props || nextState !== this.props;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let postId = this.props.params.postId;
        let prevPostId = prevProps.params.postId;
        if (postId !== prevPostId && (prevProps !== this.props || prevState !== this.props)) {
            this.refreshProfile();
        }
    }

    refreshProfile() {
        let postId = this.props.params.postId;
        if (postId) {
            this.props.getPost(postId);

        } else {
            this.props.navigate("/designs");
        }
    }

    initializePost = () => {
        this.props.initializePost(this.props.profile);
    }

    onSaveProfile = (postId, description) => {
        this.props.updatePost(postId, description);
    }

    render() {
        return <PostProfile {...this.props}
                            profile={this.props.profile}
                            navigate={this.props.navigate}
                            initializePost={this.initializePost}
                            onSaveProfile={this.onSaveProfile}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        profile: getPostProfile(state),
        authorizedUserId: getAuthorizedUserId(state),
        isAuthenticated: getIsAuthenticated(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        initializePost: (postProfile) => {
            dispatch(initialize('postProfileUpdateForm', postProfile, true, {}));
        },
        getPost: (postId) => {
            dispatch(getPostProfileThunkCreator(postId));
        },
        updatePost: (postId, description) => {
            dispatch(updatePostThunkCreator(postId, description));
        },
    }
}

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()}/>;
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withNavigation, withParams)(PostProfileContainer)