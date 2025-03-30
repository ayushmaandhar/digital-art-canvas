import { useEffect, useRef, useState } from "react";
import { useCanvasContext } from "../context/CanvasContext";

const useCanvas = (canvasRef) => {
  const {
    mood,
    strokeSize,
    moodConfigs,
    saveState,
    addStroke,
    bgTheme,
  } = useCanvasContext();

  const [isDrawing, setIsDrawing] = useState(false);
  const ctxRef = useRef(null);
  const pathRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.dataset.initialized) return;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    canvas.dataset.initialized = "true";
    saveState();
  }, [canvasRef, saveState]);

  const applyMoodStyle = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;

    const config = moodConfigs[mood] || moodConfigs["joy"];
    ctx.strokeStyle = config.color;
    ctx.lineWidth = strokeSize;
    ctx.setLineDash(config.lineDash || []);
    ctx.shadowBlur = 10;
    ctx.shadowColor = config.shadow;
    ctx.globalAlpha = bgTheme === "night" ? 0.9 : 1;
  };

  const startDrawing = ({ nativeEvent }) => {
    applyMoodStyle();
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    pathRef.current = [{ x: offsetX, y: offsetY }];
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
    pathRef.current.push({ x: offsetX, y: offsetY });
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    ctxRef.current.closePath();
    setIsDrawing(false);
    saveState();
    addStroke({
      path: pathRef.current,
      mood,
      size: strokeSize,
    });
  };

  return { startDrawing, draw, stopDrawing };
};

export default useCanvas;
