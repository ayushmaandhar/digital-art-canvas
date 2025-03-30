import React from "react";
import {
  Pencil,
  Eraser,
  Palette,
  RotateCcw,
  RotateCw,
  Trash2,
} from "lucide-react"; // Using lucide-react icons

import ToolButton from "./ToolButton";

const Toolbar = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <ToolButton icon={<Pencil size={20} />} label="Brush" />
      <ToolButton icon={<Eraser size={20} />} label="Eraser" />
      <ToolButton icon={<Palette size={20} />} label="Color" />
      <ToolButton icon={<RotateCcw size={20} />} label="Undo" />
      <ToolButton icon={<RotateCw size={20} />} label="Redo" />
      <ToolButton icon={<Trash2 size={20} />} label="Clear" />
    </div>
  );
};

export default Toolbar;
