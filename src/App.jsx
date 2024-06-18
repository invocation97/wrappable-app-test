import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva } from "leva";
import { useEffect } from "react";

function App() {
  const debugging = true;
  useEffect(() => {
    if (!debugging) {
      if (window.self !== window.top) {
        // The page is in an iframe
        if (!document.referrer.includes("wrapware.com")) {
          // The page is not embedded from wrapware.com
          window.top.location.href = "https://wrapware.com";
        }
      } else {
        // The page is not in an iframe
        window.location.href = "https://wrapware.com";
      }
    }
  }, []);
  return (
    <div style={{ position: "relative", minHeight: "100vh", height: "100%" }}>
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: 99999 }}>
        <Leva fill />
      </div>
      <Canvas
        shadows
        camera={{ position: [3, 23, 60], fov: 30 }}
        style={{ height: "100%" }}
      >
        <color attach="background" args={["#333947"]} />
        <Experience />
      </Canvas>
    </div>
  );
}

export default App;
