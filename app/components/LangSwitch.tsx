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
        router.push(`/${langCode}`);
        setIsOpen(false);
    }

    return (
        <div className="flex justify-end mt-5 pr-50">
            <div className={`flex ${isHovered ? "gap-10" : "gap-5"}`}>

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
                        <motion.div
                            initial={{ opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{ opacity: 0, y: -10}}
                            className="absolute left-30 -top-16  rounded-lg  min-w-[150px] z-50"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => handleLangSelect(lang.code)}
                                    className="w-full flex items-center gap-3 px-4 py-2 rounded"
                                >
                                    <Image
                                        src={`/images/${lang.code}.png`}
                                        alt="international-globe"
                                        className="object-contain h-10 w-10 cursor-pointer"
                                        width={100}
                                        height={100}
                                    />
                                </button>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>


        </div>
    )
}