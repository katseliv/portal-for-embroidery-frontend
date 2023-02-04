import React from 'react';
import {connect} from "react-redux";
import Registration from "./Registration";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class RegistrationContainer extends React.Component {
    render() {
        return (<Registration signUp={""}/>);
    }
}

let mapStateToProps = (state) => {

    return {}
}
let mapDispatchToProps = (dispatch) => {

    return {}
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(RegistrationContainer);
