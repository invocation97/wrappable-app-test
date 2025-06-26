import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ControlsContext } from "../context/ControlsContext";
import { useMobile } from "../hooks/useMobile";
import { MATERIAL_BUTTONS } from "../lib/constants";

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
  } = useContext(ControlsContext);

  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const isMobile = useMobile(768);
  const controlsRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleMouseDown = useCallback(
    (e) => {
      if (isMobile) return;

      setIsDragging(true);
      const rect = controlsRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    [isMobile]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || isMobile) return;

      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    },
    [isDragging, isMobile, dragOffset.x, dragOffset.y]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback(
    (e, material) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setCupColor(material);
      }
    },
    [setCupColor]
  );

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

  const handleImageUpload = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setUseBackgroundImage(true);
        setBackgroundImage(url);
      }
    },
    [setUseBackgroundImage, setBackgroundImage]
  );

  const handleMaterialClick = useCallback(
    (materialValue) => {
      setCupColor(materialValue);
    },
    [setCupColor]
  );

  const handleMinimizeToggle = useCallback(() => {
    setIsMinimized(!isMinimized);
  }, [isMinimized]);

  // Memoize computed values
  const minimizeLabel = useMemo(
    () => (isMinimized ? "Expand controls panel" : "Minimize controls panel"),
    [isMinimized]
  );

  const controlsStyle = useMemo(
    () => ({
      position: "absolute",
      left: position.x,
      top: position.y,
      zIndex: 9999,
      cursor: isDragging ? "grabbing" : "grab",
    }),
    [position.x, position.y, isDragging]
  );

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
          {MATERIAL_BUTTONS.map((material) => (
            <button
              key={material.value}
              className={`material-btn ${
                cupColor === material.value ? "active" : ""
              }`}
              onClick={() => handleMaterialClick(material.value)}
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
      style={controlsStyle}
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
          onClick={handleMinimizeToggle}
          aria-label={minimizeLabel}
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
              {MATERIAL_BUTTONS.map((material) => (
                <button
                  key={material.value}
                  className={`material-btn ${
                    cupColor === material.value ? "active" : ""
                  }`}
                  onClick={() => handleMaterialClick(material.value)}
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
