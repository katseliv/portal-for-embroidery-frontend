import React from "react";
import abstract from "../../images/abstract.png";

const size = {
    height: "500px",
    width: "500px",
    align: "center",
    background: "#ffffff"
}

const ModelPanel = (props) => {
    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-4 fw-normal text-center">Model Panel</h1><br/>
            <div className="container w-50">
                <a-scene style={size} embedded>
                    <a-assets>
                        <a-asset-item id="object" src="/models/t-shirt/Tshirt.obj"></a-asset-item>
                        <a-asset-item id="material" src="/models/t-shirt/Tshirt.mtl"></a-asset-item>
                        <img id="my-image" src={abstract} alt=""/>
                        {/*<img id="image" src={`data:image/${props.image.extension};base64,${props.image.base64StringFile}`} alt=""/>*/}
                    </a-assets>
                    <a-entity id="camera" camera position="0 0 0"
                              orbit-controls="target: #target;
                              enableDamping: true;
                              dampingFactor: 0.125;
                              rotateSpeed: 0.25;
                              rotateToSpeed: 0.04;
                              rotateTo: 0.172 4.140 2.797;
                              logPosition: true;
                              ">
                    </a-entity>

                    <a-entity id="target" obj-model="obj: #object;"
                              material="sphericalEnvMap: #my-image; src: #my-image"
                              position="0 3 -15" rotation="0 -90 0" scale="10 10 10"></a-entity>


                    {/*<a-entity id="camera" camera position="0 0 5" orbit-controls="*/}
                    {/*                                                autoRotate: false;*/}
                    {/*                                                target: #target;*/}
                    {/*                                                enableDamping: true;*/}
                    {/*                                                dampingFactor: 0.25;*/}
                    {/*                                                rotateSpeed:0.14;*/}
                    {/*                                                minDistance:3;*/}
                    {/*                                                maxDistance:15;"*/}
                    {/*                                                mouse-cursor="">*/}
                    {/*</a-entity>*/}

                    {/*<a-entity*/}
                    {/*    id="camera"*/}
                    {/*    camera="fov: 80; zoom: 1;"*/}
                    {/*    position="0 2 5"*/}
                    {/*    orbit-controls="autoRotate: false; target: #target; enableDamping: true; dampingFactor: 0.125; rotateSpeed:0.25; minDistance:3; maxDistance:100;"*/}
                    {/*    mouse-cursor=""*/}
                    {/*></a-entity>*/}

                    <a-light
                        color="#000"
                        intensity="0.5"
                        position="-23.821 62.630 -140.463"
                        type="directional"></a-light>
                </a-scene>
            </div>
        </div>
    );
}

export default ModelPanel;