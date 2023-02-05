const style = {height: 100};

export const FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (
        <div>
            <label className={"form-label " + (hasError ? "is-invalid" : "")}>{props.label}</label>
            {props.children}
            {hasError && <div className="invalid-feedback">{meta.error}</div>}
        </div>
    );
}

export const TextArea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea className="form-control" style={style} {...input} {...restProps}/>
        </FormControl>
    );
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input className="form-control" {...input} {...restProps}/>
        </FormControl>
    );
}


