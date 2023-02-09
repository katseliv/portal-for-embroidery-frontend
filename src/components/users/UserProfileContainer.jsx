import React from "react";
import {connect} from "react-redux";
import UserProfile from "./UserProfile";
import {compose} from "redux";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {getUserProfileThunkCreator, saveImageThunkCreator} from "../../redux/profile-reducer";

class UserProfileContainer extends React.Component {

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let userId = this.props.params.userId;
        let prevUserId = prevProps.params.userId;
        if (userId !== prevUserId) {
            this.refreshProfile();
        }
    }

    refreshProfile() {
        let userId = this.props.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.navigate("/sign-in");
            }
        } else {
            this.props.getUserProfile(userId);
        }
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Navigate replace to='/sign-in'/>;
        }
        return <UserProfile {...this.props}
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
        getUserProfile: (userId) => {
            dispatch(getUserProfileThunkCreator(userId));
        },
        saveImage: (image) => {
            dispatch(saveImageThunkCreator(image));
        },
    }
}

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()}/>;
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withNavigation, withParams)(UserProfileContainer)