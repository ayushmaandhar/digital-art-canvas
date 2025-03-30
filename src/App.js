import React from "react";
import Canvas from "./components/Canvas";
import Toolbar from "./components/Toolbar";

const App = () => {
  return (
    <div className="h-screen w-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar Toolbar */}
      <div className="w-20 bg-white shadow-lg z-10 flex flex-col items-center py-4">
        <Toolbar />
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 relative">
        <Canvas />
      </div>
    </div>
  );
};

export default App;
