import { useGLTF } from "@react-three/drei";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { ControlsContext } from "../context/ControlsContext";
import { calculateNewPositions } from "../utils/calculateNewPositions";

export function CupV5({ backgroundColor, ...props }) {
  const { nodes, materials } = useGLTF("/models/wrapware_cup_v_5.glb");
  const [designImage, setDesignImage] = useState("/textures/anime.png");
  const { cupColor, hideImage } = useContext(ControlsContext);

  const modelRef = useRef(null);

  useEffect(() => {
    nodes.Body.geometry.computeVertexNormals();
    nodes.Wrapper.geometry.computeVertexNormals();
    nodes.RubberBottom.geometry.computeVertexNormals();
    nodes.Lid.geometry.computeVertexNormals();
  }, [nodes]);

  // Memoize material creation functions
  const semiTransparentMaterial = useMemo(
    () => (colorHex) =>
      new THREE.MeshStandardMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.6,
        metalness: 0.1,
        roughness: 0.8,
        depthTest: true,
        depthWrite: false,
        polygonOffset: true,
      }),
    []
  );

  const siliconeBottomMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x232528,
        roughness: 0.5,
        metalness: 0,
      }),
    []
  );

  // Memoize material mapping to avoid recreating materials on every render
  const materialMapping = useMemo(
    () => ({
      "White Ceramic": {
        top: new THREE.MeshStandardMaterial({
          color: 0xd9dfdf,
          metalness: 0.1,
          roughness: 0.6,
        }),
        bottom: semiTransparentMaterial(0xd9dfdf),
        rubber: siliconeBottomMaterial,
      },
      "Stainless Steel": {
        top: new THREE.MeshStandardMaterial({
          color: 0xbfbfbf,
          metalness: 0.7,
          roughness: 0.3,
        }),
        bottom: semiTransparentMaterial(0xd9dfdf),
        rubber: siliconeBottomMaterial,
      },
      "Black Ceramic": {
        top: new THREE.MeshStandardMaterial({
          color: 0x232528,
          roughness: 0.5,
          metalness: 0.5,
        }),
        bottom: semiTransparentMaterial(0x232528),
        rubber: siliconeBottomMaterial,
      },
    }),
    [semiTransparentMaterial, siliconeBottomMaterial]
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const designImg = params.get("designImg");
    if (designImg) {
      setDesignImage(designImg);
    }
  }, []);

  // Memoize position calculations
  const positions = useMemo(() => {
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

    return {
      x: calculateNewPositions(originalXPositions),
      y: calculateNewPositions(originalYPositions),
      z: calculateNewPositions(originalZPositions),
    };
  }, []);

  // Memoize texture and material creation
  const { decalTexture, decalMaterial } = useMemo(() => {
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(designImage);

    const degToRad = (value) => (value * Math.PI) / 180;

    // Configure texture
    texture.rotation = degToRad(270);
    texture.center.set(0.5, 0.51);
    texture.repeat.set(1, 1.71);
    texture.offset.set(0, 0.35);
    texture.flipY = false;

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8,
      metalness: 1,
      transparent: false,
    });

    return { decalTexture: texture, decalMaterial: material };
  }, [designImage]);

  const degToRad = useMemo(() => (value) => (value * Math.PI) / 180, []);

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
          positions.x.wrapper,
          positions.y.wrapper,
          positions.z.wrapper,
        ]}
        scale={hideImage ? 0 : 0.19299337}
        rotation={[0, degToRad(177), 0]}
      />
      <mesh
        name="Lid"
        castShadow
        receiveShadow
        geometry={nodes.Lid.geometry}
        material={materialMapping[cupColor].bottom}
        position={[positions.x.lid, positions.y.lid, positions.z.lid]}
      />
      <mesh
        name="Body"
        castShadow
        receiveShadow
        geometry={nodes.Body.geometry}
        material={materialMapping[cupColor].top}
        position={[positions.x.body, positions.y.body, positions.z.body]}
      />
      <mesh
        name="RubberBottom"
        castShadow
        receiveShadow
        geometry={nodes.RubberBottom.geometry}
        material={materialMapping[cupColor].rubber}
        position={[positions.x.rubber, positions.y.rubber, positions.z.rubber]}
      />
    </group>
  );
}

useGLTF.preload("/models/wrapware_cup_v_5.glb");
