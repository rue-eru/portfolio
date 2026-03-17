'use client'

import type { ImageArrowsProps } from "@/app/utils/interfaces";
import Image from "next/image";
import { useEffect } from "react";

export default function ImageArrows ( {cert, className, setImageIndex, onClose}: ImageArrowsProps ) {

    const arrowNext = () => {
        setImageIndex((prev) => {
            const current = prev[cert.id] ?? 0
            const next = 
                current === cert.image.length - 1
                    ? 0 
                    : current + 1
            return {...prev, [cert.id]: next}
        })
    }

    const arrowPrev = () => {
        setImageIndex((prev) => {
            const current = prev[cert.id] ?? 0
            const next = 
                current === 0
                    ? cert.image.length - 1
                    : current - 1
            return {...prev, [cert.id]: next}
        })
    }

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose;

            if (e.key === "ArrowRight") arrowNext();

            if (e.key === "ArrowLeft") arrowPrev();
        }
        window.addEventListener("keydown", handleKey)
        return () => window.removeEventListener("keydown", handleKey)
    }, [cert, setImageIndex, onClose])

    return (
        <div>
            {cert.image.length > 1 && (
                <div onClick={(e) => e.stopPropagation()} >
                    {/*prevents lightbox closing on clicking arrows */}
                    <button
                        className={`${className} absolute right-2 opacity-50 hover:opacity-100 transition-opacity justify-end`}
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
                        className={`${className} absolute left-2 opacity-50 hover:opacity-100 transition-opacity justify-start`}
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