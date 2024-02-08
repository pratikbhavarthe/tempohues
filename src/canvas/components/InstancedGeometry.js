import { useFrame } from "@react-three/fiber";


import { useRef } from "react";

import * as THREE from "three";
import { LayerMaterial, Noise, Gradient, Displace } from "lamina";

const o = new THREE.Object3D();

export const Boxes2 = ({ length = 48, ...props }) => {
    const ref = useRef();

    const crv = useRef(
        new THREE.CubicBezierCurve3(
            new THREE.Vector3(-2, -1, 0),
            new THREE.Vector3(-2, 1, -5),
            new THREE.Vector3(2, 4, -4),
            new THREE.Vector3(-2, 7, 0)
        )
    );

    const v0 = useRef(new THREE.Vector3(-2, -1, 0));
    const v1 = useRef(new THREE.Vector3(-2, 1, -5));
    const v2 = useRef(new THREE.Vector3(2, 4, -4));
    const v3 = useRef(new THREE.Vector3(-2, 7, 0));

    let xx = useRef(0);
    useFrame((state) => {
        const t = state.clock.getElapsedTime() * 0.5;

        xx.current = THREE.MathUtils.lerp(
            xx.current,
            useMainStore.getState().currentItem, 
            0.1
        );

        v1.current.set(-2 + xx.current, 4 / xx.current, -4 + xx.current);
        v2.current.set(2 * xx.current, xx.current, -4 - xx.current);
        v2.current.set(-2 + xx.current, 7 / xx.current, 0);

        crv.current.v0 = v0.current;
        crv.current.v1 = v1.current;
        crv.current.v2 = v2.current;
        crv.current.v3 = v3.current;

        let i =0;
        for (let j = 0; j< length; j++) {
            const id = i++;
        }
    })

}