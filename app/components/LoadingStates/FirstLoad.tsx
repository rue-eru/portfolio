'use client'

import { useEffect, useState } from "react";

export default function FirstLoad () {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Matches the 2s animation duration
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-set-black animate-out">
      <div className="w-36 h-36 relative flex items-center justify-center">
        {/* Simple spinning loader or text */}
        <p className="text-set-accent text-5xl font-dongle animate-pulse">
          Loading...
        </p>
        
        {/* CSS for the fade out */}
        <style jsx>{`
          .animate-out {
            animation: fadeOut 0.5s ease-in 1.5s forwards;
          }
          @keyframes fadeOut {
            to { opacity: 0; visibility: hidden; }
          }
        `}</style>
      </div>
    </div>
  );
}