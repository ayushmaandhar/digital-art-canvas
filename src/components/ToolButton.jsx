import React from "react";
import clsx from "clsx";

const ToolButton = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      title={label}
      className={clsx(
        "w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-all",
        isActive ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
      )}
    >
      {icon}
    </button>
  );
};

export default ToolButton;
