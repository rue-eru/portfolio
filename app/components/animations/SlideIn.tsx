'use client'
import { getInitialPosition } from "@/app/utils/animationFunctions"
import type { SlideInProps} from "@/app/utils/interfaces"
import { motion } from "motion/react"

export default function SlideIn (
    {
        children,
        direction = 'bottom',
        delay = 0,
        duration = 0.5,
        distance = 50,
        className = "",
        once = true
    }: SlideInProps
) {

    return(

        <motion.div
            initial={{
                opacity: 0,
                ...getInitialPosition(distance, direction)
            }}
            animate={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            transition={{
                duration,
                delay,
                ease: "easeOut"
            }}
            viewport={{ once }}
            className={className}
        >
            {children}
        </motion.div>
    )
}