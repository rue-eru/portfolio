'use client'

import { useEffect, useState } from "react";

type Task = {
    weight: number;
    progress: number; 
}

export function getLoadProgress () {

    const [progress, setProgress] = useState(0)

    useEffect(() => {   

      const tasks: Record<string, Task> = {
        dom: { weight: 0.2, progress: 0 },
        fonts: { weight: 0.2, progress: 0 },
        images: { weight: 0.6, progress: 0 },
      };    

      const update = () => {

        const total = Object.values(tasks).reduce(
          (acc, t) => acc + t.progress * t.weight,
          0
        );

        setProgress(Math.min(total, 1));

      };    

      // DOM readiness 
      const handleReadyState = () => {

        if (document.readyState === "interactive") {
          tasks.dom.progress = 0.5;
        }

        if (document.readyState === "complete") {
          tasks.dom.progress = 1;
        }

        update();
      };    

      document.addEventListener("readystatechange", handleReadyState);
      handleReadyState(); 

      // Fonts
      if (document.fonts) {
        document.fonts.ready.then(() => {
          tasks.fonts.progress = 1;
          update();
        });
      } else {
        tasks.fonts.progress = 1;
      } 

      // Images
      const images = Array.from(document.images);
      if (images.length === 0) {
        tasks.images.progress = 1;
        update();
      } else {
        let loaded = 0; 
        const onLoad = () => {
          loaded++;
          tasks.images.progress = loaded / images.length;
          update();
        };  
        images.forEach((img) => {
          if (img.complete) {
            onLoad();
          } else {
            img.addEventListener("load", onLoad);
            img.addEventListener("error", onLoad);
          }
        });
      } 

      return () => {
        document.removeEventListener("readystatechange", handleReadyState);
      };

    }, []); 

    return Math.round(progress * 100);
}