import React, { useEffect, useRef, useState } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { calculateCenter } from "../utils/calculateCenter";
import Spinner from "./Spinner";

export function NewCup(props) {
  const [designImage, setDesignImage] = useState("/textures/wrapper.png");
  const [isLoading, setIsLoading] = useState(true);
  const { nodes, materials } = useGLTF("/models/cup.glb", true, undefined, () =>
    setIsLoading(false)
  );
  const modelRef = useRef(null);

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
      {isLoading && <Spinner />}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Top_Part.geometry}
        material={materials.Color2}
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
          position={[1.1, 1.1, 3]}
          scale={14.7}
          map={useTexture(designImage, undefined, undefined, () =>
            setIsLoading(false)
          )}
        ></Decal>
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/cup.glb");
