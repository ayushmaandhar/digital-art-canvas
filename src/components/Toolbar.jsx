import React from "react";
import { Smile, Zap, Moon, Undo2, Redo2, Trash2 } from "lucide-react";
import ToolButton from "./ToolButton";
import { useCanvasContext } from "../context/CanvasContext";

/**
 * Left toolbar for emotion/mood selection
 */
const Toolbar = ({
  openSubmenu,
  setOpenSubmenu,
  closeSubmenus,
  onMouseEnterUI,
  onMouseLeaveUI,
}) => {
  const {
    mood,
    setMood,
    undo,
    redo,
    clearCanvas,
  } = useCanvasContext();

  const moodOptions = [
    { label: "Joy", value: "joy", icon: <Smile size={20} /> },
    { label: "Chaos", value: "chaos", icon: <Zap size={20} /> },
    { label: "Calm", value: "calm", icon: <Moon size={20} /> },
  ];

  return (
    <div
      onMouseEnter={onMouseEnterUI}
      onMouseLeave={onMouseLeaveUI}
      className="w-20 z-20 px-2 py-4 flex flex-col items-center gap-4 bg-white/80 border-r border-gray-200 backdrop-blur-lg rounded-r-2xl shadow-md"
    >
      {moodOptions.map((m) => (
        <ToolButton
          key={m.value}
          icon={m.icon}
          label={m.label}
          isActive={mood === m.value}
          onClick={() => {
            setMood(m.value);
            closeSubmenus();
          }}
        />
      ))}

      <div className="mt-4 flex flex-col gap-2">
        <ToolButton icon={<Undo2 size={18} />} label="Undo" onClick={undo} />
        <ToolButton icon={<Redo2 size={18} />} label="Redo" onClick={redo} />
        <ToolButton icon={<Trash2 size={18} />} label="Clear" onClick={clearCanvas} />
      </div>
    </div>
  );
};

export default Toolbar;
