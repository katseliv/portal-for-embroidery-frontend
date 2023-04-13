import React from "react";

const size = {
    height: "500px",
    width: "500px",
    align: "center",
    background: "#ffffff"
}

const ModelPanel = (props) => {
    const image = props.files.find(file => file.extension === "jpeg" || file.extension === "png");
    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-4 fw-normal text-center">Model Panel</h1><br/>
            <div className="container w-50">
                <a-scene style={size} embedded>
                    <a-assets>
                        <a-asset-item id="object" src="/models/t-shirt/Tshirt.obj"></a-asset-item>
                        <a-asset-item id="material" src="/models/t-shirt/Tshirt.mtl"></a-asset-item>
                        <img id="my-image" src={`data:image/${image.extension};base64,${image.base64StringFile}`} alt=""/>
                    </a-assets>
                    <a-camera orbit-controls="target: #target;
                              enableDamping: true;
                              dampingFactor: 0.125;
                              rotateSpeed: 0.25;
                              rotateToSpeed: 0.04;
                              rotateTo: 0.172 4.140 2.797;
                              logPosition: true;"
                              distance="1" position="0 0 0"></a-camera>
                    <a-entity id="target" obj-model="obj: #object;"
                              material="normalMap: #my-image; sphericalEnvMap: #my-image; src: #my-image"
                              position="0 3 -15" rotation="0 -90 0" scale="10 10 10"></a-entity>
                </a-scene>
            </div>
            <div className="container py-3 w-50">
                <button className="btn btn-lg btn-outline-secondary w-100" onClick={props.deactivateModelMode}>
                    Back
                </button>
            </div>
        </div>
    );
}

export default ModelPanel;