'use client'

import { useTranslations } from "next-intl"
import StaggerSlide from "../animations/StaggerSlide";
import SlideIn from "../animations/SlideIn";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import { useState } from "react";
import Link from "next/link";

export default function Nav () {
    const t = useTranslations('layout.nav-bar')
    const sections = [ 'projects', 'tech', 'about', 'contacts'];
    const {isEn} = useCurrentLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const linkStyle = `
        cursor-pointer font-semibold 
        hover:text-set-accent transition-colors text-nowrap
        flex items-center justify-center
        ${isEn ? "text-2xl" : "text-lg"}
        border-t sm:border-0
        border-set-white/50 
    `;
    const linkP = `w-40 sm:w-auto h-auto p-1 pl-2 sm:px-2`;


    return (

        <div className={`p-2 flex sm:items-center fixed left-0 right-0 top-0 text-set-white text-xs gap-5 z-50 bg-set-black `}>

            <SlideIn 
                className="sm:flex-1 "
                duration={0.5}
                distance={-20}
                direction="bottom"
                amount={0}
            >
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    >
                <a
                    href="/"
                    className="hidden sm:block"
                >
                    <p className="text-7xl pl-5 -mt-4 -mb-6 cursor-pointer hover:text-set-accent transition-colors font-dongle">L</p>
                </a>
                <p className="text-7xl pl-5 -mt-4 -mb-6 cursor-pointer hover:text-set-accent transition-colors font-dongle sm:hidden">L</p>
                </button>
            </SlideIn>
            
            <StaggerSlide
                direction="bottom" 
                delay={0.3}
                duration={2} 
                distance={-20}
                className={`sm:flex-1 sm:flex-row sm:justify-around flex-col justify-center items-start
                    absolute sm:static left-2 top-11 w-auto h-auto bg-set-black rounded-bl rounded-br 
                    ${isOpen ? "flex transition-all" : "hidden sm:flex"}
                `}
            >
                
                {...sections.map((name, index) => (
                    <a 
                        key={name}
                        href={`#${name}`}
                        className={`${linkStyle}
                            ${index === 0 ? 'border-t-0' : ''}
                        `}
                    >
                        <p className={linkP}>{t(name)}</p>
                    </a>
                ))}
                <a 
                    href="/"
                    className={linkStyle}
                >
                    <p className={linkP}>{t('home')}</p>
                </a>
            </StaggerSlide>

        </div>
    )
}