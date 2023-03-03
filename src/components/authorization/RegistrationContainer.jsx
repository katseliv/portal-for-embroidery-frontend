import React from 'react';
import {connect} from "react-redux";
import Registration from "./Registration";
import {Navigate} from "react-router-dom";
import {getIsAuthenticated} from "../../redux/auth-selector";
import {registerDesignerThunkCreator, registerUserThunkCreator} from "../../redux/user-reducer";

class RegistrationContainer extends React.Component {
    onUserRegister = (user) => {
        this.props.registerUser(user);
    }

    onDesignerRegister = (designer) => {
        this.props.registerDesigner(designer);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Navigate replace to='/profile'/>;
        }
        return <Registration onUserSignUp={this.onUserRegister} onDesignerSignUp={this.onDesignerRegister}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        isAuthenticated: getIsAuthenticated(state)
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (user) => {
            dispatch(registerUserThunkCreator(user));
        },
        registerDesigner: (designer) => {
            dispatch(registerDesignerThunkCreator(designer));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationContainer);