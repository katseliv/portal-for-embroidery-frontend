import Header from "./components/header/Header";
import {Route, Routes} from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/about-us/AboutUs";
import Contacts from "./components/contacts/Contacts";
import Login from "./components/authorization/Login";
import UserProfileUpdate from "./components/users/UserProfileUpdate";
import DesignProfile from "./components/designs/DesignProfile";
import DesignGridContainer from "./components/designs/DesignGridContainer";
import UserListContainer from "./components/users/UserListContainer";
import UserProfileContainer from "./components/users/UserProfileContainer";
import RegistrationContainer from "./components/authorization/RegistrationContainer";

function App() {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/profile' element={<UserProfileContainer/>}>
                    <Route path=':userId' element={<UserProfileContainer/>}/>
                </Route>
                <Route path='/profile/update' element={<UserProfileUpdate/>}/>
                <Route path='/users' element={<UserListContainer/>}/>
                <Route path='/designs' element={<DesignGridContainer/>}/>
                <Route path='/designs/design' element={<DesignProfile/>}/>
                <Route path='/my-designs'/>
                <Route path='/about-us' element={<AboutUs/>}/>
                <Route path='/contacts' element={<Contacts/>}/>
                <Route path='/sign-in' element={<Login/>}/>
                <Route path='/sign-up' element={<RegistrationContainer/>}/>
                {/*<Route path='*' element={<Error/>}/>*/}
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
