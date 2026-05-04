'use client'
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import CertificatesData from "@/app/data/certificates.json"
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import { Link } from "@/i18n/navigation";
import { styles } from "@/app/utils/styles";
import type { CertNavProps } from "@/app/utils/interfaces";


export default function CertNav ({activeGroup, setActiveGroup}: CertNavProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const t = useTranslations('certificates.nav');
    const CertData = CertificatesData;
    const {isEn} = useCurrentLanguage();
    const [onHover, setOnHover] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setMenuOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
        
    }, [])


    return (
        <nav className="fixed top-0 w-full lg:w-fit lg:top-2 lg:right-2 z-50 capitalize font-accent ">
            {/*lg+ screens*/}
            {menuOpen ? (
                <div className="flex gap-5">
                    <div className={`flex flex-col gap-1 items-end ${isEn ? "text-2xl" : ""}`}>
                        {Object.entries(CertData).map(([groupName, i]: [string, any]) => (
                            <a href={`#${groupName}`} 
                                key={`section-${groupName}-${i}`}
                                className={`${styles.navCert} rounded-2xl px-2`} >{t(groupName)}</a>
                        ))}
                        <Link className={`${styles.navCert} rounded-2xl px-2`} href="/certificates/all">{t('all')}</Link>
                        <Link className={`${styles.navCert} rounded-2xl px-2`} href="/main">{t('back')}</Link>
                    </div>

                    <button
                        onClick={() => setMenuOpen(false)}
                        className="flex justify-start"
                    ><span className={`text-2xl h-fit ${styles.navCert} rounded-full py-1 px-2.5 font-serif`}>⨯</span>
                    </button>
                </div>

            ) : (
                <button
                    onClick={() => setMenuOpen(true)}
                    onMouseEnter={() => setOnHover(true)}
                    onMouseLeave={() => setOnHover(false)}
                    className={`hidden lg:block rounded-full p-2 ${styles.navCert}`}
                >
                    <Image 
                        src={`${onHover ? '/images/icons/menu-burger-black.png' : '/images/icons/menu-burger-white.png'}`}
                        alt="menu icon"
                        width={30}
                        height={30}
                        loading="lazy"
                        className="object-contain"
                    />
                </button>
            )}

            {/*small screens*/}
            <div className={`w-full h-fit bg-set-black lg:hidden ${isEn ? "text-2xl" : ""}`}>

                <div className="flex flex-wrap justify-around">
                    {Object.entries(CertData).map(([groupName, i]: [string, any]) => (
                        <button 
                            key={`section-${groupName}-${i}`}
                            onClick={() => setActiveGroup(groupName)}
                            className={styles.smallBtnsCertNav}>{t(groupName)}</button>
                    ))}
                    <Link href="/certificates/all" className={styles.smallBtnsCertNav}>{t('all')}</Link>
                    <Link href="/main" className={styles.smallBtnsCertNav}>{t('back')}</Link>
                    
                </div>
            </div>

        </nav>
    )
}