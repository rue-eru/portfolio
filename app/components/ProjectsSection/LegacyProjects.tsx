'use client'

import projectsData from '@/app/data/projects.json';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import Image from 'next/image';
import { styles } from '@/app/utils/styles';
import { useCurrentLanguage } from '@/app/hooks/useCurrentLang';
import { Float } from '../animations/Float';
import ExpandCollapse from '../animations/ExpandCollapse';

export default function LegacyProjects () {
    const legacyProjects = projectsData.projects.legacy;
    type CourseKey = keyof typeof legacyProjects;
    const [openCourse, setOpenCourse] = useState<CourseKey | null>(null);    
    const [isDescriptionHover, setDescriptionHover] = useState<number | null>(null);
    const t = useTranslations('projects');
    const activeProjects = openCourse
      ? legacyProjects[openCourse]
      : null;
    const entries = Object.entries(legacyProjects) as [CourseKey, typeof legacyProjects[CourseKey]][];
    const {isEn} = useCurrentLanguage();
    const [prevProjects, setPrevProjects] = useState<typeof activeProjects>(null);

    useEffect(() => {
      if (activeProjects) {
        setPrevProjects(activeProjects);
      }
    }, [activeProjects])

    return(
        <div className="text-center mt-10 space-y-4 mb-40">

          <div className={styles.flexCenter}>
            <p className={`${styles.blurBgText} xs:w-94 w-70 text-wrap md:w-fit 
              ${isEn ? 'text-2xl' : 'text-xl'}`}
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

              <Float key={courseName} >
                <button
                  className={` 
                    ${styles.projectsSectionBtn}
                    ${openCourse === courseName  ? styles.projectOpenBtn : ''}
                    ${styles.containerShadow}
                `}
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
              </Float>
            )})}
          </div>

          <div className={`relative ${openCourse ? "min-h-125" : ''}`}> 
            {activeProjects && (
              <div 
                key={openCourse}
              >
                <ExpandCollapse
                  componentKey={openCourse || undefined}
                  isOpen={!!activeProjects}
                >
                  <div className='transition-all'>
                    <p className={`${isEn ? 'text-2xl' : 'text-lg'} ${styles.blurBgText} xs:w-94 w-70 mx-auto md:w-full transition-all my-8`}>{t(`${openCourse}.description`)}</p>
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
                </ExpandCollapse>
              </div>

            )}

            {!activeProjects && prevProjects && (
              <div className='invisible absolute top-0 left-0 right-0' />
            )}
          </div>
        </div>
    )
}