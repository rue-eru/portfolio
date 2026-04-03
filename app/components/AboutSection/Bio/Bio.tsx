'use client'

import { styles } from "@/app/utils/styles";
import AboutData from "@/app/data/about.json"
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import SlideIn from "../../animations/SlideIn";

export default function Bio (){
    const BioData = AboutData.bio
    const t = useTranslations();
    const [hovered, setHovered] = useState<number | null>(null);
    const [active, setActive] = useState<number | null>(null);
    const visible = active ?? hovered;
    const {isEn} = useCurrentLanguage();    
    const [viewedYears, setViewedYears] = useState<Set<string>>(new Set());
    
    // load viewed years from localstorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('viewedBioYears')
        if (saved) {
            setViewedYears(new Set(JSON.parse(saved)))
        }
    }, [])

    // save to localstorage when viewed years change
    useEffect(() => {
        localStorage.setItem('viewedBioYears', JSON.stringify([...viewedYears]))
    }, [viewedYears])


    const handleOpen = (i: number, yearId: string) => {
        setActive(active === i ? null : i)
        setViewedYears(prev => {
            const next = new Set(prev)
            if(!next.has(yearId)) next.add(yearId)
            return next
        })
        
    }

    const lastViewedIndex = Math.max(
        ...BioData.map((y, i) => viewedYears.has(y.id) ? i : -1)
    )

    const proggressPercentage = lastViewedIndex <= 0
        ? 0
        : (lastViewedIndex / (BioData.length - 1)) * 100

    const segmentHeight = 100 / (BioData.length - 1)

    // calculates progress based only on viewedYears
    const mobileProgress = useMemo(() => {
        if (viewedYears.size === 0) return 0;

        // find the furthest viewed year
        let furthestIndex = -1;
        BioData.forEach((year, i) => {
            if (viewedYears.has(year.id)) {
                furthestIndex = Math.max(furthestIndex, i);
            }
        });

        return furthestIndex >= 0 ? furthestIndex * segmentHeight : 0;
    }, [viewedYears]);

    return(
        <section className={`${styles.sectionWidth} ${isEn ? 'text-2xl leading-5' : 'text-sm'} text-set-white pt-50 px-4`}>

            {/*mobile layout */}
            <SlideIn className="flex flex-col gap-10 md:hidden px-4 relative mb-40">
                <div className="absolute left-5.5 top-2 bottom-2 w-0.5 bg-gray-300">
                {/*animated progress line*/}
                    <div    
                        className="absolute left-0 top-0 w-0.5 bg-lime-400 transition-all duration-500 ease-in-out origin-top"
                        style={{height: `${mobileProgress}%`}}
                    />
                </div>
                {BioData.map((year, i) => {
                    const isOpen = visible === i
                    const isViewed = viewedYears.has(year.id)

                    return (
                        <div key={year.id} className="flex gap-4">
                            <div
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => handleOpen(i, year.id)}
                                className={`
                                    w-4 h-4 rounded-full
                                    transition-all duration-300
                                    ${isViewed ? 'bg-lime-400' : 'bg-gray-300'}
                                    hover:scale-125
                                    hover:ring-4 hover:ring-lime-200
                                    cursor-pointer
                                    ${isOpen ? 'ring-4 ring-lime-300' : ''}
                                `}
                            />

                            <div className="flex-1">
                                <div 
                                    className="text-gray-300 cursor-pointer"
                                    onClick={() => handleOpen(i, year.id)}
                                >{year.id}</div>

                                {isOpen && (
                                    <SlideIn 
                                        className={`
                                            bg-transparent
                                            border border-lime-300
                                            shadow-sm shadow-lime-300
                                            rounded-xl
                                            p-4
                                            ${isEn ? '' : 'text-lg'}
                                        `}
                                        key={year.id}
                                        amount={0.1}
                                    >
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
                                    </SlideIn>
                                )}
                            </div>
                        </div>
                    )
                })}
            </SlideIn>


            {/* md+ layout*/}
            <SlideIn className="hidden md:block relative w-full">
                <div className="absolute top-8.5 left-2 right-2  h-0.5 bg-gray-300">
                    {/*animated progress line*/}
                    <div 
                        className="absolute top-0 left-0 h-0.5 bg-lime-400 transition-all duration-500 ease-in-out"
                        style={{width: `${proggressPercentage}%`}}
                    />
                </div>
                <div className="flex justify-between">
                    {BioData.map((year, i) => {
                        const isOpen = visible === i
                        const isViewed = viewedYears.has(year.id)
                        const popupPlacement = ['1998', '2016'].includes(year.id)
                            ? 'left-10'
                            : ['2018', '2019'].includes(year.id)
                            ? '-left'
                            : ['2021', '2024'].includes(year.id)
                            ? 'right-10'
                            : ''

                        return (
                        <div 
                            key={`${year.id}-${i}`}
                            className="flex flex-col items-center relative"
                        >
                            <h2 className={`mb-2 transition-colors duration-300
                                ${isViewed ? 'text-lime-600' : 'text-gray-500'}`}>
                                    {year.id}
                            </h2>
                            <div 
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                onClick={() => handleOpen(i, year.id)}
                                className={`
                                    w-4 h-4
                                    rounded-full
                                    z-10
                                    cursor-pointer
                                    transition-all duration-200
                                    ${isViewed ? 'bg-lime-400' : 'bg-gray-300'}
                                    hover:scale-125
                                    hover:ring-4 hover:ring-lime-200
                                    ${isOpen ? 'ring-4 ring-lime-300 scale-125' : ''}
                                `}
                            />                      

                            {isOpen && (
                                <SlideIn 
                                    key={year.id}
                                    amount={0.1}
                                    className={`absolute top-20 w-140
                                        border border-lime-300
                                        shadow-sm shadow-lime-200 rounded-xl
                                        p-4 transition-all 
                                        ${popupPlacement}
                                        ${isEn ? '' : 'text-xl'}
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
                                </SlideIn>
                            )}
                        </div>
                    )})}
                </div>
            </SlideIn>
        </section>
    )
}