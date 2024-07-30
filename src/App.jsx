import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Leva, useControls } from "leva";
import { useEffect, useContext, useRef } from "react";
import { customLevaTheme } from "./utils/levaTheme";
import { LevaContext } from "./context/LevaContext";

function App() {
  const debugging = true;
  const fileInputRef = useRef(null);
  const {
    backgroundColor,
    setBackgroundColor,
    setUseBackgroundImage,
    setBackgroundImage,
    environmentPreset,
    setEnvironmentPreset,
  } = useContext(LevaContext);

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

  const { bgColor, uploadImage, envPreset } = useControls({
    bgColor: {
      label: "Background Color",
      value: backgroundColor,
      onChange: (color) => {
        setBackgroundColor(color);
        setUseBackgroundImage(false);
      },
    },
    uploadImage: {
      label: "Upload Image",
      value: null,
      image: undefined,
      onChange: (blob) => {
        if (blob) {
          setUseBackgroundImage(true);
          setBackgroundImage(blob);
        }
      },
    },
    envPreset: {
      label: "Environment Preset",
      value: environmentPreset,
      options: [
        "city",
        "apartment",
        "dawn",
        "forest",
        "lobby",
        "night",
        "park",
        "studio",
        "sunset",
        "warehouse",
      ],
      onChange: (preset) => {
        setEnvironmentPreset(preset);
      },
    },
  });

  return (
    <div style={{ position: "relative", minHeight: "100vh", height: "100%" }}>
      <div style={{ position: "absolute", left: 0, top: 0, zIndex: 9999 }}>
        <Leva fill theme={customLevaTheme} />
      </div>
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
