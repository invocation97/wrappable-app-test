import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { WrappableCup } from "./WrappableCup";
import { NewCup } from "./NewCup";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      {/* <WrappableCup /> */}
      <NewCup />
      <ContactShadows position-y={-0.5} opacity={0.4} blur={2} />
      <Environment preset="city" background blur={4} />
    </>
  );
};
