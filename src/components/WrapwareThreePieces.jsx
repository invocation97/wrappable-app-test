import React, { useEffect, useRef, useState } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import * as THREE from "three";
import { calculateNewPositions } from "../utils/calculateNewPositions";

export function WrapwareCup(props) {
  const [designImage, setDesignImage] = useState("/textures/beaat.webp");
  const { nodes, materials } = useGLTF("/models/new_cup.glb");
  const modelRef = useRef(null);

  const { color } = useControls({
    color: {
      value: "White",
      options: ["White", "Chrome", "Dark Gray"],
    },
  });

  const semiTransparentMaterial = (colorHex) =>
    new THREE.MeshStandardMaterial({
      color: colorHex,
      transparent: true,
      opacity: 0.9,
      roughness: 0.7,
      transmission: 1,
      thickness: 0.5,
    });

  const materialMapping = {
    White: {
      top: materials.Color2,
      bottom: semiTransparentMaterial(0xffffff),
    },
    Chrome: {
      top: new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        metalness: 1,
        roughness: 0.1,
      }),
      bottom: semiTransparentMaterial(0xeeeeee),
    },
    "Dark Gray": {
      top: new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.5,
        metalness: 0.5,
      }),

      bottom: semiTransparentMaterial(0x1a1a1a),
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
  const decalTexture = useTexture(designImage);
  decalTexture.wrapS = THREE.ClampToEdgeWrapping;
  decalTexture.wrapT = THREE.ClampToEdgeWrapping;

  const decalMaterial = new THREE.MeshStandardMaterial({
    map: decalTexture,
    roughness: 1,
    metalness: 0,
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
        position={[
          newXPositions.middlePart,
          newYPositions.middlePart,
          newZPositions.middlePart,
        ]}
        material={decalMaterial}
      >
        <Decal
          position={[0, 0.01, 0.05]}
          scale={0.25}
          rotation={[0, 0, 0]}
          roughness={0.2}
          map={decalTexture}
          material={decalMaterial}
        ></Decal>
      </mesh>
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

useGLTF.preload("/models/new_cup.glb");
