import React, { useContext, useEffect, useRef, useState } from "react";
import { LevaContext } from "../context/LevaContext";

const CustomControls = () => {
  const {
    cupColor,
    setCupColor,
    backgroundColor,
    setBackgroundColor,
    setUseBackgroundImage,
    setBackgroundImage,
    environmentPreset,
    setEnvironmentPreset,
    hideImage,
    setHideImage,
  } = useContext(LevaContext);

  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const controlsRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseDown = (e) => {
    if (isMobile) return;

    setIsDragging(true);
    const rect = controlsRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isMobile) return;

    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e, material) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setCupColor(material);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUseBackgroundImage(true);
      setBackgroundImage(url);
    }
  };

  const materialButtons = [
    { label: "Stainless Steel", value: "Stainless Steel" },
    { label: "White Ceramic", value: "White Ceramic" },
    { label: "Black Ceramic", value: "Black Ceramic" },
  ];

  const environmentOptions = [
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
  ];

  if (isMobile) {
    return (
      <div
        className="mobile-controls"
        role="region"
        aria-label="Cup material controls"
      >
        <div
          className="material-buttons"
          role="group"
          aria-label="Select cup material"
        >
          {materialButtons.map((material) => (
            <button
              key={material.value}
              className={`material-btn ${
                cupColor === material.value ? "active" : ""
              }`}
              onClick={() => setCupColor(material.value)}
              onKeyDown={(e) => handleKeyDown(e, material.value)}
              aria-pressed={cupColor === material.value}
              aria-label={`Select ${material.label} cup material`}
            >
              {material.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={controlsRef}
      className={`custom-controls ${isMinimized ? "minimized" : ""}`}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: 9999,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      role="region"
      aria-label="Cup customization controls"
    >
      <div
        className="controls-header"
        onMouseDown={handleMouseDown}
        role="banner"
      >
        <span className="controls-title">Controls</span>
        <button
          className="minimize-btn"
          onClick={() => setIsMinimized(!isMinimized)}
          aria-label={
            isMinimized ? "Expand controls panel" : "Minimize controls panel"
          }
          aria-expanded={!isMinimized}
        >
          {isMinimized ? "□" : "−"}
        </button>
      </div>

      {!isMinimized && (
        <div className="controls-body" role="main">
          <div className="control-group">
            <label id="cup-material-label">Cup Material</label>
            <div
              className="material-buttons-desktop"
              role="group"
              aria-labelledby="cup-material-label"
            >
              {materialButtons.map((material) => (
                <button
                  key={material.value}
                  className={`material-btn ${
                    cupColor === material.value ? "active" : ""
                  }`}
                  onClick={() => setCupColor(material.value)}
                  onKeyDown={(e) => handleKeyDown(e, material.value)}
                  aria-pressed={cupColor === material.value}
                  aria-label={`Select ${material.label} cup material`}
                >
                  {material.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hidden for now - Background Color, Background Image, Environment, Hide Wrapper */}
          {/* 
          <div className="control-group">
            <label>Background Color</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => {
                setBackgroundColor(e.target.value);
                setUseBackgroundImage(false);
              }}
              className="color-input"
            />
          </div>

          <div className="control-group">
            <label>Background Image</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <button
              className="upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Image
            </button>
          </div>

          <div className="control-group">
            <label>Environment</label>
            <select
              value={environmentPreset}
              onChange={(e) => setEnvironmentPreset(e.target.value)}
              className="environment-select"
            >
              {environmentOptions.map((env) => (
                <option key={env} value={env}>
                  {env.charAt(0).toUpperCase() + env.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={hideImage}
                onChange={(e) => setHideImage(e.target.checked)}
              />
              Hide Wrapper
            </label>
          </div>
          */}
        </div>
      )}
    </div>
  );
};

export default CustomControls;
