'use client'

import { useTranslations } from "next-intl";
import { useState } from "react";
import SlideIn from "../animations/SlideIn";
import projectsData from '@/app/data/projects.json';
import { styles } from "@/app/utils/styles";
import ProjectCard from "./ProjectCard";
import LegacyProjects from "./LegacyProjects";


export default function ProjectsPage() {
    const id = `projects`;
    const tPr = useTranslations(id);
    const [isDescriptionHover, setDescriptionHover] = useState<number | null>(null);
    const projects = projectsData.projects.featured;

    return(
        <div 
            id={id}
            className="main-page h-screen lg:w-[60%] sm:w-[95%] w-full mx-auto border-4 border-red-600"
        >
            <SlideIn
                direction="top"
            >
                <h3 className={styles.h3}>{tPr('main-pr')}</h3>
            </SlideIn>

            <div className="flex justify-center mt-30">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={project.id}
                            project={project}
                            index={index}
                            isHovered={isDescriptionHover === index}
                            onHover={setDescriptionHover}
                        />
                    ))}
                </div>
            </div>


            <LegacyProjects />
        </div>
    )
}


/*
            <div className="flex justify-around w-full items-center mt-30">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
                    {projects.map((project, index) => {
                        const links = Object.entries(project.links).map(([name, url]) => ({ name, url}));

                        return(

                            <div key={`${project}-${index}`}
                                className="bg-gray-600 p-2 rounded hover:scale-120 transition-transform duration-300 mx-auto"
                                onMouseEnter={() => setDescriptionHover(index as any)}
                                onMouseLeave={() => setDescriptionHover(null)}
                            >
                                <div

                                    className="w-90 h-50 relative overflow-hidden rounded"
                                >
                                    <Image 
                                        src={project.image}
                                        alt={`${project} diplay image`}
                                        className="object-cover"
                                        fill
                                        sizes="360px"
                              />
                                    {isDescriptionHover === index && (
                                        <SlideIn 
                                            className="absolute top-0 p-4 inline-flex flex-wrap w-full h-full bg-gray-900/70 text-set-white"
                                            direction="bottom"
                                        >
                                            <div className="text-2xl leading-4 text-justify">
                                                <span>{t(project.description)}</span>
                                                <br></br>
                                                <span>{t('projects.main-tech')}{project.tech}</span>
                                            </div>
                                            <div className="inline-flex gap-4 justify-center items-center w-full">
                                                {links.map((link, i) => (
                                                    <a
                                                        key={`${link.name}-${i}`}
                                                        href={`${project.id === 'lads-battles' && link.name === 'demo' ? `${link.url}${lang}` : link.url }`} // locale sensetive url
                                                        target="_blank"
                                                        rel="noopener noreferrer"

                                                    >
                                                        <Image 
                                                            src={`/images/icons/${link.name}.png`}
                                                            alt={`${link.name} icon`}
                                                            width={30}
                                                            height={30}
                                                            className="object-contain cursor-pointer"
                                                        />
                                                    </a>
                                                ))}
                                                    
                                            </div>

                                        </SlideIn>
                                    )}
                                </div>
                                <h4 className="relative text-center text-3xl text-set-white pt-2 bg-gray-600">{t(project.title)}</h4>
                            </div>
                    )})}
                </div>
            </div>
*/