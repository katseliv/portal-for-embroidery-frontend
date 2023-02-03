function UserProfileUpdate() {
    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h3 mb-5 fw-normal text-center">Edit Profile</h1>
            <div className="container w-25">
                <form id="userForm" method="put" action="src/components" encType="multipart/form-data">
                    <div className="mb-3">
                        <label form="username" className="form-label">Username</label>
                        <input className="form-control" id="username"/>
                        <div className="invalid-feedback"></div>
                    </div>
                    <div className="mb-3">
                        <label form="firstName" className="form-label">First Name</label>
                        <input className="form-control" id="firstName"/>
                        <div className="invalid-feedback"></div>
                    </div>
                    <div className="mb-3">
                        <label form="lastName" className="form-label">Last Name</label>
                        <input className="form-control" id="lastName"/>
                        <div className="invalid-feedback"></div>
                    </div>
                    <div className="mb-3">
                        <label form="image" className="form-label">Image</label>
                        <input className="form-control" type="file" id="image"/>
                        <div className="invalid-feedback"></div>
                    </div>
                    <div className="mb-3">
                        <label form="email" className="form-label">Email</label>
                        <input className="form-control" type="email" id="email"/>
                        <div className="invalid-feedback"></div>
                    </div>
                    <div className="mb-3">
                        <label form="phoneNumber" className="form-label">Phone Number</label>
                        <input className="form-control" id="phoneNumber"/>
                        <div className="invalid-feedback"></div>
                    </div>
                    <input className="form-control" type="hidden" id="timeZone" name="timeZone"/>
                    <button type="button" onClick="putTimeZone()"
                            className="btn btn-lg btn-outline-success w-100 mt-2">Edit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserProfileUpdate;