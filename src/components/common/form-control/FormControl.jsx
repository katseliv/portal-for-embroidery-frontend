import React from "react";
import {Field} from "redux-form";

const style = {height: 100};

export const FormControl = ({meta, children, label}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div>
            <label className={"form-label " + (hasError ? "is-invalid" : "")}>{label}</label>
            {children}
            {hasError && <div className="invalid-feedback">{meta.error}</div>}
        </div>
    );
}

export const TextArea = (props) => {
    let {input, meta, ...restProps} = props;
    input = {...input, value: meta.initial};
    return (
        <FormControl {...props}>
            <textarea className="form-control" style={style} {...input} {...restProps}/>
        </FormControl>
    );
}

export const Input = (props) => {
    let {input, meta, ...restProps} = props;
    input = {...input, value: meta.initial};
    return (
        <FormControl {...props}>
            <input className="form-control" {...input} {...restProps}/>
        </FormControl>
    );
}

export const Select = (props) => {
    let {input, meta, children, ...restProps} = props;
    input = {...input, value: meta.initial};
    return (
        <FormControl {...props}>
            <select className="form-select" {...input} {...restProps}>
                <option selected>Open this select menu</option>
                {children}
            </select>
        </FormControl>
    );
}

export const SearchInput = (props) => {
    let {input, meta, ...restProps} = props;
    input = {...input, value: meta.initial};
    return (
        <div className="input-group">
            <span className="input-group-text" id="basic-addon1">#</span>
            <input className="form-control me-2" type="search" aria-label="Search" {...input} {...restProps}/>
        </div>
    );
}

export const TagsInput = ({fields, meta: {error, submitFailed}}) => {
    return (
        <div>
            <div className="text-center mb-3">
                <button className="btn btn-lg btn-outline-success w-100 mt-2" type="button"
                        onClick={() => fields.push({})}>
                    Add Tag
                </button>
                {submitFailed && error && <span>{error}</span>}
            </div>
            <div className="mb-3">
                {fields.map((tag, index) => (
                    <div className="card" key={index}>
                        <div className="card-body">
                            <div className="row">
                                <h5 className="col-5 card-title">Tag #{index + 1}</h5>
                                <div className="col-7 text-end">
                                    <button className="btn-close" type="button" onClick={() => fields.remove(index)}/>
                                </div>
                            </div>
                            <Field name={`${tag}.title`} component={Input} label="Title"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const adaptFileEventToValue = delegate => e => delegate(e.target.files);

export const FileInput = ({input: {value: omitValue, onChange, onBlur, ...inputProps}, ...props}) => {
    let {meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input className="form-control" type="file"
                   onChange={adaptFileEventToValue(onChange)}
                   onBlur={adaptFileEventToValue(onBlur)}
                   {...inputProps} {...restProps}/>
        </FormControl>
    );
}

export const MultipleFileInput = ({input: {value: omitValue, onChange, onBlur, ...inputProps}, ...props}) => {
    let {meta, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input className="form-control" type="file"
                   onChange={adaptFileEventToValue(onChange)}
                   onBlur={adaptFileEventToValue(onBlur)}
                   {...inputProps} {...restProps} multiple/>
        </FormControl>
    );
}
