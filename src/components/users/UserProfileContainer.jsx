import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import UserProfile from "./UserProfile";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {
    getDesignerProfileThunkCreator,
    getUserProfileThunkCreator,
    updateUserThunkCreator
} from "../../redux/user-reducer";
import {getUserProfile} from "../../redux/user-selector";
import {getAuthorizedUserId, getAuthorizedUserRole, getIsAuthenticated} from "../../redux/auth-selector";
import {initialize} from "redux-form";

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
            } else {
                this.getUserProfile(userId);
            }
        } else {
            this.getUserProfile(userId);
        }
    }

    getUserProfile(userId) {
        console.log(this.props.authorizedUserRole);
        if (this.props.authorizedUserRole === "DESIGNER") {
            this.props.getDesignerProfile(userId);
        } else {
            this.props.getUserProfile(userId);
        }
    }

    initializeUser = () => {
        this.props.initializeUser(this.props.profile);
    }

    onSaveProfile = (userId, profile) => {
        this.props.updateUser(userId, profile);
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Navigate replace to='/sign-in'/>;
        }
        return <UserProfile {...this.props}
                            isOwner={!!this.props.authorizedUserId}
                            profile={this.props.profile}
                            initializeUser={this.initializeUser}
                            onSaveProfile={this.onSaveProfile}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        profile: getUserProfile(state),
        authorizedUserId: getAuthorizedUserId(state),
        authorizedUserRole: getAuthorizedUserRole(state),
        isAuthenticated: getIsAuthenticated(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        initializeUser: (profile) => {
            dispatch(initialize('userProfileUpdateForm', profile, true, {}));
        },
        getUserProfile: (userId) => {
            dispatch(getUserProfileThunkCreator(userId));
        },
        getDesignerProfile: (designerId) => {
            dispatch(getDesignerProfileThunkCreator(designerId));
        },
        updateUser: (userId, profile) => {
            dispatch(updateUserThunkCreator(userId, profile));
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