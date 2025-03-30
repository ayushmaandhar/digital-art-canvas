import React from "react";
import clsx from "clsx";

/**
 * A single icon button in the toolbar
 */
const ToolButton = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      title={label}
      onClick={onClick}
      className={clsx(
        "w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-all duration-150",
        isActive
          ? "bg-indigo-500 text-white"
          : "bg-white text-gray-700 hover:bg-indigo-100"
      )}
    >
      {icon}
    </button>
  );
};

export default ToolButton;
