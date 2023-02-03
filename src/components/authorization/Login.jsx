import React from 'react';

function Login() {
    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-5 fw-normal text-center">Login</h1>
            <div className="container w-25">
                <form action="/" method="post">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input className="form-control" id="email"></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label">Password</label>
                        <input type="password" className="form-control" id="inputPassword"></input>
                    </div>
                    <button type="submit" className="btn btn-lg btn-outline-success w-100 mt-2">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Login;