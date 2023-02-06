import React from "react";
import heartFill from "../../images/heart-fill.svg";
import heart from "../../images/heart.svg";

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
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Закрыть">
                        </button>
                    </div>
                    <div className="toast-body">
                        {/*{this.props.text}*/}
                        {!this.state.editMode
                            ? <span onDoubleClick={this.activateEditMode}>{this.state.text || "No comment..."}</span>
                            : <input className="form-control" autoFocus={true} onChange={this.onTextChange}
                                     onBlur={this.deactivateEditMode}
                                     value={this.state.text}/>
                        }

                        <div className="text-end">
                            {/*disabled={props.isLikingInProgress.some(c => id === c.id)}*/}
                            {this.props.liked
                                ? <img src={heartFill} onClick={() => {
                                    this.props.dislike(this.props.id)
                                }} alt={"Unlike"}/>
                                : <img src={heart} onClick={() => {
                                    this.props.like(this.props.id)
                                }} alt={"Like"}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommentItem;