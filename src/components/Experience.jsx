import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { WrappableCup } from "./WrappableCup";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <WrappableCup />
      <ContactShadows position-y={-0.5} opacity={0.4} blur={2} />
      <Environment preset="city" background blur={4} />
    </>
  );
};
