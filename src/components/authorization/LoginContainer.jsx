import React from 'react';
import Login from "./Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {Navigate} from "react-router-dom";
import {loginThunkCreator} from "../../redux/auth-reducer";
import {getIsAuthenticated} from "../../redux/auth-selector";

class LoginContainer extends React.Component {
    login = (values) => {
        this.props.login(values.email, values.password);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Navigate replace to='/profile'/>;
        }
        return (<Login login={this.login} logout={this.logout}/>);
    }
}

let mapStateToProps = (state) => {
    return {
        isAuthenticated: getIsAuthenticated(state),
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => {
            dispatch(loginThunkCreator(email, password));
        },
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(LoginContainer);
