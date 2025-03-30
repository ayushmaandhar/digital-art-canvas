import { useEffect } from "react";

/**
 * This might not even be necessary now,
 * Currently, useCanvas does the init logic itself.
 */
export const useCanvasInitializer = (canvasRef) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.dataset.initialized) return;

    // If you want to do additional stuff here, do it
    console.log("✅ (Optional) Canvas initializer in useCanvasInitializer");
  }, []);
};
