import React from "react";
import {connect} from "react-redux";
import {
    addUserThunkCreator,
    deleteUserThunkCreator,
    getUsersByNumberAndSizeThunkCreator,
    getUsersThunkCreator,
    setCurrentPageActionCreator,
    setIsFetchingActionCreator
} from "../../redux/user-reducer";
import UserList from "./UserList";
import {
    getCurrentPageOfUsers,
    getIsFetchingOfUsers,
    getPageSizeOfUsers,
    getTotalCountOfUsers,
    getUsers
} from "../../redux/user-selector";
import {getAuthorizedUserRole, getIsAuthenticated} from "../../redux/auth-selector";
import {Navigate} from "react-router-dom";

class UserListContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    onAddUser = (user) => {
        this.props.addUser(user);
    }

    onDeleteUser = (userId) => {
        this.props.deleteUser(userId);
    }

    onPageChange = (pageNumber) => {
        this.props.getUsersByNumberAndSize(pageNumber, this.props.pageSizeOfUsers);
    }

    render() {
        if (!this.props.isAuthenticated || this.props.authorizedUserRole !== "ADMIN") {
            return <Navigate replace to='/'/>;
        }

        return <UserList users={this.props.users}
                         currentPage={this.props.currentPageOfUsers}
                         pageSize={this.props.pageSizeOfUsers}
                         totalCount={this.props.totalCountOfUsers}
                         isFetching={this.props.isFetchingOfUsers}
                         onAddUser={this.onAddUser}
                         onDeleteUser={this.onDeleteUser}
                         onPageChange={this.onPageChange}/>;
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        currentPageOfUsers: getCurrentPageOfUsers(state),
        pageSizeOfUsers: getPageSizeOfUsers(state),
        totalCountOfUsers: getTotalCountOfUsers(state),
        isFetchingOfUsers: getIsFetchingOfUsers(state),
        authorizedUserRole: getAuthorizedUserRole(state),
        isAuthenticated: getIsAuthenticated(state)
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addUser: (user) => {
            dispatch(addUserThunkCreator(user));
        },
        deleteUser: (userId) => {
            dispatch(deleteUserThunkCreator(userId));
        },
        getUsers: () => {
            dispatch(getUsersThunkCreator());
        },
        getUsersByNumberAndSize: (pageNumber, pageSize) => {
            dispatch(getUsersByNumberAndSizeThunkCreator(pageNumber, pageSize));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber));
        },
        setIsFetching: (isFetching) => {
            dispatch(setIsFetchingActionCreator(isFetching));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);