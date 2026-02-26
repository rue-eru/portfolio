'use client'

import { styles } from "@/app/utils/styles";
import { useTranslations } from "next-intl"
import techData from "@/app/data/tech.json"
import ListCard from "./ListCard";
import Image from "next/image";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import { useState } from "react";

export default function StackPage () {
    const tTech = useTranslations('tech');
    const t = useTranslations();
    const stackData = techData.stack;
    const l10nData = techData.l10n;
    const {isEn, isRu} = useCurrentLanguage();
    const textSize = `${isEn ? "text-2xl" : "text-sm"}`;
    const liClassName = `${textSize} ${styles.liStyle}`;
    const titleStyle = `${isEn ? "text-7xl leading-10 uppercase px-10 py-5" : "text-6xl px-5 text-nowrap mb-10"} ${styles.h1}`;
    const [hoveredStack, setHoveredStack] = useState<number | null>(null);
    const [hoveredCat, setHoveredCat] = useState<number | null>(null);
    const [hoveredLang, setHoveredLang] = useState<number | null>(null); 
    
    return (
        <div 
            id="tech"
            className={`${styles.sectionWidth} flex flex-col`}
        >

            <div className="flex justify-start">
                <div className={`${styles.toolDiv}`}>
                <h1 className={titleStyle}>{tTech('stack-title')}</h1>
                        <ul className={styles.ulLiFlex}>
                            {stackData.map((tool, index) => {
                                const isNextIntl = tool.id === 'next-intl';
                                return(
                                <ListCard
                                    key={`${tool.id}-${index}`}
                                    tool={tool}
                                    index={index}
                                    imgClassName={`${isNextIntl? 'w-20' : 'w-10'}`}
                                    hideTitle={isNextIntl}
                                    liClassName={liClassName}   
                                    isHovered={hoveredStack === index}
                                    onHover={setHoveredStack}
                                />
                            )})}
                        </ul>
                </div>
            </div>

            <div className="flex justify-end">
                <div className={`${styles.toolDiv}`}>
                    <h1 className={titleStyle}>{tTech('l10n-title')}</h1>
                    <ul className={styles.ulLiFlex}>
                        {l10nData.tools.map((tool, index) => (
                            <ListCard 
                                key={`${tool.id}-${index}`}
                                tool={tool}
                                index={index}
                                imgClassName="w-10"
                                liClassName={liClassName}   
                                isHovered={hoveredCat === index}
                                onHover={setHoveredCat}
                            />
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-1 justify-center items-center mt-1">
                        {l10nData.languages.map((lang, index) => (
                            <div
                                key={`${lang.id}-${index}`}
                                onMouseEnter={() => setHoveredLang(index)}
                                onMouseLeave={() => setHoveredLang(null)}
                                className={`${liClassName} w-10 ${
                                    hoveredLang === index ? styles.liHover : ''
                                }`}
                            >
                                <Image 
                                    src={lang.icon}
                                    alt={lang.id}
                                    className="object-cover w-7 h-7"
                                    width={20}
                                    height={20}
                                    loading="lazy"
                                />
                                <div className="flex flex-col">
                                    <span className={textSize}>
                                        {t(lang.level)}
                                        {!(isRu && lang.id === 'ru') && <span> • </span>}
                                        {t(lang.description)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

