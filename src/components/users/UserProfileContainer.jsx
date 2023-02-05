import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import UserProfile from "./UserProfile";
import {compose} from "redux";
import {Navigate, useParams} from "react-router-dom";
import {setUserProfileActionCreator} from "../../redux/profile-reducer";

class UserProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        debugger;
        axios.get(`http://localhost:8080/api/v1/users/${userId}`)
            .then(response => {
                this.props.setUserProfile(response.data);
            });
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Navigate replace to='/sign-in'/>;
        }
        return <UserProfile {...this.props} profile={this.props.profile}/>;
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
        setUserProfile: (profile) => {
            dispatch(setUserProfileActionCreator(profile));
        },
    }
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withParams)(UserProfileContainer)