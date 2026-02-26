// components/ProjectCard.tsx
'use client'

import Image from "next/image";
import SlideIn from "../animations/SlideIn";
import { useTranslations } from "next-intl";
import type { ProjectCardProps } from "@/app/utils/interfaces";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";

export default function ProjectCard({ project, index, isHovered, onHover }: ProjectCardProps) {
  const t = useTranslations();
  const linkItems = Object.entries(project.links).map(([name, url]) => ({ name, url }));
  const { lang, isEn } = useCurrentLanguage();
  const displayTitle = project.title.startsWith('projects.') 
    ? t(project.title) 
    : project.title;

  return (
    <div 
      className="bg-gray-600 p-2 rounded hover:scale-120 transition-transform duration-300"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="w-90 h-50 relative overflow-hidden rounded">
        <Image 
          src={project.image}
          alt={project.id}
          className="object-cover"
          fill
          sizes="360px"
          loading="lazy"
          unoptimized
        />
        
        {isHovered && (
          <SlideIn 
            className="absolute top-0 p-4 flex flex-col w-full h-full bg-gray-900/70 text-set-white text-justify"
            direction="bottom"
          >
            <div className={`${isEn ? 'text-2xl' : 'text-sm'} leading-4.5`}>
              <p>{t(project.description)}</p>
              <p className="">{t('projects.main-tech')}{project.tech}</p>
            </div>
            
            <div className="flex gap-4 justify-center items-center w-full mt-auto pt-2">
              {linkItems.map((link, i) => (
                <a
                  key={`${link.name}-${i}`}
                  href={`${project.id === 'lads-battles' && link.name === 'demo' ? `${link.url}${lang}` : link.url }`} // locale sensetive url
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image 
                    src={`/images/icons/${link.name}.png`}
                    alt={link.name}
                    width={24}
                    height={24}
                    className="object-contain"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </SlideIn>
        )}
      </div>
      
      <h4 className={`${isEn ? 'text-2xl' : 'text-base'} text-center  text-set-white pt-2 text-wrap  bg-gray-600 px-2`}>
        {displayTitle}
      </h4>
    </div>
  );
}