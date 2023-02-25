import React from "react";

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

export const SearchInput = (props) => {
    let {input, meta, ...restProps} = props;
    input = {...input, value: meta.initial};
    return (
        <input className="form-control me-2" type="search" aria-label="Search" {...input} {...restProps}/>
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



