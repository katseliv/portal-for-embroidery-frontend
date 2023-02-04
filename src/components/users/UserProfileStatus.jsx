import React from "react";

const pStyle = {
    fontWeight: 600,
};

class UserProfileStatus extends React.Component {
    state = {
        editMode: false
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
    }

    render() {
        return (
            <div>
                {!this.state.editMode
                    ? <p onDoubleClick={this.activateEditMode}><span style={pStyle}>Status:</span> {this.props.status}</p>
                    : <input className="form-control" autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.status}/>
                }
            </div>
        );
    }
}

export default UserProfileStatus;