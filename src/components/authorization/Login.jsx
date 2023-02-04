import React from 'react';
import {Field, reduxForm} from "redux-form";

let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} action="/" method="post">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <Field className="form-control" name={"email"} component={"input"} id="email"></Field>
            </div>
            <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">Password</label>
                <Field className="form-control" name={"password"} component={"input"} type="password" id="inputPassword"></Field>
            </div>
            <button type="submit" className="btn btn-lg btn-outline-success w-100 mt-2">Submit</button>
        </form>
    );
}

const LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-5 fw-normal text-center">Login</h1>
            <div className="container w-25">
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );
}

export default Login;