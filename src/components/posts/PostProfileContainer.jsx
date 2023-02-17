import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {useNavigate, useParams} from "react-router-dom";
import PostProfile from "./PostProfile";
import {getPostProfile} from "../../redux/post-selector";
import {getPostProfileThunkCreator} from "../../redux/post-reducer";
import {getAuthorizedUserId, getIsAuthenticated} from "../../redux/auth-selector";

class PostProfileContainer extends React.Component {
    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let postId = this.props.params.postId;
        let prevPostId = prevProps.params.postId;
        if (postId !== prevPostId) {
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

    render() {
        return <PostProfile {...this.props}
                            profile={this.props.profile}
                            isOwner={!!this.props.authorizedUserId}/>;
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
        getPost: (postId) => {
            dispatch(getPostProfileThunkCreator(postId));
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