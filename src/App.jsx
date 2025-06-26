import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import CustomControls from "./components/CustomControls";
import { Experience } from "./components/Experience";

function App() {
  const debugging = true;

  useEffect(() => {
    if (!debugging) {
      if (window.self !== window.top) {
        if (!document.referrer.includes("wrapware.com")) {
          window.top.location.href = "https://wrapware.com";
        }
      } else {
        window.location.href = "https://wrapware.com";
      }
    }
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", height: "100%" }}>
      <CustomControls />
      <Canvas
        shadows
        camera={{ position: [0, 20, 70], fov: 40 }}
        style={{ height: "100%" }}
      >
        <Experience />
      </Canvas>
    </div>
  );
}

export default App;
