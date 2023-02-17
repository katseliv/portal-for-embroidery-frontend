import React from "react";
import axios from "axios";
import {connect} from "react-redux";
import {
    setCurrentPageActionCreator,
    setIsFetchingActionCreator,
    setTotalCountActionCreator,
    setUsersActionCreator
} from "../../redux/user-reducer";
import UserList from "./UserList";
import {getUsers} from "../../redux/user-selector";

class UserListContainer extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true);
        axios.get(`http://localhost:8080/api/v1/users`)
            .then(response => {
                this.props.setIsFetching(false);
                this.props.setUsers(response.data.viewDtoList);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChange = (pageNumber) => {
        this.props.setIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        axios.get(`http://localhost:8080/api/v1/users?page=${pageNumber}&size=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetching(false);
                this.props.setUsers(response.data.viewDtoList);
            })
    }

    render() {
        return <UserList users={this.props.users}
                         totalCount={this.props.totalCount}
                         pageSize={this.props.pageSize}
                         currentPage={this.props.currentPage}
                         isFetching={this.props.isFetching}
                         onPageChange={this.onPageChange}

        />;
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        currentPage: state.userPage.currentPage,
        pageSize: state.userPage.pageSize,
        totalCount: state.userPage.totalCount,
        isFetching: state.userPage.isFetching,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalCountActionCreator(totalCount));
        },
        setIsFetching: (isFetching) => {
            dispatch(setIsFetchingActionCreator(isFetching));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer);