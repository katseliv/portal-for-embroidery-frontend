import React, {useState} from 'react';
import UserItem from "./UserItem";
import Preloader from "../common/Preloader";
import PageNavigation from "../common/page-navigation/PageNavigation";
import UserProfileCreate from "./UserProfileCreate";

const UserList = (props) => {
    const [createMode, setCreateMode] = useState(false);

    if (props.isFetching) {
        return <Preloader/>;
    }

    const activateCreateMode = () => {
        setCreateMode(true);
    };

    const onAddUser = (user) => {
        props.onAddUser(user);
        setCreateMode(false);
    }

    let usersData = props.users.map(user => <UserItem key={user.id} number={user.id} username={user.username}
                                                      firstName={user.firstName} lastName={user.lastName}
                                                      onDeleteUser={props.onDeleteUser}/>);

    return (
        <div>
            {createMode ? <UserProfileCreate onAddUser={onAddUser}/> :
                <div className="container py-5 overflow-hidden">
                    <h1 className="h4 mb-4 fw-normal text-center">Users</h1><br/>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {usersData}
                        </tbody>
                    </table>

                    <PageNavigation totalCount={props.totalCount}
                                    pageSize={props.pageSize}
                                    currentPage={props.currentPage}
                                    onPageChange={props.onPageChange}/>

                    <div className="container overflow-hidden">
                        <br/>
                        <h1 className="h5 fw-normal">
                            Click <a className="link-success" href="javascript: undefined;"
                                     onClick={activateCreateMode}>here</a> to create a new user!
                        </h1>
                    </div>
                </div>
            }
        </div>
    );
}

export default UserList;