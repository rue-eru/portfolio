'use client'

import ContactData from "@/app/data/contact.json"
import { motion, useAnimationFrame, useMotionValue } from "motion/react"
import { useRef, useState } from "react"

export default function MarqueeBanner() {
    const Banner = ContactData.banner
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const dublicateBanner = [...Banner, ...Banner, ...Banner, ...Banner]

    const x = useMotionValue(0);

    useAnimationFrame((t) => {
        if (!isHovered && containerRef.current) {
            const speed = 50 // pixels per second
            const newX = x.get() - speed / 60  // 60fps 
            x.set(newX)

            const containerWidth = containerRef.current.scrollWidth
            const originalSetWidth = containerWidth / 4 //bcs dublicated 4 times

            // Reset position when scrolled enough
            if (Math.abs(newX) >= originalSetWidth) {
                x.set(x.get() + originalSetWidth)
            }
        }
    })

    return(
        <div 
            className="w-full h-15 border-t border-b flex flex-row gap-5 items-center overflow-hidden relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                ref={containerRef}
                className="flex whitespace-nowrap"
                style={{x}}
            >
                {dublicateBanner.map((lang, i) => (
                    <div 
                        key={`${lang.id}-${i}`}
                        className="flex flex-row ml-5 gap-5 items-center"
                    >
                        <p>{lang.title}</p>
                        <div className="h-2 w-2 bg-set-accent rounded-full" />
                    </div>
                ))}
            </motion.div>

        </div>
    )
}