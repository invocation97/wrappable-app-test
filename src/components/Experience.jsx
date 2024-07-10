import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { WrapwareCup } from "./WrapwareThreePieces";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <WrapwareCup />
      <ContactShadows position-y={1} opacity={1} blur={4} />
      <Environment preset="city" background={false} blur={1} />
    </>
  );
};
