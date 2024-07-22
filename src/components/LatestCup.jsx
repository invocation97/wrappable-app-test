import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { calculateNewPositions } from "../utils/calculateNewPositions";

export function LatestCup(props) {
  const { nodes, materials } = useGLTF("/models/latest_cup.glb");
  const [designImage, setDesignImage] = useState("/textures/anime.png");
  const modelRef = useRef(null);

  useEffect(() => {
    nodes.Body.geometry.computeVertexNormals();
    nodes.Wrapper.geometry.computeVertexNormals();
    nodes.Rubber.geometry.computeVertexNormals();
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
      opacity: 0.9,
      metalness: 0.2,
      roughness: 0.7,
      transmission: 1,
      thickness: 0.5,
    });

  const materialMapping = {
    White: {
      top: new THREE.MeshStandardMaterial({
        color: 0xd9dfdf,
        metalness: 0.2,
        roughness: 0.2,
      }),
      bottom: semiTransparentMaterial(0xd9dfdf),
    },
    "Stainless steel": {
      top: new THREE.MeshStandardMaterial({
        color: 0xb6aea3,
        metalness: 0.6,
        roughness: 0.2,
      }),
      bottom: semiTransparentMaterial(0x87888d),
    },
    Black: {
      top: new THREE.MeshStandardMaterial({
        color: 0x232528,
        roughness: 0.5,
        metalness: 0.5,
      }),
      bottom: semiTransparentMaterial(0x232528),
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
    body: 1.24465096,
    wrapper: 1.24372578,
    rubber: 1.24405456,
  };
  const originalYPositions = {
    body: 1.79198658,
    wrapper: 1.96038353,
    rubber: 2.24182606,
  };
  const originalZPositions = {
    body: 1.10045362,
    wrapper: 1.08795679,
    rubber: 1.07486844,
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
    >
      <mesh
        name="Body"
        castShadow
        receiveShadow
        geometry={nodes.Body.geometry}
        material={materialMapping[color].top}
        position={[newXPositions.body, newYPositions.body, newZPositions.body]}
        scale={0.19299337}
      />
      <mesh
        name="Wrapper"
        castShadow
        receiveShadow
        geometry={nodes.Wrapper.geometry}
        material={hideImage ? materialMapping[color].top : decalMaterial}
        position={[
          newXPositions.wrapper,
          newYPositions.wrapper,
          newZPositions.wrapper,
        ]}
        rotation={[0, degToRad(180), 0]}
        scale={0.19299337}
      />
      <mesh
        name="Rubber"
        castShadow
        receiveShadow
        geometry={nodes.Rubber.geometry}
        // material={materials["Material.002"]}
        material={materialMapping[color].top}
        position={[
          newXPositions.rubber,
          newYPositions.rubber,
          newZPositions.rubber,
        ]}
        scale={0.19299337}
      />
    </group>
  );
}

useGLTF.preload("/models/latest_cup.glb");
