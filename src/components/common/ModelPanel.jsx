import React from "react";

const size = {
    height: "500px",
    width: "500px",
    align: "center"
}

const ModelPanel = (props) => {
    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-4 fw-normal text-center">Model Panel</h1><br/>
            <div className="container w-50">
                <a-scene style={size} embedded>
                    {/*<a-box color="#689F38" width="7" height="3" depth="1" position="0 3 -10"></a-box>*/}
                    {/*<a-cylinder radius="2" position="0 3 -10"></a-cylinder>*/}
                    <a-assets>
                        <a-asset-item id="object" src="/models/girl_3_obj.obj"></a-asset-item>
                        <a-asset-item id="material" src="/models/girl_3_obj.mtl"></a-asset-item>
                        <img id="image" src={`data:image/${props.image.extension};base64,${props.image.base64StringFile}`} alt=""/>
                    </a-assets>
                    <a-obj-model src="#object" mtl="#material" position="0 -10 -15" scale="0.1 0.1 0.1"></a-obj-model>
                    <a-img src="image" width="10" height="10"></a-img>
                </a-scene>
            </div>
        </div>
    );
}

export default ModelPanel;