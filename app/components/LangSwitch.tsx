'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

export default function LangSwitch () {
    const [isHovered, setIsHovered] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const languages = [
        { code: 'en'},
        { code: 'ru'},
        { code: 'ja'},
    ];

    const handleLangSelect = (langCode: string) => {
        router.push(`/${langCode}/main`);
        setIsOpen(false);
    }

    const entrancePaths = [
        {
            initial: { opacity: 0, x: -30, y: 0},
            animate: {
                opacity: 1,
                x: 0,
                y: [0, -5, 0], //bounce
            },
            transition: { 
                y: { duration: 0.3, delay: 0.2},
                duration: 0.5,
                delay: 0,
            },
            left: 50,
            top: -60
        },
        {
            initial: { opacity: 0, x: 0, y: -30, rotate: -10},
            animate: {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
            },
            transition: { rotate: { duration: 0.4 }},
            left: 30,
            top: -5
        },
        {
            initial: { opacity: 0, x: 30, scale: 0.5},
            animate: {
                opacity: 1,
                x: 0,
                scale: 1,
            },
            transition: { scale: {type: "spring", stiffness: 200}},

            left: -30,
            top: 5
        }
    ]

    return (
        <div className="relative p-1">
            <span className={`absolute -mt-1 -ml-4 ${isOpen ? "text-6xl opacity-100  delay-600" : "opacity-0"}`}>!</span>

            <div className="flex gap-7">
                    <motion.div
                        animate={isHovered ? {
                            x: [0, 12, 0],
                            scale: [1, 1.2, 1]
                        } : {
                            x: [0, 8, 0, 4, 0]
                        }}
                        transition={{
                            duration: isHovered ? 0.8 : 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{ opacity: isOpen ? 0 : 1 }}
                        className="transition-opacity duration-300" 
                    >
                        <Image
                            src={`/images/arrow-new.png`}
                            alt="arrow"
                            className="object-contain h-10 w-10  "
                            width={100}
                            height={100}
                        />
                    </motion.div>


                <div className="relative">

                    <button
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Image
                            src={`${isHovered ? `/images/globe-hover.png` : `/images/globe.png` }`}
                            alt="international-globe"
                            className="object-contain h-10 w-10 cursor-pointer"
                            width={100}
                            height={100}
                        />
                    </button>

                    {isOpen && (
                        
                        <div
                        
                            className="absolute min-w-30"
                        >
                            {languages.map((lang, index) => (
                                <motion.div
                                    key={lang.code}
                                    initial={entrancePaths[index].initial}
                                    animate={entrancePaths[index].animate}
                                    transition={{
                                        delay: index * 0.15,
                                        ...entrancePaths[index].transition
                                    }}
                                    className="mb-2 absolute "
                                    style={{
                                        left: entrancePaths[index].left,
                                        top: entrancePaths[index].top
                                    }}
                                >
                                    <button
                                        onClick={() => handleLangSelect(lang.code)}
                                        className="w-full flex items-center gap-3 px-4 py-2 hover:scale-140 hover:animate-pulse"
                                    >
                                        <Image
                                            src={`/images/${lang.code}.png`}
                                            alt="international-globe"
                                            className="object-contain h-10 w-10 cursor-pointer"
                                            width={100}
                                            height={100}
                                        />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    )
}
