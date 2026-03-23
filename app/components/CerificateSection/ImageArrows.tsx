'use client'

import type { ImageArrowsProps } from "@/app/utils/interfaces";
import { styles } from "@/app/utils/styles";
import Image from "next/image";
import { useEffect } from "react";

export default function ImageArrows ( {
    cert, 
    className, 
    setImageIndex, 
    onClose,
    images,
    currentIndex,
    setCurrentIndex
}: ImageArrowsProps ) {

    const isGlobal = !!images;

    const arrowNext = () => {
        if (images) {
            setCurrentIndex!(prev => (prev + 1) % images.length);
        } else {
            setImageIndex!((prev) => {
                const current = prev[cert.id] ?? 0
                const next = 
                    current === cert.image.length - 1
                        ? 0 
                        : current + 1
                return {...prev, [cert.id]: next}
            })
        }
    }

    const arrowPrev = () => {
        if (images) {
            setCurrentIndex!( prev => 
                prev === 0 
                    ? images.length -1 
                    : prev - 1
            );
        } else {
            setImageIndex!((prev) => {
                const current = prev[cert.id] ?? 0
                const next = 
                    current === 0
                        ? cert.image.length - 1
                        : current - 1
                return {...prev, [cert.id]: next}
            })
        }
    }

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose?.();

            if (e.key === "ArrowRight") arrowNext();

            if (e.key === "ArrowLeft") arrowPrev();
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [cert, setImageIndex, onClose, images])

    const hasMultiple = isGlobal
        ? images.length > 1
        : cert.image.length > 1;

    return (
        <div>
            {hasMultiple && (
                <div onClick={(e) => e.stopPropagation()} >
                    {/*prevents lightbox closing on clicking arrows */}
                    <button
                        className={`${className} ${styles.arrowStyle} right-2 justify-end`}
                        onClick={() => arrowNext()}
                    >
                        <Image
                            src={`/images/icons/next-arrow.png`}
                            alt="sliding arrow image"
                            className="object-contain"
                            height={30}
                            width={30}
                        />
                    </button>
                    <button
                        className={`${className} ${styles.arrowStyle} left-2 justify-start`}
                        onClick={() => arrowPrev()}
                    >
                        <Image 
                            src={`/images/icons/back-arrow.png`}
                            alt="sliding back arrow image"
                            className="object-contain"
                            height={30}
                            width={30}
                        />
                    </button>
                </div>
            )}
        </div>
    )
}