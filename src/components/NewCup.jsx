import React, { useEffect, useRef, useState } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { calculateCenter } from "../utils/calculateCenter";
import { useControls } from "leva";
import * as THREE from "three";

export function NewCup(props) {
  const [designImage, setDesignImage] = useState("/textures/wrapper.png");
  const { nodes, materials } = useGLTF("/models/cup.glb");
  const modelRef = useRef(null);

  const { color } = useControls({
    color: {
      value: "White",
      options: ["White", "Chrome", "Dark Gray"],
    },
  });

  const materialMapping = {
    White: materials.Color2,
    Chrome: new THREE.MeshStandardMaterial({
      color: 0xeeeeee, // lighter color
      metalness: 1,
      roughness: 0.1,
      envMapIntensity: 1.0,
    }),
    "Dark Gray": new THREE.MeshStandardMaterial({
      color: 0x1a1a1a, // darker color
      metalness: 0.5,
      roughness: 0.8,
    }),
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const designImg = params.get("designImg");
    if (designImg) {
      setDesignImage(designImg);
    }
  }, []);

  const originalZPositions = {
    topPart: 22.023,
    middlePart: 21.453,
  };

  const originalXPositions = {
    topPart: -13.137,
    middlePart: -13.135,
  };

  const minZ = Math.min(
    originalZPositions.topPart,
    originalZPositions.middlePart
  );
  const maxZ = Math.max(
    originalZPositions.topPart,
    originalZPositions.middlePart
  );
  const centerZ = calculateCenter(minZ, maxZ);

  const minX = Math.min(
    originalXPositions.topPart,
    originalXPositions.middlePart
  );
  const maxX = Math.max(
    originalXPositions.topPart,
    originalXPositions.middlePart
  );
  const centerX = calculateCenter(minX, maxX);

  const newXPositions = {
    topPart: originalXPositions.topPart - centerX,
    middlePart: originalXPositions.middlePart - centerX,
  };

  const newZPositions = {
    topPart: originalZPositions.topPart - centerZ,
    middlePart: originalZPositions.middlePart - centerZ,
  };

  return (
    <group {...props} dispose={null} ref={modelRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Top_Part.geometry}
        material={materialMapping[color]}
        position={[newXPositions.topPart, 3.814, newZPositions.topPart]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Middle_Colored_Part.geometry}
        material={materials.Color1}
        position={[newXPositions.middlePart, 1.091, newZPositions.middlePart]}
      >
        <Decal
          position={[1.1, 0.8, 2.5]}
          scale={14.5}
          rotation={[0, 0, 0]}
          map={useTexture(designImage)}
        ></Decal>
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/cup.glb");
