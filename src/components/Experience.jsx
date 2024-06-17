import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { NewCup } from "./NewCup";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <NewCup />
      <ContactShadows position-y={-0.5} opacity={0.7} blur={4} />
      <Environment preset="studio" background blur={1} />
    </>
  );
};
