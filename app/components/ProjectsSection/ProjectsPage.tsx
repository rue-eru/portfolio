'use client'

import { useTranslations } from "next-intl";
import { useState } from "react";
import SlideIn from "../animations/SlideIn";
import projectsData from '@/app/data/projects.json';
import { styles } from "@/app/utils/styles";
import ProjectCard from "./ProjectCard";
import LegacyProjects from "./LegacyProjects";
import { Float } from "../animations/Float";


export default function ProjectsPage() {
    const tPr = useTranslations('projects');
    const [isDescriptionHover, setDescriptionHover] = useState<number | null>(null);
    const projects = projectsData.projects.featured;

    return(
        <div 
            className={styles.sectionWidth}
        >
            <SlideIn>
                <Float>
                    <h3 className={`${styles.h3} ${styles.containerShadow}`}>{tPr('main-pr')}</h3>
                </Float>
            </SlideIn>

            <SlideIn className={styles.flexCenter} delay={0.5} amount={0.1}>
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
            </SlideIn>

            <SlideIn delay={1}>
                <LegacyProjects />
            </SlideIn>
            
        </div>
    )
}
