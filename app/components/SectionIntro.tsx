'use client'

import { styles } from "@/app/utils/styles";
import type { SectionIntroProps } from "../utils/interfaces";
import { useTranslations } from "next-intl";

export default function SectionIntro({t1, t2} : SectionIntroProps) {

    const t = useTranslations();

    return(
        <div className="h-dvh w-full bg-set-black text-set-white flex justify-center items-center font-accent -mt-4">
            <div className="text-5xl">
                <p>{t(t1)}
                    <span className={styles.pulseContrast}> {t(t2)}</span>
                </p>
                
            </div>
        </div>
    )
}