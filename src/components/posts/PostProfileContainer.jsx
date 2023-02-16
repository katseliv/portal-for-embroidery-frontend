import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {useNavigate, useParams} from "react-router-dom";
import PostProfile from "./PostProfile";

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
                            isOwner={!!this.props.authorizedUserId}
                            profile={this.props.profile}
                            saveImage={this.props.saveImage}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        authorizedUserId: state.authPage.id,
        isAuthenticated: state.authPage.isAuthenticated
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getPost: (postId) => {
            dispatch();
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