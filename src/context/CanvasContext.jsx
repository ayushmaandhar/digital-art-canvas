import React, { createContext, useContext, useRef, useState } from "react";

export const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  // Reference to the actual <canvas> element
  const canvasRef = useRef(null);

  // Example mood-based states
  const [mood, setMood] = useState("joy");       // "joy", "chaos", "calm", ...
  const [strokeSize, setStrokeSize] = useState(5);
  const [bgTheme, setBgTheme] = useState("daylight"); // "daylight", "dusk", "night"
  const [ambientEffect, setAmbientEffect] = useState(true);

  // Undo/redo
  const historyRef = useRef([]);
  const redoStackRef = useRef([]);

  // (Optional) Storing strokes for replay
  const strokesRef = useRef([]);
  const isReplayingRef = useRef(false);

  const MAX_HISTORY = 15;

  // Example mood configs
  const moodConfigs = {
    joy: {
      color: "#ffcf33",
      shadow: "#fcd34d",
      lineDash: [],
    },
    chaos: {
      color: "#ff3366",
      shadow: "#fb7185",
      lineDash: [10, 5],
    },
    calm: {
      color: "#33ccff",
      shadow: "#60a5fa",
      lineDash: [],
    },
  };

  // Save the current canvas to a dataURL. 
  // No re-scaling or re-initialization here — we just read the existing content.
  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL("image/png");
    const last = historyRef.current[historyRef.current.length - 1];

    // Push new snapshot if it's different from the last
    if (dataURL !== last) {
      historyRef.current.push(dataURL);
      if (historyRef.current.length > MAX_HISTORY) {
        historyRef.current.shift();
      }
      redoStackRef.current = [];
    }
  };

  // Restore a snapshot by drawing it back onto the same scaled canvas
  const restoreState = (dataURL) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = dataURL;
  
    img.onload = () => {
      const dpr = window.devicePixelRatio || 1;
  
      // Clear first
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw at CSS pixel size (not canvas.width which is scaled)
      const { width, height } = canvas.getBoundingClientRect();
  
      // ✅ This fixes the scale + position issue
      ctx.drawImage(img, 0, 0, width, height);
    };
  };
  

  // Basic undo
  const undo = () => {
    if (historyRef.current.length < 2) return;
    // Pop the current
    const current = historyRef.current.pop();
    redoStackRef.current.push(current);

    // The new "current" is now the last in the history
    const prev = historyRef.current[historyRef.current.length - 1];
    restoreState(prev);
  };

  // Basic redo
  const redo = () => {
    if (redoStackRef.current.length === 0) return;
    const dataURL = redoStackRef.current.pop();
    historyRef.current.push(dataURL);
    restoreState(dataURL);
  };

  // Clear the entire canvas and save
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
  };

  // For replay if you store stroke-based data (optional)
  const addStroke = (stroke) => {
    strokesRef.current.push(stroke);
  };
  const getStrokes = () => strokesRef.current;

  // Example timelapse function
  const replayTimelapse = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const strokes = getStrokes();

    isReplayingRef.current = true;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let stroke of strokes) {
      if (!isReplayingRef.current) break;
      // Do your mood-based drawing logic, e.g.:
      const moodData = moodConfigs[stroke.mood] || moodConfigs.joy;
      ctx.strokeStyle = moodData.color;
      ctx.shadowBlur = 15;
      ctx.shadowColor = moodData.shadow;
      ctx.setLineDash(moodData.lineDash);
      ctx.lineWidth = stroke.size;

      ctx.beginPath();
      const path = stroke.path;
      ctx.moveTo(path[0].x, path[0].y);
      for (let i = 1; i < path.length; i++) {
        if (!isReplayingRef.current) break;
        ctx.lineTo(path[i].x, path[i].y);
        ctx.stroke();
        await new Promise((res) => setTimeout(res, 8));
      }
      ctx.closePath();
      await new Promise((res) => setTimeout(res, 80));
    }

    isReplayingRef.current = false;
  };

  const stopReplay = () => {
    isReplayingRef.current = false;
  };

  return (
    <CanvasContext.Provider
      value={{
        // Refs
        canvasRef,
        historyRef,

        // Moods + config
        mood,
        setMood,
        moodConfigs,

        strokeSize,
        setStrokeSize,

        bgTheme,
        setBgTheme,

        ambientEffect,
        setAmbientEffect,

        // Undo/Redo
        clearCanvas,
        undo,
        redo,
        saveState,
        // Stroke-based replay
        addStroke,
        getStrokes,
        replayTimelapse,
        stopReplay,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => useContext(CanvasContext);
