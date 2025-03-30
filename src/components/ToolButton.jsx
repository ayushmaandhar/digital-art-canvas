import React from "react";

const ToolButton = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      title={label}
      className="w-12 h-12 bg-gray-200 hover:bg-gray-300 active:bg-gray-400 rounded-xl flex items-center justify-center transition-all shadow-md"
    >
      {icon}
    </button>
  );
};

export default ToolButton;
