'use client'

import { useTranslations } from "next-intl"
import StaggerSlide from "../animations/StaggerSlide";
import SlideIn from "../animations/SlideIn";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import { useState } from "react";

export default function Nav () {
    const t = useTranslations('layout.nav-bar')
    const sections = [ 'projects', 'tech', 'about', 'contacts'];
    const {isEn} = useCurrentLanguage();
    const [isOpen, setIsOpen] = useState(false);


    return (

        <div className={`p-2 flex sm:items-center bg-transparent fixed left-0 right-0 top-0 text-set-white text-xs
        gap-5`}>

            <SlideIn 
                className="sm:flex-1 "
                duration={0.5}
                distance={-20}
                direction="bottom"
            >
                <button
                    onClick={() => setIsOpen(prev => !prev)}
                    >
                <a>
                    <p className="text-4xl pl-5 cursor-pointer">L</p>
                </a>
                </button>
            </SlideIn>
            
            <StaggerSlide
                direction="bottom" 
                delay={0.3}
                duration={2} 
                distance={-20}
                className={`sm:flex-1 gap-5 sm:flex-row flex-col justify-around
                    ${isOpen ? "flex transition-all" : "hidden sm:flex"}
                `}
            >
                {sections.map((name) => (
                    <a 
                        key={name}
                        href={`#${name}`}
                        className={`cursor-pointer font-semibold hover:text-set-accent transition-colors text-nowrap ${isEn ? "text-2xl" : "text-lg"}`}
                    >
                        <span>{t(name)}</span>
                    </a>
                ))}
            </StaggerSlide>

        </div>
    )
}