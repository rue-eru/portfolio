'use client'

import { styles } from "@/app/utils/styles";
import AboutData from "@/app/data/about.json"
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";

export default function Bio (){
    const BioData = AboutData.bio
    const t = useTranslations();
    const [hovered, setHovered] = useState<number | null>(null);
    const [active, setActive] = useState<number | null>(null);
    const visible = active ?? hovered;
    const {isEn} = useCurrentLanguage();               

    return(
        <section className={`${isEn ? 'text-2xl leading-5' : 'text-sm'} ${styles.sectionWidth}`}>

            {/*mobile layout */}
            <div className="flex flex-col gap-10 md:hidden p-4">
                {BioData.map((year, i) => {
                    const isOpen = visible === i

                    return (
                        <div key={year.id} className="flex gap-4">
                            <div
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => setActive(active === i ? null : i)}
                                className="
                                    w-4 h-4 rounded-full
                                    bg-lime-400
                                    transition
                                    hover:scale-125
                                    hover:ring-4 hover:ring-lime-200
                                    cursor-pointer
                                "
                            />


                            <div className="flex-1">
                                <div 
                                    className=" text-gray-500 mb-1 cursor-pointer"
                                    onClick={() => setActive(active === i ? null : i)}
                                >{year.id}</div>

                                {isOpen && (
                                    <div className="
                                        bg-transparent
                                        border border-lime-300
                                        shadow-lg
                                        rounded-xl
                                        p-4
                                        animate-in fade-in slide-in-from-bottom-2
                                    ">
                                        <h3 className="font-semibold border-b mb-4 pb-2">
                                            {year.year.includes('present') ? (
                                              <span>
                                                {year.year.split('-')[0].trim()} - {t('about.bio-section.present')}
                                              </span>
                                            ) : (
                                              <span>{year.year}</span>
                                            )}
                                            <span>: </span>
                                            {t(year.title)}                                            
                                        </h3>
                                        <ul className="space-y-4">
                                            {year.description.map((li, i) => {
                                            const listStyles = 
                                                li.type === 'main'
                                                    ? 'list-inside [&::marker]:content-[">>"]'
                                                    : li.type === 'sub'
                                                    ? 'list-outside pl-2 [&::marker]:content-["▸"] ml-4'
                                                    : '';
                                                return(
                                                <li key={`${li}-${i}`} className={listStyles}>
                                                    {t(li.text)}
                                                </li>
                                            )})}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* md+ layout*/}
            <div className="hidden md:block relative w-full">
                <div className="absolute top-8.5 mx-auto w-full h-0.5 bg-gray-300"/>
                <div className="flex justify-around">
                    {BioData.map((year, i) => {
                        const isOpen = visible === i
                        const popupPlacement = ['1998', '2016'].includes(year.id)
                            ? 'left-0'
                            : ['2018', '2019'].includes(year.id)
                            ? '-left'
                            : ['2021', '2024'].includes(year.id)
                            ? 'right-0'
                            : ''

                        return (
                        <div 
                            key={`${year.id}-${i}`}
                            className="flex left- flex-col items-center relative"
                        >
                            <h2 className="mb-2 text-gray-500">{year.id}</h2>
                            <div 
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => setActive(active === i ? null : i)}
                                className="
                                    w-4 h-4
                                    bg-lime-400
                                    rounded-full
                                    z-10
                                    cursor-pointer
                                    transition 
                                    hover:scale-125
                                    hover:right-4 hover:ring-lime-200
                                "
                            />                      

                            {isOpen && (
                                <div 
                                    className={`absolute top-20 w-140
                                        bg-set-white
                                        border border-lime-300
                                        shadow-xl rounded-xl
                                        p-4 transition-all 
                                        ${popupPlacement}
                                    `}>

                                    <h2 className="font-semibold border-b pb-2 mb-4">
                                        {year.year.includes('present') ? (
                                          <span>
                                            {year.year.split('-')[0].trim()} - {t('about.bio-section.present')}
                                          </span>
                                        ) : (
                                          <span>{year.year}</span>
                                        )}
                                        <span>: </span>
                                        {t(year.title)}
                                    </h2>

                                    <ul>
                                        {year.description.map((li, index) => {
                                            const listStyles = 
                                                li.type === 'main'
                                                    ? 'list-inside [&::marker]:content-[">>"]'
                                                    : li.type === 'sub'
                                                    ? 'list-outside pl-2 [&::marker]:content-["▸"] ml-4'
                                                    : '';
                                            
                                            return (
                                            <li key={`${li.text}-${index}`}
                                                className={`${listStyles} my-4`}
                                            >
                                                {t(li.text)}
                                            </li>
                                        )})}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )})}
                </div>
            </div>
        </section>
    )
}