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
            className={styles.sectionWidth}
        >
            <SlideIn
                direction="top"
            >
                <h3 className={styles.h3}>{tPr('main-pr')}</h3>
            </SlideIn>

            <div className={styles.flexCenter}>
                <div className={`${styles.projectFlex} mt-30`}>
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
