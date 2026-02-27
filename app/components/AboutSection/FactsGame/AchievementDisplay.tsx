'use client'

import type { AchievementDisplayProps } from "@/app/utils/interfaces";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AchievementDisplay({currentAchievement}: AchievementDisplayProps) {
    const t = useTranslations();

    return(
        <div className="absolute right-4
            bg-linear-to-r from-sky-200 to-indigo-400 
            text-black font-bold py-3 px-6 rounded-lg
            shadow-2xl border-2 border-indigo-200
            animate-slide-in
            flex items-center gap-3
            z-50
        ">
            <Image 
                src={`/images/icons/medal.png`}
                alt="achievement icon"
                width={30}
                height={30}
                loading="lazy"
                className="object-contain"
            />
            <div>
                <div className="text-xs opacity-75">{t('about.game-section.achievement-unlocked')}</div>
                <div className="text-lg">{currentAchievement}</div>
            </div>

        </div>
    )
}