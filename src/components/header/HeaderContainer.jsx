import React from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import Header from "./Header";
import {logoutThunkCreator} from "../../redux/auth-reducer";
import {getIsAuthenticated} from "../../redux/auth-selector";

class HeaderContainer extends React.Component {
    render() {
        return (<Header {...this.props}/>);
    }
}

let mapStateToProps = (state) => {
    return {
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(HeaderContainer);
