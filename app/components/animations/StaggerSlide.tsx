'use client'

import { getInitialPosition } from "@/app/utils/animationFunctions";
import type { SlideInProps } from "@/app/utils/interfaces";
import { motion } from "motion/react"

export default function StaggerSlide({
    children,
    direction = 'bottom',
    staggerDelay = 0.15,
    delay = 0,
    distance = 50,
    className = '',
}: SlideInProps) {

    const containerVariants = {
        hidden: { opacity: 0},
        visible: {
            opacity: 1,
                   transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay
        }
        },
 
    };

    const childVariants = {
        hidden: {
            opacity: 0,
            ...getInitialPosition(distance, direction)
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut' as const
            }
        }
    }

    if (!children || !Array.isArray(children)) {
        console.warn('StaggerSlide expects an array of children!');
        return null;
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={className}
        >{children.map((child, index) => (
            <motion.div
                key={index}
                variants={childVariants}
            >
                {child}
            </motion.div>
        ))}

        </motion.div>
    )
}