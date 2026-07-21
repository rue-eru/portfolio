'use client '

import type { GitHubStatsProps, RepoData, } from "@/app/utils/interfaces";
import { useEffect, useState } from "react";
import GithubDisplay from "./GithubDisplay";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function GitHubStats ({
    owner, 
    repo,
    github,
    id,
    prLink,
    isStarHovered,
    setIsStarHovered,
    isForkHovered,
    setIsForkHovered,
    isPrHovered,
    setIsPrHovered
}: GitHubStatsProps) {
    const [data, setData] = useState<RepoData | null>(null);
    const [error, setError] = useState(false);
    const t = useTranslations();

    useEffect(() => {
        async function  fetchRepoData() {
            try {
                const response = await fetch (
                    `https://api.github.com/repos/${owner}/${repo}`
                )
                if (!response.ok) throw new Error('Failed to fetch')
                const json = await response.json();
                setData({
                    stars: json.stargazers_count || 0,
                    forks: json.forks_count || 0
                });
            } catch {
                setError(true)
            }
        }
        fetchRepoData();
    }, [owner, repo])

    if (error) return <span className="sm:w-[20%] flex justify-center">?</span>
    if (!data) return <span className="animate-pulse sm:w-[20%] flex justify-center">...</span>
    
    return (
        <div className="flex gap-1 justify-end-safe
            h-full lg:min-w-[15%] sm:min-w-[20%] max:w-[45%]
        ">

            <GithubDisplay
                iconType="star"
                count={data.stars}
                isHovered={isStarHovered}
                setIsHovered={setIsStarHovered}
                github={github}
                id={`${id}-star`}
                repo={repo}
            />

            <GithubDisplay 
                iconType="fork"
                count={data.forks}
                isHovered={isForkHovered}
                setIsHovered={setIsForkHovered}
                github={github}
                id={`${id}-fork`}
                repo={repo}
            />

        
            {prLink && (
                <a
                    className="flex items-center justify-center gap-2 cursor-pointer"
                    onMouseEnter={() => setIsPrHovered?.(id)}
                    onMouseLeave={() => setIsPrHovered?.(null)}
                    href={prLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t('projects.contributions.link_title.my_pr', {project_repo: repo})}
                >
                    <Image 
                        src={isPrHovered === id 
                            ? `/images/icons/pr-accent.png` 
                            : `/images/icons/pr.png`}
                        alt="project pr icon"
                        width={12}
                        height={12}
                        className='object-contain'
                        loading='lazy'
                    />
                </a>

            )}

        
            
        </div>
    )
}

