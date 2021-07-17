import { useEffect, useRef, useState } from 'react';
import Environment from './lib/Environment';
import modelMaping from './lib/ModelMaping';

var THREE = require('three');
// const Stats = require('stats-js');

export default function View3d({ textureUrl, modelUrl }) {
    const canvas = useRef(null);
    const canvasContainer = useRef(null);
    const canvasContainerLoading = useRef(null);

    const [curentModel, setCurentModel] = useState(null);

    useEffect(() => {
        console.log('THREE', THREE);
        const materials = {
            shadow: new THREE.MeshBasicMaterial({
                color: '0x000000',
                // alphaMap: textureShadow,
                transparent: true,
                // depthWrite: false,
                opacity: THREE.Math.lerp(1, 0.25, 0.5)
            }),
            white1: new THREE.MeshPhongMaterial({
                color: 0xffffff,
                shininess: 500,
                reflectivity: 0.8
            }),
            white2: new THREE.MeshPhongMaterial({
                color: 0xffffff,
                shininess: 500,
                reflectivity: 0.8
            })
        };

        const parameters = {
            distance: 400,
            hpoint: 0,
            rotate: true,
            center: 0.5
        };

        const environment = new Environment(canvasContainer.current, canvas.current, parameters);
        const myModel = new modelMaping(environment, materials, modelUrl, canvasContainerLoading.current);

        setCurentModel(myModel);

        myModel.setTexture('/assets/textures/UV_Grid_Sm.jpg');

        const animation = () => {
            if (!myModel.loading) {
                environment.render();
            }
            requestAnimationFrame(animation);
        };
        animation();
    }, []);

    useEffect(() => {
        if (!textureUrl) return;
        curentModel.setTexture(textureUrl);
    }, [textureUrl]);

    return (
        <div className="canvasContainer" style={{ height: '600px' }} ref={canvasContainer}>
            <canvas ref={canvas} />
            <div className="canvasContainer-loading canvasContainer-loading--active" ref={canvasContainerLoading}></div>
        </div>
    );
}
