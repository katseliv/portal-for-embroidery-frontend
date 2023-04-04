import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {getIsAuthenticated} from "../../redux/auth-selector";
import {getDesignProfile} from "../../redux/design-selector";
import DesignProfile from "./DesignProfile";
import {getDesignProfileThunkCreator} from "../../redux/design-reducer";

class DesignProfileContainer extends React.Component {
    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const designId = this.props.params.designId;
        const prevDesignId = prevProps.params.designId;
        if (designId !== prevDesignId) {
            this.refreshProfile();
        }
    }

    refreshProfile() {
        let designId = this.props.params.designId;
        if (designId) {
            this.props.getDesignProfile(designId);
        }
    }

    render() {
        if (!this.props.isAuthenticated) {
            return <Navigate replace to='/sign-in'/>;
        }
        return <DesignProfile {...this.props} profile={this.props.profile}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        profile: getDesignProfile(state),
        isAuthenticated: getIsAuthenticated(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getDesignProfile: (designId) => {
            dispatch(getDesignProfileThunkCreator(designId));
        }
    }
}

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()}/>;
}

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withNavigation, withParams)(DesignProfileContainer)