import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import React, { useState } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";

// Mugs by Poly by Google [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/8cBJ9XWbkiv)
export function Mug(props) {
  const texture = useTexture("/textures/wrapper.png");
  const { nodes, materials } = useGLTF("/models/mug.glb");

  const exporter = new GLTFExporter();

  const exportModel = () => {
    exporter.parse(
      nodes.scene,
      (result) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(
          new Blob([result], { type: "application/octet-stream" })
        );
        link.download = "exported_model.glb";
        link.click();
      },
      { binary: true }
    );
  };

  useControls({
    angle: {
      min: degToRad(60),
      max: degToRad(300),
      value: Math.PI / 4,
      step: 0.01,
      onChange: (value) => {
        const x = Math.cos(value);
        const z = Math.sin(value);
        const rot = Math.atan2(x, z);
        setRotation(() => [0, rot, 0]);
        setPos((pos) => [x, pos[1], z]);
      },
    },
    posY: {
      min: 0,
      max: 3,
      value: 1.8,
      step: 0.01,
      onChange: (value) => {
        setPos((pos) => [pos[0], value, pos[2]]);
      },
    },
    scale: {
      min: 0.5,
      max: 3,
      value: 1.5,
      step: 0.01,
      onChange: (value) => {
        setScale(() => [value, value, 1.5]);
      },
    },
    exportButton: {
      value: exportModel,
      label: "Export Model",
      button: true,
    },
  });

  const [pos, setPos] = useState([0, 1.8, 1]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [scale, setScale] = useState([1.5, 1.5, 1.5]);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Arc001_1.geometry}
        material={materials["01___Default-2"]}
      />
      <mesh
        geometry={nodes.Arc001_1_1.geometry}
        material={materials["02___Default-2"]}
      />
      <mesh
        geometry={nodes.Arc001_1_2.geometry}
        material={materials["02___Default"]}
      />
      <mesh
        geometry={nodes.Arc001_1_3.geometry}
        material={materials["01___Default"]}
      />
      <mesh geometry={nodes.Arc001_1_4.geometry}>
        <meshBasicMaterial transparent opacity={0} />
        <Decal
          // debug // Makes "bounding box" of the decal visible
          position={pos} // Position of the decal
          rotation={rotation} // Rotation of the decal (can be a vector or a degree in radians)
          scale={scale} // Scale of the decal
        >
          <meshStandardMaterial
            map={texture}
            toneMapped={false}
            transparent
            polygonOffset
            polygonOffsetFactor={-1} // The mesh should take precedence over the original
          />
        </Decal>
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/mug.glb");
