'use client'

import projectsData from '@/app/data/projects.json';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import Image from 'next/image';
import { styles } from '@/app/utils/styles';

export default function LegacyProjects () {
    const legacyProjects = projectsData.projects.legacy;
    type CourseKey = keyof typeof legacyProjects;
    const [openCourse, setOpenCourse] = useState<CourseKey | null>(null);    
    const [isDescriptionHover, setDescriptionHover] = useState<number | null>(null);
    const t = useTranslations('projects');
    const activeProjects = openCourse
      ? legacyProjects[openCourse]
      : null;
    const entries = Object. entries(legacyProjects) as [CourseKey, typeof legacyProjects[CourseKey]][];

    return(
        <div className="text-center mt-20 space-y-4 relative">
          <p className="text-gray-400 text-2xl">
            {t('legacy-intro')}
          </p>

          <div className="flex justify-center gap-4 flex-wrap md:flex-nowrap text-set-white w-ful">
            
            {entries.map(([courseName]) => (
              <div key={courseName}>
                <button
                  className="bg-gray-600 cursor-pointer inline-flex justify-center items-center gap-2 p-2 rounded transition-all"
                  onClick={() => setOpenCourse(prev => prev === courseName ? null : courseName)}
                >
                  <Image 
                    src={`/images/icons/${courseName}.png`}
                    alt={courseName}
                    width={40}
                    height={40}
                    className='object-contain'
                    loading='lazy'
                  />
                  <span className='text-xl'>{t(`${courseName}.title`)}</span>
                </button>
              </div>
            ))}
          </div>

          {activeProjects && (
            <>
              <p className='text-2xl'>{t(`${openCourse}.description`)}</p>
                <div className={styles.projectFlex}>
                  <div  className={styles.projectGrid}>
                    {activeProjects.map((project, index) => (
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
            </>

          )}
        </div>
    )
}