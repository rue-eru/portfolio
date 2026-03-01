'use client'

import { useTranslations } from "next-intl"
import StaggerSlide from "../animations/StaggerSlide";
import SlideIn from "../animations/SlideIn";

export default function Nav () {
    const t = useTranslations('layout.nav-bar')
    const sections = [ 'projects', 'tech', 'about', 'contacts'];


    return (

        <div className={`p-2 flex items-center bg-transparent fixed left-0 right-0 top-0 text-set-white text-xs
        `}>

            <SlideIn 
                className="flex-1 cursor-pointer"
                duration={0.5}
                distance={-20}
                direction="bottom"
            >
                <a>
                    <p className="text-4xl pl-5">L</p>
                </a>
            </SlideIn>
            
            <StaggerSlide
                direction="bottom" 
                delay={0.3}
                duration={2} 
                distance={-20}
                className="flex-1 flex justify-around"
            >
                {sections.map((name) => (
                    <a 
                        key={name}
                        href={`#${name}`}
                        className="cursor-pointer"
                    >
                        <span>{t(name)}</span>
                    </a>
                ))}
            </StaggerSlide>

        </div>
    )
}