'use client'

import { useCurrentLanguage } from "@/app/hooks/useCurrentLang"
import type { GithubDisplayProps } from "@/app/utils/interfaces"
import { useTranslations } from "next-intl";
import Image from "next/image"

export default function GithubDisplay({
    iconType,
    count,
    isHovered,
    setIsHovered,
    github,
    id,
    repo
}: GithubDisplayProps){

    const {isEn} = useCurrentLanguage();
    const t = useTranslations();

    return(
        <a 
            className={`
                flex items-center gap-0.5 flex-1 cursor-pointer w-fit
                ${isHovered === id && 'hover:text-set-accent'}
                ${isEn ? "text-lg" : "text-xs"}
            `}
            onMouseEnter={() => setIsHovered(id)}
            onMouseLeave={() => setIsHovered(null)}
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            title={t('projects.contributions.link_title.project', {project_repo: repo})}
        >
            <Image
                src={isHovered === id 
                    ? `/images/icons/${iconType}-accent.png` 
                    : `/images/icons/${iconType}.png`}
                alt={`project ${iconType} icon`}
                width={12}
                height={12}
                className='object-contain'
                loading='lazy'
            />
            <span className="pt-0.5">{count.toLocaleString()}</span>
        </a>
    )
}