'use client'

import { styles } from "@/app/utils/styles";
import AboutData from "@/app/data/about.json"
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Bio (){
    const BioData = AboutData.bio
    const t = useTranslations();
    const [descriptionVisible, setDescriptionVisible] = useState<number | null>(null);


    return(
        <div className={styles.sectionWidth}>
            <div className={`flex justify-center items-baseline w-full `}>
                <div className="bg-set-black h-1 rounded-full w-full flex justify-around items-end">
                    {BioData.map((year, index) => {
                        const ulData = year.description;

                        return (
                        <div key={`${year.id}-${index}`}
                            onMouseEnter={() => setDescriptionVisible(index)}
                            onMouseLeave={() => setDescriptionVisible(null)}
                            onClick={() => setDescriptionVisible ( descriptionVisible === index ? null : index)}
                        >
                            <div className={`${styles.flexCenter} flex-col`}>
                                <h2 className="hover:scale-110 text-2xl hover:bg-set-accent px-2">{year.id}</h2>
                                <div className="w-3 h-3 hover:bg-set-accent bg-set-black rounded-full border-2 border-set-black"/>                           
                             </div>

                            {descriptionVisible === index && (
                                <div 
                                    className="absolute p-4 flex flex-col w-80 h-fit text-justif
                                        backdrop-blur-sm rounded-lg shadow-2xl
                                        bg-set-accent z-50
                                        max-h-96 overflow-y-auto
                                        left-1/2 transform -translate-x-1/2
                                        bottm-full mb-4
                                        [&::-webkit-scrollbar]:w-1.5
                                        [&::-webkit-scrollbar-track]:bg-gray-800
                                        [&::-webkit-scrollbar-thumb]:bg-set-accent                                    ">
                                    <h2 className="text-2xl bg-set-white w-fit px-2 text-center">
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
                                        {ulData.map((li, index) => {
                                            const listStyles = 
                                                li.type === 'main'
                                                    ? 'list-inside [&::marker]:content-[">>"]'
                                                    : li.type === 'sub'
                                                    ? 'list-outside pl-2 [&::marker]:content-["▸"] ml-4'
                                                    : '';
                                            
                                            return (
                                            <li key={`${li.text}-${index}`}
                                                className={listStyles}
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
        </div>
    )
}