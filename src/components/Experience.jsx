import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useContext } from "react";
import * as THREE from "three";
import { CupV5 } from "./Cupv5";
import { LevaContext } from "../context/LevaContext";

export const Experience = () => {
  const { scene } = useThree();
  const {
    backgroundColor,
    useBackgroundImage,
    backgroundImage,
    environmentPreset,
  } = useContext(LevaContext);

  useEffect(() => {
    if (useBackgroundImage && backgroundImage) {
      console.log("Loading background image:", backgroundImage);
      const loader = new THREE.TextureLoader();
      loader.load(
        backgroundImage,
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          texture.encoding = THREE.sRGBEncoding;
          scene.background = texture;
          console.log("Background image set.");
        },
        undefined,
        (err) => {
          console.error("An error occurred loading the texture:", err);
        }
      );
    } else {
      scene.background = new THREE.Color(backgroundColor);
    }
  }, [backgroundColor, useBackgroundImage, backgroundImage, scene]);

  return (
    <>
      <OrbitControls />
      <CupV5 />
      {/* <ambientLight intensity={0.5} /> */}
      {/* <directionalLight position={[5, 5, 5]} intensity={0.6} /> */}
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.1}
      />
      <ContactShadows far={2} position-y={1} opacity={0.1} blur={0.1} />
      <Environment preset={environmentPreset} background={false} blur={0} />
    </>
  );
};
