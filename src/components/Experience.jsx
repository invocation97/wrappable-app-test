import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { WrapwareCup } from "./WrapwareThreePieces";
import { LatestCup } from "./LatestCup";

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      {/* <WrapwareCup /> */}
      <LatestCup />
      <ContactShadows position-y={1} opacity={1} blur={4} />
      <Environment preset="city" background={false} blur={1} />
    </>
  );
};
