import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useContext } from "react";
import * as THREE from "three";
import { CupV5 } from "./Cupv5";
import { LevaContext } from "../context/LevaContext";

export const Experience = () => {
  const { scene } = useThree();
  const { backgroundColor, useBackgroundImage, backgroundImage } =
    useContext(LevaContext);

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
      <ContactShadows position-y={1} opacity={1} blur={1} />
      <Environment preset="city" background={false} blur={0.2} />
    </>
  );
};
