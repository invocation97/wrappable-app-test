import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { calculateNewPositions } from "../utils/calculateNewPositions";

export function CupV5({ backgroundColor, ...props }) {
  const { nodes, materials } = useGLTF("/models/wrapware_cup_v_5.glb");
  const [designImage, setDesignImage] = useState("/textures/anime.png");
  const modelRef = useRef(null);

  useEffect(() => {
    nodes.Body.geometry.computeVertexNormals();
    nodes.Wrapper.geometry.computeVertexNormals();
    nodes.RubberBottom.geometry.computeVertexNormals();
    nodes.Lid.geometry.computeVertexNormals();
  }, [nodes]);

  const { color, hideImage } = useControls({
    color: {
      label: "Cup Color",
      value: "White",
      options: ["White", "Stainless steel", "Black"],
    },
    hideImage: {
      value: false,
      label: "Hide Wrapper",
    },
  });

  const semiTransparentMaterial = (colorHex) =>
    new THREE.MeshStandardMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.6,
      metalness: 0.1,
      roughness: 0.8,
      depthTest: true,
      depthWrite: false,
      polygonOffset: true,
    });

  const siliconeBottomMaterial = new THREE.MeshStandardMaterial({
    color: 0x232528,
    roughness: 0.5,
    metalness: 0,
  });

  const materialMapping = {
    White: {
      top: new THREE.MeshStandardMaterial({
        color: 0xd9dfdf,
        metalness: 0.1,
        roughness: 0.6,
      }),
      bottom: semiTransparentMaterial(0xd9dfdf),
      rubber: siliconeBottomMaterial,
    },
    "Stainless steel": {
      top: new THREE.MeshStandardMaterial({
        color: 0xbfbfbf,
        metalness: 0.7,
        roughness: 0.3,
      }),
      bottom: semiTransparentMaterial(0xd9dfdf),
      rubber: siliconeBottomMaterial,
    },
    Black: {
      top: new THREE.MeshStandardMaterial({
        color: 0x232528,
        roughness: 0.5,
        metalness: 0.5,
      }),
      bottom: semiTransparentMaterial(0x232528),
      rubber: siliconeBottomMaterial,
    },
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const designImg = params.get("designImg");
    if (designImg) {
      setDesignImage(designImg);
    }
  }, []);

  const originalXPositions = {
    wrapper: 1.2437257,
    lid: 1.24405658,
    body: 1.24456036,
    rubber: 1.24456036,
  };
  const originalYPositions = {
    wrapper: 1.96038353,
    lid: 2.24180412,

    body: 1.91068017,
    rubber: 1.91068017,
  };
  const originalZPositions = {
    wrapper: 1.08795679,
    lid: 1.07487011,
    body: 1.09600306,
    rubber: 1.09600306,
  };

  const newXPositions = calculateNewPositions(originalXPositions);
  const newYPositions = calculateNewPositions(originalYPositions);
  const newZPositions = calculateNewPositions(originalZPositions);

  // Load texture and set wrapping mode to clamp
  const textureLoader = new THREE.TextureLoader();
  const decalTexture = textureLoader.load(designImage);

  const degToRad = (value) => {
    return (value * Math.PI) / 180;
  };

  // Rotate and scale the texture
  decalTexture.rotation = degToRad(270);
  decalTexture.center.set(0.5, 0.51); // Set the center of rotation
  decalTexture.repeat.set(1, 1.71); // Scale the texture
  decalTexture.offset.set(0, 0.35); // Adjust the offset to fit correctly
  decalTexture.flipY = false;

  const decalMaterial = new THREE.MeshStandardMaterial({
    map: decalTexture,
    roughness: 0.8,
    metalness: 1,
    transparent: false,
  });
  return (
    <group
      {...props}
      dispose={null}
      ref={modelRef}
      scale={45}
      rotation={[0, degToRad(180), 0]}
      position={[0, 5.5, 0]}
    >
      <mesh
        name="Wrapper"
        castShadow
        receiveShadow
        geometry={nodes.Wrapper.geometry}
        material={decalMaterial}
        position={[
          newXPositions.wrapper,
          newYPositions.wrapper,
          newZPositions.wrapper,
        ]}
        scale={hideImage ? 0 : 0.19299337}
        rotation={[0, degToRad(177), 0]}
      />
      <mesh
        name="Lid"
        castShadow
        receiveShadow
        geometry={nodes.Lid.geometry}
        material={materialMapping[color].bottom}
        position={[newXPositions.lid, newYPositions.lid, newZPositions.lid]}
      />
      <mesh
        name="Body"
        castShadow
        receiveShadow
        geometry={nodes.Body.geometry}
        material={materialMapping[color].top}
        position={[newXPositions.body, newYPositions.body, newZPositions.body]}
      />
      <mesh
        name="RubberBottom"
        castShadow
        receiveShadow
        geometry={nodes.RubberBottom.geometry}
        material={materialMapping[color].rubber}
        position={[
          newXPositions.rubber,
          newYPositions.rubber,
          newZPositions.rubber,
        ]}
      />
    </group>
  );
}

useGLTF.preload("/models/wrapware_cup_v_5.glb");
