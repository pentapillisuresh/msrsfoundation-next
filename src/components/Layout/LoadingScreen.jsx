"use client";

import React, { useEffect, useState } from "react";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [startExit, setStartExit] = useState(false);
  const [openGate, setOpenGate] = useState(false);

  const duration = 2400;

  useEffect(() => {
    let start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      let percent = (elapsed / duration) * 100;

      if (percent >= 100) {
        percent = 100;
        clearInterval(interval);

        setTimeout(() => {
          setOpenGate(true);

          setTimeout(() => {
            setStartExit(true);

            setTimeout(() => {
              onLoadingComplete();
            }, 800);
          }, 800);
        }, 200);
      }

      setProgress(percent);
    }, 16);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  const text = "MSRS";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* LEFT PANEL */}
      <div
        className={`absolute left-0 top-0 h-full w-1/2 bg-[#333d4b] z-40 transition-transform duration-700 ${
          openGate ? "-translate-x-full" : "translate-x-0"
        }`}
      />

      {/* RIGHT PANEL */}
      <div
        className={`absolute right-0 top-0 h-full w-1/2 bg-[#333d4b] z-40 transition-transform duration-700 ${
          openGate ? "translate-x-full" : "translate-x-0"
        }`}
      />

      {/* CENTER CONTENT */}
      <div
        className={`relative z-50 flex flex-col items-center justify-center transition-all duration-700 ${
          startExit ? "opacity-0 scale-90" : "opacity-100"
        }`}
      >
        {/* LETTER DROP */}
        <div className="flex space-x-2 text-6xl md:text-8xl font-bold text-white">
          {text.split("").map((char, index) => (
            <span
              key={index}
              className="letter"
              style={{
                animationDelay: `${index * 0.3}s`,
                animationDuration: `${duration / 1000}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* FOUNDATION */}
        <p className="mt-4 text-[#d1a284] tracking-[5px] text-lg animate-fadeIn">
          FOUNDATION
        </p>

        {/* PROGRESS BAR */}
        <div className="w-64 h-[2px] bg-white/20 mt-8 overflow-hidden rounded-full">
          <div
            className="h-full bg-[#d1a284]"
            style={{
              width: `${progress}%`,
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* PERCENT */}
        <p className="text-white/70 mt-3 text-sm tracking-widest">
          {Math.floor(progress)}%
        </p>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(-150px);
          animation-name: drop;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes drop {
          0% {
            opacity: 0;
            transform: translateY(-150px);
          }
          60% {
            opacity: 1;
            transform: translateY(15px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 1s ease forwards;
          animation-delay: 1s;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;