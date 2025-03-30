import React, { useState } from "react";
import {
  Sun,
  Moon,
  Download,
  Sparkles,
  PlayCircle,
} from "lucide-react";
import { useCanvasContext } from "../context/CanvasContext";

/**
 * Bottom Dock for ambient/mood controls
 */
const Dock = ({ closeSubmenus, onMouseEnterUI, onMouseLeaveUI }) => {
  const {
    canvasRef,
    bgTheme,
    setBgTheme,
    ambientEffect,
    setAmbientEffect,
    replayTimelapse,
  } = useCanvasContext();

  const [showHint, setShowHint] = useState("");

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `mood-canvas-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const toggleTheme = () => {
    const nextTheme =
      bgTheme === "daylight" ? "dusk" : bgTheme === "dusk" ? "night" : "daylight";
    setBgTheme(nextTheme);
  };

  return (
    <div
      onMouseEnter={onMouseEnterUI}
      onMouseLeave={onMouseLeaveUI}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30"
    >
      <div className="flex items-center gap-4 px-6 py-3 bg-white/90 backdrop-blur-md border border-gray-200 shadow-xl rounded-full">
        <button
          title="Toggle Theme"
          className="w-10 h-10 bg-indigo-100 hover:bg-indigo-200 rounded-full flex items-center justify-center transition"
          onClick={toggleTheme}
        >
          {bgTheme === "night" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          title="Toggle Ambience"
          className={`w-10 h-10 ${
            ambientEffect ? "bg-yellow-100" : "bg-gray-100"
          } hover:bg-yellow-200 rounded-full flex items-center justify-center transition`}
          onClick={() => setAmbientEffect((prev) => !prev)}
        >
          <Sparkles size={18} />
        </button>

        <button
          title="Replay Mood"
          className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition"
          onClick={replayTimelapse}
        >
          <PlayCircle size={18} />
        </button>

        <button
          title="Download"
          className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition"
          onClick={downloadCanvas}
        >
          <Download size={18} />
        </button>
      </div>
    </div>
  );
};

export default Dock;
