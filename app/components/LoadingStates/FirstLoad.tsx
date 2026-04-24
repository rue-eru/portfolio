'use client'

import { getLoadProgress } from "../../hooks/getLoadProgress";

export default function FirstLoad() {
  const progress = getLoadProgress();

  return (
    <div className="bg-set-black h-dvh w-full flex items-center justify-center">
      <div
        className="w-32 h-32 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(#yourAccent ${progress * 3.6}deg, transparent 0deg)`
        }}
      >
        <div className="w-24 h-24 bg-set-black rounded-full flex items-center justify-center">
          <p className="text-set-accent">{progress}%</p>
        </div>
      </div>
    </div>
  );
}