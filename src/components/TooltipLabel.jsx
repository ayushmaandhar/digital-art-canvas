import React, { useState } from "react";

const TooltipLabel = ({ label, children, position = "top" }) => {
  const [hovered, setHovered] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-1",
    bottom: "top-full mt-1",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div
          className={`absolute whitespace-nowrap px-2 py-1 rounded-lg text-xs bg-white/80 text-gray-700 shadow-md backdrop-blur-md z-50 transition-all duration-150 ease-out ${positionClasses[position]}`}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
};

export default TooltipLabel;
