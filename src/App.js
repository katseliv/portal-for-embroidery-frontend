import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/about-us/AboutUs";
import Contacts from "./components/contacts/Contacts";
import Preloader from "./components/common/Preloader";
import PostGridContainer from "./components/posts/PostGridContainer";
import PostProfileContainer from "./components/posts/PostProfileContainer";
import UserListContainer from "./components/users/UserListContainer";
import UserProfileContainer from "./components/users/UserProfileContainer";
import RegistrationContainer from "./components/authorization/RegistrationContainer";
import LoginContainer from "./components/authorization/LoginContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import {getGlobalError, getInitialized} from "./redux/app-selector";
import {initializeAppThunkCreator, setGlobalErrorActionCreator} from "./redux/app-reducer";
import {getUserProfileThunkCreator} from "./redux/user-reducer";
import {getAuthorizedUserId, getIsAuthenticated} from "./redux/auth-selector";
import Error from "./components/common/Error";

// const UserListContainer = React.lazy(() => import('./components/users/UserListContainer'));
// <Suspense fallback={<Preloader/>}>userListContainer</Suspense>

class App extends React.Component {
    componentDidMount() {
        this.refreshApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let userId = this.props.authorizedUserId;
        let prevUserId = prevProps.authorizedUserId;
        if (userId !== prevUserId) {
            this.refreshApp();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    refreshApp() {
        this.props.initializeApp();
        let userId = this.props.authorizedUserId;
        if (userId) {
            this.props.getUser(userId);
        }
    }

    catchAllUnhandledErrors = (reason, promiseRejectionEvent) => {
        this.props.setGlobalError(reason.reason.response.data);
    }

    render() {
        if (!this.props.initialized) return <Preloader/>;
        if (this.props.globalError) return <Error globalError={this.props.globalError}
                                                  setGlobalError={this.props.setGlobalError}
                                                  navigate={this.props.navigate}/>;

        return (
            <div className="App">
                <HeaderContainer/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/profile' element={<UserProfileContainer/>}/>
                    <Route path='/profile/:userId' element={<UserProfileContainer/>}/>
                    <Route path='/users' element={<UserListContainer/>}/>
                    <Route path='/designs' element={<PostGridContainer/>}/>
                    <Route path='/my-designs' element={<PostGridContainer/>}/>
                    <Route path='/designs/:postId' element={<PostProfileContainer/>}/>
                    <Route path='/my-designs'/>
                    <Route path='/about-us' element={<AboutUs/>}/>
                    <Route path='/contacts' element={<Contacts/>}/>
                    <Route path='/sign-in' element={<LoginContainer/>}/>
                    <Route path='/sign-up' element={<RegistrationContainer/>}/>
                </Routes>
                <Footer/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: getInitialized(state),
        globalError: getGlobalError(state),
        authorizedUserId: getAuthorizedUserId(state),
        isAuthenticated: getIsAuthenticated(state),
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        initializeApp: () => {
            dispatch(initializeAppThunkCreator());
        },
        setGlobalError: (hasError) => {
            dispatch(setGlobalErrorActionCreator(hasError));
        },
        getUser: (userId) => {
            dispatch(getUserProfileThunkCreator(userId));
        },
    }
}

function withNavigation(Component) {
    return props => <Component {...props} navigate={useNavigate()}/>;
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withNavigation)(App);
