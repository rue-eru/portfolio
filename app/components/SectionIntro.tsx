'use client'

import { styles } from "@/app/utils/styles";
import type { SectionIntroProps } from "../utils/interfaces";
import { useTranslations } from "next-intl";
import { useCurrentLanguage } from "../hooks/useCurrentLang";

export default function SectionIntro({t1, t2, id} : SectionIntroProps) {

    const t = useTranslations();
    const {isEn} = useCurrentLanguage();

    return(
        <div className="h-dvh w-full 
            bg-set-black text-set-white 
            flex justify-center items-center 
            font-accent -mt-4
            snap-start
            "
            id={id}
        >
            <div className={isEn ? 'text-6xl' : 'text-6xl'}>
                <p>{t(t1)}
                    <span className={styles.pulseContrast}> {t(t2)}</span>
                </p>
            </div>
        </div>
    )
}