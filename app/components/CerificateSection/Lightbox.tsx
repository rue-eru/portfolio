'use client'

import type { LightboxProps } from "@/app/utils/interfaces";
import Image from "next/image";
import ImageArrows from "./ImageArrows";
import { useState } from "react";

export function Lightbox({
    onClose, cert, setImageIndex, imageIndex
}: LightboxProps) {
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const minSwipeDistance = 50;

    return(
        <div 
            className="fixed inset-0 z-50 bg-set-black/80 flex items-center justify-center"
            onClick={onClose}
            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={() => {
                if (!touchStart || !touchEnd) return
                const distance = touchStart - touchEnd
                if (distance > minSwipeDistance) {
                    // = next image
                }
                if (distance < -minSwipeDistance) {
                    // = prev image
                }
            }}
        >
            <div 
                className="relative w-[90vw] h-[90vh]"
            >
                <Image
                    src={cert.image[imageIndex[cert.id] ?? 0]}
                    alt={cert.id}
                    fill
                    className="object-contain cursor-zoom-out"
                    loading="lazy"
                />
            </div>

            <ImageArrows 
                cert={cert}
                setImageIndex={setImageIndex}
                className="top-0 w-50 h-full flex items-center"
                onClose={onClose}
            />
        </div>
    )
}