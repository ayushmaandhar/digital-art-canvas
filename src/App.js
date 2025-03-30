import React, { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";
import Dock from "./components/Dock";
import BrushPreview from "./components/BrushPreview";
import IntroModal from "./components/IntroModal";

const App = () => {
  const [uiHovered, setUiHovered] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  const closeSubmenus = () => setOpenSubmenu(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (
        !e.target.closest("button") &&
        !e.target.closest(".mood-picker") &&
        !e.target.closest(".emotion-style-picker") &&
        !e.target.closest(".dock")
      ) {
        closeSubmenus();
      }
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex h-screen w-screen bg-gradient-to-br from-indigo-100 to-yellow-100 overflow-hidden">
      {showIntro && <IntroModal onClose={() => setShowIntro(false)} />}
      {/* Mood Brush Toolbar */}
      <Toolbar
        openSubmenu={openSubmenu}
        setOpenSubmenu={setOpenSubmenu}
        closeSubmenus={closeSubmenus}
        onMouseEnterUI={() => setUiHovered(true)}
        onMouseLeaveUI={() => setUiHovered(false)}
      />

      {/* Canvas Area */}
      <div className="flex-1 relative">
        <BrushPreview uiHovered={uiHovered} />
        <Canvas onCanvasClick={closeSubmenus} />
        <Dock
          closeSubmenus={closeSubmenus}
          onMouseEnterUI={() => setUiHovered(true)}
          onMouseLeaveUI={() => setUiHovered(false)}
        />
      </div>
    </div>
  );
};

export default App;
