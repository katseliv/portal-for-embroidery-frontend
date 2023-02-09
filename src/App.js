import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Route, Routes} from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/about-us/AboutUs";
import Contacts from "./components/contacts/Contacts";
import DesignProfile from "./components/designs/DesignProfile";
import DesignGridContainer from "./components/designs/DesignGridContainer";
import UserListContainer from "./components/users/UserListContainer";
import UserProfileContainer from "./components/users/UserProfileContainer";
import RegistrationContainer from "./components/authorization/RegistrationContainer";
import LoginContainer from "./components/authorization/LoginContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import {getUserThunkCreator} from "./redux/auth-reducer";
import {initializeAppThunkCreator} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader";

// const UserListContainer = React.lazy(() => import('./components/users/UserListContainer'));
// <Suspense fallback={<Preloader/>}>userListContainer</Suspense>

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
        let userId = this.props.authorizedUserId;
        if (userId) {
            this.props.getUser(userId);
        }
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let userId = this.props.authorizedUserId;
        let prevUserId = prevProps.authorizedUserId;
        if (userId !== prevUserId) {
            this.props.getUser(userId);
        }
    }

    // catchAllUnhandledErrors = (reason, promiseRejectionEvent) => {
    //
    // }

    render() {
        if (!this.props.initialized) return <Preloader/>;
        return (
            <div className="App">
                <HeaderContainer/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/profile' element={<UserProfileContainer/>}>
                        <Route path=':userId' element={<UserProfileContainer/>}/>
                    </Route>
                    <Route path='/users' element={<UserListContainer/>}/>
                    <Route path='/designs' element={<DesignGridContainer/>}/>
                    <Route path='/designs/design' element={<DesignProfile/>}/>
                    <Route path='/my-designs'/>
                    <Route path='/about-us' element={<AboutUs/>}/>
                    <Route path='/contacts' element={<Contacts/>}/>
                    <Route path='/sign-in' element={<LoginContainer/>}/>
                    <Route path='/sign-up' element={<RegistrationContainer/>}/>
                    {/*<Route path='*' element={<Error/>}/>*/}
                </Routes>
                <Footer/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: state.appPage.initialized,
        authorizedUserId: state.authPage.id,
        isAuthenticated: state.authPage.isAuthenticated
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        initializeApp: (userId) => {
            dispatch(initializeAppThunkCreator(userId));
        },
        getUser: (userId) => {
            dispatch(getUserThunkCreator(userId));
        },
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
