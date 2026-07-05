'use client'

import { styles } from "@/app/utils/styles"
import { Float } from "../animations/Float"
import { useState } from "react"
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import Image from "next/image";
import { useTranslations } from "next-intl";
import projectsData from '@/app/data/projects.json';
import GitHubStats from "./GitHubStats";

export default function Contributions () {

    const contributionProjects = projectsData.projects.contributions
    const [isOpen, setIsOpen] = useState<string | null>(null);
    const [isStarHovered, setIsStarHovered] = useState<string | null>(null);
    const [isForkHovered, setIsForkHovered] = useState<string | null>(null);
    const [isPrHovered, setIsPrHovered] = useState<string | null>(null);
    const {isEn} = useCurrentLanguage();
    const id = "btn";
    const t = useTranslations();

    return(
        <div className={`text-set-white mt-10 -mb-10 ${styles.flexCenter} flex-col max-w-252 mx-auto`} >
            
            <Float
                key={`${id}`}
            >
                <button
                    className={`
                        ${styles.projectsSectionBtn}
                        ${isOpen  ? styles.projectOpenBtn : ''}
                        ${styles.containerShadow}
                    `}
                    onClick={() => setIsOpen(prev => prev === id ? null : id)}
                >
                    <Image
                        src="/images/icons/puzzle1.png"
                        alt="contributions_image"
                        width={40}
                        height={40}
                        className='object-contain'
                        loading='lazy'
                    />
                    <span className={`${isEn ? 'text-xl' : 'text-sm'}`}>{t('projects.contributions.title')}</span>
                </button>
            </Float>
            
            <div className="w-full p-4">
                {isOpen && (
                    <Float>
                        <div
                          className={`
                                bg-gray-600 p-2 rounded-xs
                                ${styles.containerShadow}
                            `}
                        >
                            {contributionProjects.map((project) => (
                                <>
                                    {/*sm+ screens: tablets, pc etc*/}
                                    <div 
                                        key={`${project.id}-sm>`}
                                        className={`hidden sm:flex gap-4 justify-between items-center py-2 
                                            border-b border-gray-500
                                            last-of-type:border-b-0
                                            ${isEn ? "text-2xl/4"
                                                : "text-sm/5"
                                            }
                                        `}
                                    >
                                        <div className="w-[20%]  hover:text-set-accent">
                                            <a 
                                                href={project.links.github}
                                                title={t('projects.contributions.link_title.project', {project_repo: project.title})}
                                            >
                                                {project.title}
                                            </a>
                                        </div>

                                        <div className="w-full text-wrap px-0.5">
                                            {t(project.description)}
                                        </div>

                                        <GitHubStats
                                            owner={project.owner}
                                            repo={project.title}
                                            github={project.links.github}
                                            id={project.id}
                                            prLink={project.links.pr}
                                            isStarHovered={isStarHovered}
                                            setIsStarHovered={setIsStarHovered}
                                            isForkHovered={isForkHovered}
                                            setIsForkHovered={setIsForkHovered}
                                            isPrHovered={isPrHovered}
                                            setIsPrHovered={setIsPrHovered}
                                        />

                                    </div>

                                    {/*sm< screens: phones*/}
                                    <div 
                                        key={`${project.id}-sm<`}
                                        className={`sm:hidden flex-col gap-4 justify-between items-center py-2 
                                            border-b border-gray-500
                                            last-of-type:border-b-0
                                            ${isEn ? "text-2xl/4"
                                                : "text-sm/5"
                                            }
                                        `}
                                    >

                                        <div className="w-full flex justify-between p-0.5">
                                            <a 
                                                className="hover:text-set-accent flex-1 flex items-center"
                                                href={project.links.github}
                                                title={t('projects.contributions.link_title.project', {project_repo: project.title})}
                                            >
                                                {project.title}
                                            </a>

                                            <GitHubStats
                                                owner={project.owner}
                                                repo={project.title}
                                                github={project.links.github}
                                                id={project.id}
                                                prLink={project.links.pr}
                                                isStarHovered={isStarHovered}
                                                setIsStarHovered={setIsStarHovered}
                                                isForkHovered={isForkHovered}
                                                setIsForkHovered={setIsForkHovered}
                                                isPrHovered={isPrHovered}
                                                setIsPrHovered={setIsPrHovered}
                                            />
                                        </div>

                                        <div className="w-full text-wrap px-0.5 pt-2">
                                            {t(project.description)}
                                        </div>


                                    </div>
                                </>
                            ) ) }
                        </div>
                    </Float>
                )}
            </div>

        </div>
    )
}

