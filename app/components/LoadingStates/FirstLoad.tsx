'use client'

import { useEffect, useState } from "react";

export default function FirstLoad({ onFinish }: { onFinish: () => void }) {
  const [percent, setPercent] = useState(0);
  const radius = 58;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const duration = 2000; 
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setPercent(Math.floor(progress * 100));

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {

        // A tiny 200ms pause at 100% so it doesn't feel like a glitchy cut
        setTimeout(onFinish, 200);
      }
    };

    requestAnimationFrame(frame);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-100 bg-set-black flex items-center justify-center cursor-loading"

    >
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="absolute w-full h-full -rotate-90">

          {/* Background Track */}
          <circle
            cx="80" cy="80" r={radius}
            stroke="#222" strokeWidth="6" fill="none"
          />

          {/* Animated Progress Circle */}
          <circle
            cx="80" cy="80" r={radius}
            stroke="var(--accent-color, #fff)" 
            strokeWidth="6" fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference - (percent / 100) * circumference,
              transition: 'stroke-dashoffset 0.1s linear'
            }}
          />
        </svg>
        <span className="text-5xl font-dongle text-set-accent text-center">{percent}%</span>
      </div>
    </div>
  );
}
