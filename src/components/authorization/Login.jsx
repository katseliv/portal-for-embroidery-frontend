import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/form-control/FormControl";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";

const Login = (props) => {
    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-5 fw-normal text-center">Login</h1>
            <div className="container w-25">
                <LoginReduxForm onSubmit={props.login}/>
            </div>
        </div>
    );
}

let LoginForm = ({handleSubmit, error}) => {
    const maxLength10 = maxLengthCreator(10);
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <Field component={Input} name={"email"} label={"Email"} autoComplete="email"/>
            </div>
            <div className="mb-3">
                <Field component={Input} name={"password"} label={"Password"} validate={[requiredField, maxLength10]}
                       autoComplete="current-password" type="password"/>
            </div>
            {error && <div>{error}</div>}
            <button className="btn btn-lg btn-outline-success w-100 mt-2">Submit</button>
        </form>
    );
}

const LoginReduxForm = reduxForm({
    form: "loginForm"
})(LoginForm);

export default Login;