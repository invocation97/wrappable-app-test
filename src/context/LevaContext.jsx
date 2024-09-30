import React, { createContext, useState } from "react";

export const LevaContext = createContext();

export const LevaProvider = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState("#333947");
  const [useBackgroundImage, setUseBackgroundImage] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [cupColor, setCupColor] = useState("White Ceramic");
  const [hideImage, setHideImage] = useState(false);
  const [environmentPreset, setEnvironmentPreset] = useState("city");

  return (
    <LevaContext.Provider
      value={{
        backgroundColor,
        setBackgroundColor,
        useBackgroundImage,
        setUseBackgroundImage,
        backgroundImage,
        setBackgroundImage,
        cupColor,
        setCupColor,
        hideImage,
        setHideImage,
        environmentPreset,
        setEnvironmentPreset,
      }}
    >
      {children}
    </LevaContext.Provider>
  );
};
