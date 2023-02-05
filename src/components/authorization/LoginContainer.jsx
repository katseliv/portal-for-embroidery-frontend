import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import Login from "./Login";
import {loginThunkCreator} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";

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
        isAuthenticated: state.authPage.isAuthenticated,
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
