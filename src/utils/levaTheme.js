export const customLevaTheme = () => ({
  colors: {
    elevation1: "#292d39", // bg color of the root panel (main title bar)
    elevation2: "#181c20", // bg color of the rows (main panel color)
    elevation3: "#373c4b", // bg color of the inputs
    accent1: "#0066dc",
    accent2: "#0066dc",
    accent3: "#0066dc",
    highlight1: "#3c93ff",
    highlight2: "#3c93ff",
    highlight3: "#3c93ff",
    vivid1: "#ffcc00",
    folderWidgetColor: "$highlight2",
    folderTextColor: "$highlight3",
    toolTipBackground: "$highlight3",
    toolTipText: "$elevation2",
  },
  radii: {
    xs: "2px",
    sm: "3px",
    lg: "10px",
  },
  space: {
    xs: "3px",
    sm: "6px",
    md: "10px",
    rowGap: "7px",
    colGap: "7px",
  },
  fonts: {
    mono: `ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace`,
    sans: `system-ui, sans-serif`,
  },
  fontSizes: {
    root: "11px",
    toolTip: "$root",
  },
  sizes: {
    rootWidth: "280px",
    controlWidth: "160px",
    numberInputMinWidth: "38px",
    scrubberWidth: "8px",
    scrubberHeight: "16px",
    rowHeight: "24px",
    folderTitleHeight: "20px",
    checkboxSize: "16px",
    joystickWidth: "100px",
    joystickHeight: "100px",
    colorPickerWidth: "$controlWidth",
    colorPickerHeight: "100px",
    imagePreviewWidth: "$controlWidth",
    imagePreviewHeight: "100px",
    monitorHeight: "60px",
    titleBarHeight: "39px",
  },
  shadows: {
    level1: "0 0 9px 0 #00000088",
    level2: "0 4px 14px #00000033",
  },
  borderWidths: {
    root: "0px",
    input: "1px",
    focus: "1px",
    hover: "1px",
    active: "1px",
    folder: "1px",
  },
  fontWeights: {
    label: "normal",
    folder: "normal",
    button: "normal",
  },
});
