'use client'

import projectsData from '@/app/data/projects.json';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import Image from 'next/image';

export default function LegacyProjects () {
    const legacyProjects = projectsData.projects.legacy;
    const [openCourse, setOpenCourse] = useState<string | null>(null);    
    const [isDescriptionHover, setDescriptionHover] = useState<number | null>(null);
    const t = useTranslations('projects');

    return(
        <div className="text-center mt-20 space-y-4 relative">
          <p className="text-gray-400 text-2xl">
            {t('legacy-intro')}
          </p>

          <div className="flex justify-center gap-4 flex-wrap md:flex-nowrap text-set-white w-full border-2 border-amber-500">
            
            {Object.entries(legacyProjects).map(([courseName, courseProjects]) => (
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
                  />
                  <span className='text-xl'>{t(`${courseName}.title`)}</span>
                </button>
            
                {openCourse === courseName && (
                  <div className='mt-10 text-set-black'>
                    <p>{t(`${courseName}.description`)}</p>
                    <div
                      className='grid md:grid-cols-2 grid-cols-1 gap-10'
                    >
                      {courseProjects.map((project, index) => (
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
                )}
              </div>
            ))}
            
          </div>
        </div>
    )
}