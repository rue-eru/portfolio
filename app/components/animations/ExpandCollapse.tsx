'use client'

import { easeOut, motion, AnimatePresence } from "motion/react"

import type { ExpandCollapseProps } from "@/app/utils/interfaces"

export default function ExpandCollapse({
    isOpen, children, componentKey, className
}: ExpandCollapseProps) {

    return(
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    key={componentKey}
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
                    className={` ${className}`}
                >
                    {children}
                </motion.div>
            )}

        </AnimatePresence>
    )
}