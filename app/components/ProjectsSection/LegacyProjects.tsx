'use client'

import projectsData from '@/app/data/projects.json';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import Image from 'next/image';
import { styles } from '@/app/utils/styles';
import { useCurrentLanguage } from '@/app/hooks/useCurrentLang';

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
    const {isEn} = useCurrentLanguage();

    return(
        <div className="text-center mt-20 space-y-4">

          <div className={styles.flexCenter}>
            <p className={`text-gray-400 w-94 md:w-full
              ${isEn ? 'text-2xl' : 'text-sm'}`}
            >
              {t('legacy-intro')}
            </p>
          </div>

          <div className="md:flex justify-center gap-4 flex-wrap md:flex-nowrap text-set-white w-full grid grid-cols-1">
            
            {entries.map(([courseName]) => {
              const titles = {
                'html-css': 'Responsive Web Design',
                'js': 'JavaScript Algorithms and Data Structures',
                'libraries': 'Front-End Libraries'
              };
              
              return(
              <div key={courseName}>
                <button
                  className="bg-gray-600 cursor-pointer inline-flex md:justify-center justify-start items-center gap-2 p-2 rounded transition-all w-94 md:w-full"
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
                  <span className={`${isEn ? 'text-xl' : 'text-sm'}`}>{titles[courseName]}</span>
                </button>
              </div>
            )})}
          </div>

          {activeProjects && (
            <div className='transition-all'>
              <p className={`${isEn ? 'text-2xl' : 'text-sm' } w-94 mx-auto md:w-full transition-all my-8`}>{t(`${openCourse}.description`)}</p>
                <div className={styles.flexCenter}>
                  <div  className={styles.projectFlex}>
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
            </div>

          )}
        </div>
    )
}