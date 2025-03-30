import React, { useEffect, useState } from "react";
import { useCanvasContext } from "../context/CanvasContext";

/**
 * A floating circular preview that follows the mouse and shows brush mood
 */
const BrushPreview = ({ uiHovered }) => {
  const { mood, strokeSize, moodConfigs } = useCanvasContext();
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const config = moodConfigs[mood] || moodConfigs.joy;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out"
      style={{
        top: position.y - strokeSize / 2,
        left: position.x - strokeSize / 2,
        width: strokeSize,
        height: strokeSize,
        borderRadius: "50%",
        boxShadow: `0 0 10px 2px ${config.shadow}`,
        backgroundColor: config.color,
        opacity: uiHovered ? 0 : 0.8,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default BrushPreview;
