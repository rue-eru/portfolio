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
        once = true,
        amount = 0.9 //plays when 90% is visible
    }: SlideInProps
) {

    return(

        <motion.div
            initial={{
                opacity: 0,
                ...getInitialPosition(distance, direction)
            }}
            transition={{
                duration: duration,
                ease: "easeOut",
                delay: delay
            }}
            viewport={{ 
                once,
                amount, 
                margin: "0px 0px -50px 0px" //triggers sligtly before snap
            }}
            whileInView={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}