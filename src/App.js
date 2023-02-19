import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {Route, Routes} from "react-router-dom";
import Error from "./components/common/Error";
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
import {getInitialized} from "./redux/app-selector";
import {initializeAppThunkCreator} from "./redux/app-reducer";
import {getUserProfileThunkCreator} from "./redux/user-reducer";
import {getAuthorizedUserId, getIsAuthenticated} from "./redux/auth-selector";

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

    catchAllUnhandledErrors = (reason, promiseRejectionEvent) => {
        // alert('Some error occurred!');
    }

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
                    <Route path='/designs' element={<PostGridContainer/>}/>
                    <Route path='/designs/:postId' element={<PostProfileContainer/>}/>
                    <Route path='/my-designs'/>
                    <Route path='/about-us' element={<AboutUs/>}/>
                    <Route path='/contacts' element={<Contacts/>}/>
                    <Route path='/sign-in' element={<LoginContainer/>}/>
                    <Route path='/sign-up' element={<RegistrationContainer/>}/>
                    <Route path='*' element={<Error/>}/>
                </Routes>
                <Footer/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        initialized: getInitialized(state),
        authorizedUserId: getAuthorizedUserId(state),
        isAuthenticated: getIsAuthenticated(state),
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        initializeApp: (userId) => {
            dispatch(initializeAppThunkCreator(userId));
        },
        getUser: (userId) => {
            dispatch(getUserProfileThunkCreator(userId));
        },
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps))(App);
