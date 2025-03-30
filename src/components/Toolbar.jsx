import React, { useState } from "react";
import {
  Pencil,
  Eraser,
  RotateCcw,
  RotateCw,
  Trash2,
  Palette,
  Download,
} from "lucide-react";

import ToolButton from "./ToolButton";
import ColorPicker from "./ColorPicker";
import { useCanvasContext } from "../context/CanvasContext";

const Toolbar = () => {
  const {
    tool,
    setTool,
    color,
    setColor,
    size,
    setSize,
    clearCanvas,
    undo,
    redo,
    canvasRef,
  } = useCanvasContext();

  const [showPicker, setShowPicker] = useState(false);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `art-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col gap-4 items-center relative">
      <ToolButton
        icon={<Pencil size={20} />}
        label="Brush"
        isActive={tool === "brush"}
        onClick={() => setTool("brush")}
      />
      <ToolButton
        icon={<Eraser size={20} />}
        label="Eraser"
        isActive={tool === "eraser"}
        onClick={() => setTool("eraser")}
      />

      <ToolButton
        icon={<Palette size={20} />}
        label="Color"
        isActive={showPicker}
        onClick={() => setShowPicker((prev) => !prev)}
      />

      {showPicker && (
        <div className="absolute left-20 top-10 z-50">
          <ColorPicker />
        </div>
      )}

      <div className="w-12 h-24 flex items-center justify-center">
        <input
          type="range"
          min="1"
          max="30"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="rotate-[-90deg] w-24"
          title="Brush Size"
        />
      </div>

      <ToolButton icon={<RotateCcw size={20} />} label="Undo" onClick={undo} />
      <ToolButton icon={<RotateCw size={20} />} label="Redo" onClick={redo} />
      <ToolButton icon={<Trash2 size={20} />} label="Clear" onClick={clearCanvas} />
      <ToolButton icon={<Download size={20} />} label="Download" onClick={handleDownload} />
    </div>
  );
};

export default Toolbar;
