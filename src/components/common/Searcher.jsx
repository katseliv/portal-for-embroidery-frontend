import React from "react";
import {Field, reduxForm} from "redux-form";
import {SearchInput} from "./form-control/FormControl";

const Searcher = (props) => {
    const onSubmit = (formData) => {
        props.onSubmit(formData);
    }

    return <SearchReduxForm onSubmit={onSubmit} placeholder={props.placeholder}/>;
}

const SearchForm = (props) => {
    return (
        <form className="d-flex" onSubmit={props.handleSubmit}>
            <Field component={SearchInput} name={"request"} placeholder={props.placeholder}/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
}

const SearchReduxForm = reduxForm({
    form: "searchForm",
    enableReinitialize: true
})(SearchForm);

export default Searcher;