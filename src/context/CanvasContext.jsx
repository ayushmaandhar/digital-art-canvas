import React, { createContext, useContext, useRef, useState } from "react";

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const [tool, setTool] = useState("brush");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);

  const canvasRef = useRef(null);
  const historyRef = useRef([]);
  const redoStackRef = useRef([]);

  const MAX_HISTORY = 20;

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL("image/png");

    const last = historyRef.current[historyRef.current.length - 1];
    if (dataURL !== last) {
      historyRef.current.push(dataURL);
      if (historyRef.current.length > MAX_HISTORY) {
        historyRef.current.shift(); // Keep it bounded
      }
      redoStackRef.current = [];
    }
  };

  const restoreState = (dataURL) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const undo = () => {
    if (historyRef.current.length < 2) return;

    const current = historyRef.current.pop(); // Pop current
    redoStackRef.current.push(current);
    const prev = historyRef.current[historyRef.current.length - 1];
    restoreState(prev);
  };

  const redo = () => {
    if (redoStackRef.current.length === 0) return;
    const dataURL = redoStackRef.current.pop();
    historyRef.current.push(dataURL);
    restoreState(dataURL);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  return (
    <CanvasContext.Provider
      value={{
        tool,
        setTool,
        color,
        setColor,
        size,
        setSize,
        canvasRef,
        clearCanvas,
        undo,
        redo,
        saveState,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => useContext(CanvasContext);
