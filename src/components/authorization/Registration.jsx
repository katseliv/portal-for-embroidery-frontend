import React, {useState} from 'react';
import RegistrationForDesigner from "./RegistrationForDesigner";
import RegistrationForUser from "./RegistrationForUser";

const Registration = (props) => {
    let [chooseMode, setChooseMode] = useState(true);
    let [designerRegistrationMode, setDesignerRegistrationMode] = useState(false);

    const deactivateRegistrationMode = () => {
        setChooseMode(true);
    };

    const activateUserRegistrationMode = () => {
        setChooseMode(false);
        setDesignerRegistrationMode(false);
    };

    const activateDesignerRegistrationMode = () => {
        setChooseMode(false);
        setDesignerRegistrationMode(true);
    };

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-5 fw-normal text-center">Registration</h1>
            <div className="container w-25">
                {chooseMode
                    ? <>
                        <button className="btn btn-lg btn-outline-success w-100 mt-2" onClick={() => activateUserRegistrationMode()}>User</button>
                        <button className="btn btn-lg btn-outline-warning w-100 mt-2" onClick={() => activateDesignerRegistrationMode()}>Designer</button>
                    </>
                    : designerRegistrationMode
                        ? <RegistrationForDesigner onSignUp={props.onDesignerSignUp}/>
                        : <RegistrationForUser onSignUp={props.onUserSignUp}/>}
                <button className="btn btn-lg btn-outline-secondary w-100 mt-2" onClick={() => deactivateRegistrationMode()}>Back</button>
            </div>
        </div>
    );
}

export default Registration;