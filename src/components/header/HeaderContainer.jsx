import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import Header from "./Header";
import {logoutThunkCreator} from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
    componentDidMount() {
    }

    render() {
        return (<Header {...this.props}/>);
    }
}

let mapStateToProps = (state) => {
    return {
        login: state.authPage.login,
        isAuthenticated: state.authPage.isAuthenticated
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        logout: () => {
            dispatch(logoutThunkCreator());
        },
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(HeaderContainer);
