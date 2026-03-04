'use client'

import { motion } from "motion/react"
import { useEffect, useState } from "react"

const random = (min: number, max: number) =>
  Math.random() * (max - min) + min

export function Float({ children }: { children: React.ReactNode }) {
    const [isMd, setIsMd] = useState(false)
    const duration = isMd ? random(5, 10) : 1
    const delay = random(0, 5)

    useEffect(() => {
      const mediaQuery = window.matchMedia("(min-width: 768px")
      setIsMd(mediaQuery.matches)

      const handleResize = () => setIsMd(mediaQuery.matches)
      mediaQuery.addEventListener("change", handleResize)

      return () => mediaQuery.removeEventListener("change", handleResize)
    }, [])

    return (
        <motion.div
            animate={
                isMd ? {
                    y: [-3, 3, -3],
                    rotate: [-0.6, 0.6, -0.6],
                } : {
                    y: 0,
                    rotate: 0
                }
            }
            transition={{
                duration,
                delay,
                repeat: isMd ? Infinity : 0,
                ease: "easeInOut",
            }}
        >
          {children}
        </motion.div>
    )
}

