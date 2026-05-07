'use client'

import { useTranslations } from "next-intl";
import { useCurrentLanguage } from "../hooks/useCurrentLang"
export default function CreditFooter () {
    const { isEn } = useCurrentLanguage();
    const t = useTranslations('layout.footer')

    const link = 
        <a 
            className="cursor-pointer hover:text-set-accent"
            href="https://github.com/rue-eru"
            target="_blank"
            rel="noopener noreferrer"
        > L</a> 
    ;

    return (

        <footer
            className={`text-font-accent text-set-white/60 text-center
                flex flex-col 
                ${isEn ? 'text-2xl' : 'text-base'}
            `}
        >
                <p className={isEn ? '-mb-3' : ''}>
                    © {new Date().getFullYear()}
                    {link}
                    {isEn ? " · " : "・"}
                    {t('built')}
                </p>
                <p>
                    {t('by')}
                    {isEn ? '' : link}
                </p>
        </footer>
        
    )
}