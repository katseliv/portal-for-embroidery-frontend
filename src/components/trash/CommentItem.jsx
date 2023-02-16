import React from "react";

class CommentItem extends React.Component {
    iStyle = {
        color: "#530FAD"
    };
    borderStyle = {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#00000019",
        borderRadius: "0.25rem"
    };
    state = {
        editMode: false,
        text: this.props.text,
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.text !== this.props.text) {
            this.setState({
                text: this.props.text
            })
        }
    }

    onTextChange = (e) => {
        this.setState({
            text: e.currentTarget.value
        });
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        });
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.onUpdateComment(this.props.id, this.state.text);
    }

    render() {
        return (
            <div aria-live="polite" aria-atomic="true"
                 className="container justify-content-center align-items-center px-5 py-3 w-100">
                <div className="comment" style={this.borderStyle} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <i className="rounded me-2 bi-person-fill align-content-center" style={this.iStyle}></i>
                        <strong className="me-auto">{this.props.author}</strong>
                        <small>{this.props.date}</small>
                        <button className="btn-close" aria-label="Закрыть" onClick={() => {this.props.onDeleteComment(this.props.id);}}/>
                    </div>
                    <div className="toast-body">
                        {!this.state.editMode
                            ? <span onDoubleClick={this.activateEditMode}>{this.state.text || "No comment..."}</span>
                            : <input className="form-control" autoFocus={true} onChange={this.onTextChange}
                                     onBlur={this.deactivateEditMode} value={this.state.text}/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentItem;