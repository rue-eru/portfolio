'use client'

import { useTranslations } from "next-intl"
import StaggerSlide from "../animations/StaggerSlide";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import SlideIn from "../animations/SlideIn";
import ScrollIcons from "./ScrollIcons";

export default function FrontPage () {
    const t = useTranslations('layout');
    const title = t('frontpage-title');
    const { isJa } = useCurrentLanguage();
    const characters = title.split(/(\s+)/);
    const charactersJA = Array.from(title);


    return (
        <div id="frontpage" className="front-page h-dvh w-full snap-start snap-always flex justify-center items-center relative">
            <div 
                className="w-[80%] flex flex-wrap justify-center items-center text-justify"
                data-cursor-big
                >
                {isJa ? (

                    <StaggerSlide
                        direction="top" 
                        duration={1} 
                        distance={20} 
                        delay={1.5}
                        className="inline-flex"
                    >
                        {charactersJA.map((char, i) => (
                            <span
                                key={i}
                                className="xl:text-7xl lg:text-5xl sm:text-4xl text-lg"
                            >
                                {char}
                            </span>
                        ))}
                    </StaggerSlide>
                ) : 
                (
                    <StaggerSlide
                        direction="top" 
                        duration={1} 
                        distance={20} 
                        delay={1.5}
                        className="inline-flex flex-wrap justify-center"
                    >
                        {characters.map((word, wordIndex) => {

                            if (word.trim() === '') {
                                return <span key={wordIndex} className="mx-2">{word}</span>;
                            }

                            return (
                                <span
                                    key={wordIndex}
                                    className="inline-flex"
                                >
                                    {word.split('').map((char, charIndex) => (
                                        <span
                                            key={`${wordIndex}-${charIndex}`}
                                            className="sm:text-7xl text-4xl"
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </span>
                            );
                        })}
                    </StaggerSlide>
            )}            
            </div>


            <SlideIn
                direction="bottom" 
                duration={1} 
                distance={20} 
                delay={5}
                className="absolute bottom-20 right-10"          
            >
                <ScrollIcons />
            </SlideIn>

        </div>
    )
}