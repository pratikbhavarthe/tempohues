import * as THREE from "three";
import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import { extend, useFrame } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import { DiscardMaterial } from "@react-three/drei/materials/DiscardMaterial";

import {
    transmission_pars_fragment,
    transmission_fragment,
    fragmentShader,
    vertexShader,
    vertexReplace
} from "./shaders";

class MeshTransmissionMaterialImpl extends THREE.MeshPhysicalMaterial {
    constructor(samples = 6, transmissionSampler = false) {
        super();

        this.uniforms = {
            chromaticAberration: { value: 0.05 },
            transmission: { value: 0 },
            _transmission: { value: 1 },
            transmissionMap: { value: null },
            roughness: { value: 0 },
            thickness: { value: 0 },
            thicknessMap: { value: null },
            attenuationDistance: { value: Infinity },
            attenuationColor: { value: new THREE.Color("white") },
            anisotropy: { value: 0.1 },
            time: { value: 0 },
            distortion: { value: 0.0 },
            distortionScale: { value: 0.5 },
            temporalDistortion: { value: 0.0 },
            buffer: { value: null },
            displacement: { value: 0.15 },
            scale: { value: 0.6 }
        };

        this.onBeforeCompile = (shader) => {
            shader.uniforms = {
                ...shader.uniforms,
                ...this.uniforms
            };

            if (transmissionSampler) shader.defines.USE_SAMPLER = "";
            else shader.defines.USE_TRANSMISSION = "";

            shader.fragmentShader = fragmentShader + shader.fragmentShader;

            shader.fragmentShader = shader.fragmentShader.replace(
                "#include <transmission_pars_fragment>",
                transmission_pars_fragment
            );

            shader.fragmentShader = shader.fragmentShader.replace(
                "#include <transmission_fragment>",
                transmission_fragment(samples)
            );

            shader.vertexShader = vertexShader + shader.vertexShader;

            shader.vertexShader = shader.vertexShader.replace(
                "#include <clipping_planes_vertex>",
                vertexReplace
            );
        };

        Object.keys(this.uniforms).forEach((name) =>
        Object.defineProperty(this, name, {
            get: () => this.uniforms[name].value,
            set: (v) => (this.uniforms[name].value = v)
        })
        );
    }
}

export const MeshTransmissionMaterial = forwardRef(
    (
        {
            buffer,
            transmissionSampler = false,
            backside = false,
            side = THREE.FrontSide,
            transmission = 1,
            thickness = 0,
            backsideThickness = 0,
            samples = 10,
            resolution,
            backsideResolution,
            background,
            displacement = 0.15,
            scale = 0.2,
            ...props
        },
        fref
    ) => {
        
    }
)

