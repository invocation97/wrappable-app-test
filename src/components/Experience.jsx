import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useContext, useEffect } from "react";
import * as THREE from "three";
import { LevaContext } from "../context/LevaContext";
import { CupV5 } from "./Cupv5";

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
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 0, 10]} intensity={0.35} />
      {/* <hemisphereLight
        skyColor="#ffffff"
        groundColor="#444444"
        intensity={0.1}
      /> */}
      <ContactShadows far={2} position-y={1} opacity={0.1} blur={0.1} />
      <Environment preset={environmentPreset} background={false} blur={0} />
    </>
  );
};
