import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [3, 23, 60], fov: 30 }}>
        <color attach="background" args={["#8562e3"]} />
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
