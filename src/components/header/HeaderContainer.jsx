import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import {logoutThunkCreator} from "../../redux/auth-reducer";
import {getIsAuthenticated} from "../../redux/auth-selector";
import {getUserProfile} from "../../redux/user-selector";

class HeaderContainer extends React.Component {
    logout = () => {
        this.props.logout();
        this.props.navigate("/");
    }

    render() {
        return <Header {...this.props} logout={this.logout}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        profile: getUserProfile(state),
        isAuthenticated: getIsAuthenticated(state)
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logoutThunkCreator());
        },
    }
}

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()}/>;
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withNavigation)(HeaderContainer);
