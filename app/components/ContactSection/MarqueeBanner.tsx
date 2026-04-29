'use client'

import ContactData from "@/app/data/contact.json"
import { motion, useAnimationFrame, useMotionValue } from "motion/react"
import { useRef, useState } from "react"
import SlideIn from "../animations/SlideIn"

export default function MarqueeBanner() {
    const Banner = ContactData.banner
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const dublicateBanner = [...Banner, ...Banner, ...Banner, ...Banner, ...Banner, ... Banner, ...Banner]

    const x = useMotionValue(0);

    useAnimationFrame(() => {
        if (!isHovered && containerRef.current) {
            const speed = 50 // pixels per second
            const newX = x.get() - speed / 60  // 60fps 
            x.set(newX)

            const containerWidth = containerRef.current.scrollWidth
            const originalSetWidth = containerWidth / 7 //bcs dublicated 7 times

            // Reset position when scrolled enough
            if (Math.abs(newX) >= originalSetWidth) {
                x.set(x.get() + originalSetWidth)
            }
        }
    })

    return(
        <SlideIn 
            className="w-full max-w-[100vw] overflow-x-hidden"
            delay={0.5}
        >
            <div 
                className="w-full h-15 border-t border-b relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                data-cursor-big
            >
                <motion.div
                    ref={containerRef}
                    className="flex whitespace-nowrap h-full items-center"
                    style={{x}}
                >
                    {dublicateBanner.map((lang, i) => (
                        <div 
                            key={`${lang.id}-${i}`}
                            className="flex flex-row ml-3 md:ml-5 gap-3 md:gap-5 items-center"
                        >
                            <p className={`${lang.id === 'en' ? "font-dongle text-2xl md:text-3xl mt-1.5" : "font-m-plus text-xs md:text-base"} `}>{lang.title}</p>
                            <div className="h-1.5 w-1.5 md:h-2 md:w-2 bg-set-accent rounded-full shrink-0" />
                        </div>
                    ))}
                </motion.div>

            </div>
        </SlideIn>
    )
}