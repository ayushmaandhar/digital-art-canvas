import React, { useState, useEffect } from "react";
import { Sparkles, Brush, Download, Clock, SunMoon } from "lucide-react";
import clsx from "clsx";

const IntroModal = ({ onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200); // short delay
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className={clsx(
          "bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 max-w-xl w-full p-8 text-center scale-95 opacity-0 animate-fadeInUp"
        )}
      >
        <h1 className="text-3xl font-bold mb-4 text-indigo-700 flex items-center justify-center gap-2">
          <Sparkles size={24} /> Welcome to Mood Canvas
        </h1>

        <p className="text-gray-700 mb-6 text-sm">
          A canvas powered by your emotions. Choose your vibe, paint your thoughts, and share your energy with color, light, and motion.
        </p>

        <div className="grid grid-cols-2 gap-4 text-left text-sm mb-6">
          <div className="flex items-center gap-2">
            <Brush size={18} className="text-indigo-500" />
            Mood-based Brushes
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-indigo-500" />
            Stroke Replay
          </div>
          <div className="flex items-center gap-2">
            <SunMoon size={18} className="text-indigo-500" />
            Theme Toggle
          </div>
          <div className="flex items-center gap-2">
            <Download size={18} className="text-indigo-500" />
            Export Art
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-4 px-6 py-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition font-medium shadow-md"
        >
          Enter Canvas
        </button>
      </div>
    </div>
  );
};

export default IntroModal;
