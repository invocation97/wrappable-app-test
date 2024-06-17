import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { NewCup } from "./NewCup";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <NewCup />
      <ContactShadows position-y={-0.5} opacity={0.4} blur={2} />
      <Environment preset="city" background blur={4} />
    </>
  );
};
