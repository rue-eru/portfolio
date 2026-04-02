'use client'

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function ScrollIcons() {
    const [phase, setPhase] = useState(0); // 0 = up, 1 = down

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => prev === 0 ? 1 : 0);
        }, 1500);
        
        return () => clearInterval(interval);
    }, []);

    return(
        <div className="flex items-center gap-5 opacity-60">

            <div className="border h-14 w-7 rounded-2xl flex justify-center items-center p-1">
                <motion.div 
                    className="w-3 h-3 border rounded-2xl bg-set-white"
                    animate={{
                        y: phase === 0 ? [0, -17, 0] : [0, 17, 0],
                    }}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut"
                    }}
                />
            </div>

            <div className="text-set-white/50">/</div>

            <div className="flex flex-col gap-2">

                <motion.div
                    className="w-7 h-7 border rounded-md
                        flex items-center justify-center
                    "
                    animate={{
                        scale: phase === 0 ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                        scale: { duration: 0.4 },
                    }}
                >
                    <div className="text-lg">⮝</div>
                </motion.div>

                <motion.div
                    className="w-7 h-7 border rounded-md
                        flex items-center justify-center
                    "
                    animate={{
                        scale: phase === 1 ? [1, 1.2, 1] : 1,
                    }}
                    transition={{
                        scale: { duration: 0.4 },
                    }}
                >
                    <div className="text-lg">⮟</div>
                </motion.div>

            </div>
        </div>
    )
}