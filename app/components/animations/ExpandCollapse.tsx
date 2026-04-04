'use client'

import { easeOut, motion } from "motion/react"

import type { ExpandCollapseProps } from "@/app/utils/interfaces"
import { AnimatePresence } from "motion/react"

export default function ExpandCollapse({
    isOpen, children, key, className
}: ExpandCollapseProps) {

    return(
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    key={key}
                    initial={{
                        opacity: 0,
                        height: 0,
                        y: -20
                    }}
                    animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0
                    }}
                    exit={{
                        opacity: 0,
                        height: 0,
                        y: -20
                    }}
                    transition={{
                        duration: 0.3,
                        ease: easeOut
                    }}
                    className={`overflow-hidden ${className}`}
                >
                    {children}
                </motion.div>
            )}

        </AnimatePresence>
    )
}