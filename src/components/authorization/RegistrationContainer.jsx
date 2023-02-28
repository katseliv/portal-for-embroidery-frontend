import React from 'react';
import {connect} from "react-redux";
import Registration from "./Registration";
import {Navigate} from "react-router-dom";
import {getUserProfile} from "../../redux/user-selector";
import {getAuthorizedUserId, getIsAuthenticated} from "../../redux/auth-selector";
import {registerUserThunkCreator} from "../../redux/user-reducer";

class RegistrationContainer extends React.Component {
    onUserRegister = (user) => {
        this.props.registerUser(user);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Navigate replace to='/profile'/>;
        }
        return <Registration onSignUp={this.onUserRegister}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        profile: getUserProfile(state),
        authorizedUserId: getAuthorizedUserId(state),
        isAuthenticated: getIsAuthenticated(state)
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (user) => {
            dispatch(registerUserThunkCreator(user));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);