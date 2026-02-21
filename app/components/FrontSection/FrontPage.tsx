'use client'

import { useTranslations } from "next-intl"
import StaggerSlide from "../animations/StaggerSlide";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import Image from "next/image";
import SlideIn from "../animations/SlideIn";

export default function FrontPage () {
    const t = useTranslations('layout');
    const title = t('frontpage-title');
    const { isJa } = useCurrentLanguage();
    const characters = title.split(/(\s+)/);
    const charactersJA = Array.from(title);


    return (
        <div id="frontpage" className="front-page h-screen flex justify-center items-center">
            <div className="w-[80%] flex flex-wrap justify-center items-center ">
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
                                className="text-7xl"
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
                                            className="text-7xl"
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
                <Image 
                    src={`/images/icons/down-arrow.png`}
                    alt="slide down arrow"
                    className="w-20 h-20 animate-pulse object-contain"
                    width={100}
                    height={100}
                    loading="lazy"
                />
            </SlideIn>

        </div>
    )
}