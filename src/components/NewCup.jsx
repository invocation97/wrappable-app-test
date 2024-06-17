import React, { useEffect, useRef, useState } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { button, useControls } from "leva";
import { calculateCenter } from "../utils/calculateCenter";

export function NewCup(props) {
  const [designImage, setDesignImage] = useState("/textures/wrapper.png");
  const { nodes, materials } = useGLTF("/models/cup.glb");
  const modelRef = useRef(null);

  useEffect(() => {
    function handleMessage(event) {
      if (event.origin !== "https://wrapware.com") return;
      setDesignImage(event.data);
    }
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  function download3DModel() {
    if (!modelRef.current) return;

    const exporter = new GLTFExporter();
    exporter.parse(
      modelRef.current,
      function (result) {
        save(result, "scene.glb");
      },
      function (error) {
        console.error("An error happened:", error);
      },
      { binary: true }
    );
  }

  function save(blob, filename) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(
      new Blob([blob], { type: "application/octet-stream" })
    );
    link.download = filename;
    link.click();
  }

  useControls({
    design: {
      image: { image: "/textures/wrapper.png" },
      label: "Design image",
      onChange: (blob) => {
        setDesignImage(blob);
      },
    },
    // angle: {
    //   min: degToRad(30),
    //   max: degToRad(270),
    //   value: 0,
    //   step: 0.01,
    //   onChange: (value) => {
    //     const x = Math.cos(value);
    //     const z = Math.sin(value);
    //     const rot = Math.atan2(x, z);
    //     setRotation(() => [0, rot, 0]);
    //     setPos((pos) => [x, pos[1], z]);
    //   },
    // },
    export: button(() => {
      console.log("clicked");
      download3DModel();
    }),
  });
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

  // Calculate the new z positions
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
          debug
          position={[1.5, 1, 3]}
          rotation={rotation}
          scale={14.7}
          map={useTexture(designImage)}
        ></Decal>
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/cup.glb");
