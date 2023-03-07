import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

let mapStateToPropsForRedirect = (state) => {
    return {
        isAuthenticated: state.authPage.isAuthenticated,
    }
}

export const redirectWithAuth = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuthenticated) {
                return <Navigate replace to='/'/>;
            }
            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}