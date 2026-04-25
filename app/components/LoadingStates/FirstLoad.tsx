'use client'

import { useEffect, useState } from "react";

export default function FirstLoad() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;

    const id = setInterval(() => {
      current += 2;

      if (current >= 100) {
        current = 100;
        clearInterval(id);
      }

      setProgress(current);
    }, 30); // 100 * 30ms = 3s approx

    return () => clearInterval(id);
  }, []);

  const radius = 58;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <div className="bg-set-black h-dvh w-full flex justify-center items-center">
      <div className="relative w-36 h-36 flex items-center justify-center">

        <svg className="absolute w-full h-full -rotate-90">
          {/* background track */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="#222"
            strokeWidth="6"
            fill="none"
          />

          {/* progress ring */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="var(--set-accent)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-75"
          />
        </svg>

        <p className="text-set-accent text-5xl z-10">
          {progress}%
        </p>
      </div>
    </div>
  );
}