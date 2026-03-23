'use client'

import type { LightboxProps } from "@/app/utils/interfaces";
import Image from "next/image";
import ImageArrows from "./ImageArrows";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";

export function Lightbox({
    onClose, 
    cert, 
    setImageIndex, 
    imageIndex, 
    images, 
    currentIndex, 
    setCurrentIndex
} : LightboxProps) {
    const t = useTranslations('certificates');
    const {isEn} = useCurrentLanguage();
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [zoomed, setZoomed] = useState(false);
    const minSwipeDistance = 50;
    const isGlobal = !!images;

    const currentSrc = isGlobal
      ? images[currentIndex!].src
      : cert.image[imageIndex![cert.id] ?? 0];

    const currentCert = isGlobal
      ? images[currentIndex!].cert
      : cert;


    return(
        <div 
            className="fixed inset-0 z-50 bg-set-black/80 flex items-center flex-col overflow-y-auto
                [&::-webkit-scrollbar]:w-2
                 [&::-webkit-scrollbar-track]:bg-set-black
                 [&::-webkit-scrollbar-thumb]:bg-set-white/50
                 [&::-webkit-scrollbar-thumb]:rounded
            "
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
                className="relative shrink-0"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setZoomed(prev => !prev)
                    }}
                    className="overflow-scroll
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
                    "
                >
                    <Image
                        src={currentSrc}
                        alt={currentCert.id}
                        width={1200}
                        height={800}
                        className={`object-contain sm:w-screen mx-auto w-[98%] h-auto max-h-[90vh]
                            transition-transform duration-300 ${
                                zoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                            }
                            `}
                        loading="lazy"
                    />
                </div>

                <ImageArrows 
                    cert={cert}
                    setImageIndex={setImageIndex}
                    className="top-1/2 -translate-y-1/2 flex items-center"
                    onClose={onClose}
                    images={images}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                />

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="absolute top-0 right-2 py-1 px-2.5 m-2 text-2xl opacity-50 hover:opacity-100 bg-set-black/50 rounded-full cursor-pointer"
                >
                    ⨯
                </button>
                
            </div>
            
            <div className={` my-4 text-white lg:w-[60%] md:w-[80%] sm:w-[90%] w-[95%] text-justify font-accent ${isEn ? "text-2xl" : ""}`}>
              <h2 className="font-semibold">{t(currentCert.title)}</h2>
              <p>{t(currentCert.description)}</p>
            </div>

        </div>
    )
}