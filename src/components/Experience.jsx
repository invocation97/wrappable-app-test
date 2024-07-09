import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { WrapwareCup } from "./WrapwareThreePieces";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <WrapwareCup />
      <ContactShadows position-y={-0.5} opacity={0.7} blur={4} />
      <Environment preset="apartment" background={false} blur={1} />
    </>
  );
};
