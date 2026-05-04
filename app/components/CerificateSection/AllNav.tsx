'use client'

import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import { styles } from "@/app/utils/styles";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function AllNav () {
    const t = useTranslations('certificates.nav');
    const { isEn } = useCurrentLanguage();
    
    return(
        <nav className={`fixed top-0 w-full lg:w-fit lg:top-2 lg:right-2 z-50 capitalize font-accent pt-1 -ml-2 flex gap-1 ${isEn ? "text-2xl" : ""}`}>
            <Link className={`${styles.navCert} rounded-2xl px-2`} href="/certificates">{t('back-cert')}</Link>
            <Link className={`${styles.navCert} rounded-2xl px-2`} href="/main">{t('back-main')}</Link>
        </nav>
    )
}