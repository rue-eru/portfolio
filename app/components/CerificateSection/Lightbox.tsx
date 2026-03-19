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
            className="fixed inset-0 z-50 bg-set-black/80 flex items-center justify-center flex-col h-fit"
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
                    src={currentSrc}
                    alt={currentCert.id}
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
                images={images}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
            
            <button
                onClick={onClose}
                className="absolute top-0 right-2 py-1 px-2.5 m-2 text-2xl opacity-50 hover:opacity-100 bg-set-black/50 rounded-full"
            >
                ⨯
            </button>
                <div className="bg-set-white h-0.5 w-[98%] my-4 px-4 rounded-2xl" />

            <div className={`w-full my-4 text-white px-100 text-justify font-accent ${isEn ? "text-2xl" : ""}`}>
              <h2 className="font-semibold">{t(currentCert.title)}</h2>
              <p>{t(currentCert.description)}</p>
            </div>

        </div>
    )
}