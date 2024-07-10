import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { calculateNewPositions } from "../utils/calculateNewPositions";

export function WrapwareCup(props) {
  const [designImage, setDesignImage] = useState("/textures/anime.png");
  const { nodes, materials } = useGLTF("/models/uv_mapped_cup.glb");
  const modelRef = useRef(null);

  useEffect(() => {
    nodes.Bottom001.geometry.computeVertexNormals();
    nodes.Middle001.geometry.computeVertexNormals();
    nodes.Top001.geometry.computeVertexNormals();
  }, [nodes]);

  const { color, hideImage } = useControls({
    color: {
      value: "White",
      options: ["White", "Chrome", "Dark Gray"],
    },
    hideImage: {
      value: false,
      label: "Hide the wrapper",
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
    Chrome: {
      top: new THREE.MeshStandardMaterial({
        color: 0xb6aea3,
        metalness: 0.6,
        roughness: 0.2,
      }),
      bottom: semiTransparentMaterial(0x87888d),
    },
    "Dark Gray": {
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

  const originalZPositions = {
    topPart: 21.777,
    middlePart: 21.769,
    bottomPart: 21.762,
  };

  const originalXPositions = {
    topPart: 15.325,
    middlePart: 15.325,
    bottomPart: 15.325,
  };

  const originalYPositions = {
    topPart: 0.332,
    middlePart: 0.45,
    bottomPart: 0.6005,
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
  decalTexture.repeat.set(1, 1.7); // Scale the texture
  decalTexture.offset.set(0, 0.35); // Adjust the offset to fit correctly
  decalTexture.flipY = false;

  const decalMaterial = new THREE.MeshStandardMaterial({
    map: decalTexture,
    roughness: 0.8,
    metalness: 1,
    transparent: false,
  });

  return (
    <group {...props} dispose={null} ref={modelRef} scale={45}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bottom001.geometry}
        position={[
          newXPositions.topPart,
          newYPositions.topPart,
          newZPositions.topPart,
        ]}
        material={materialMapping[color].top}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Middle001.geometry}
        rotation={[0, 1, 0]}
        position={[
          newXPositions.middlePart,
          newYPositions.middlePart,
          newZPositions.middlePart,
        ]}
        material={hideImage ? materialMapping[color].top : decalMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Top001.geometry}
        material={materialMapping[color].bottom}
        position={[
          newXPositions.bottomPart,
          newYPositions.bottomPart,
          newZPositions.bottomPart,
        ]}
      />
    </group>
  );
}

useGLTF.preload("/models/uv_mapped_cup.glb");
