'use client'

import { Link } from "@/i18n/navigation";
import ContactData from "@/app/data/contact.json"
import Image from "next/image";
import { styles } from "@/app/utils/styles";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import MarqueeBanner from "./MarqueeBanner";
import { useTranslations } from "next-intl";

export default function ContactPage () {
    const Socials = ContactData.socials
    const Others = ContactData.others
    const {isRu, isJa, isEn} = useCurrentLanguage();
    const t = useTranslations('contact')

    return(
        <section 
            id="contacts"
            className="min-h-dvh bg-set-black text-set-white flex flex-col gap-10 justify-center items-center"
        >

            <div className={`${styles.flexCenter} flex flex-col md:gap-2 sm:text-8xl text-6xl p-4
                ${isJa ? 'text-nowrap md:text-5xl sm:text-[2.5rem] text-xl' : 'md:flex-row'}
                ${isRu ? 'flex-wrap text-[2rem] sm:text-[4rem]' : ''}
            `}>
                <span className="text-nowrap">{t('interested')}</span>
                <div className={`flex  
                        ${isRu ? 'flex-row-reverse' : ''}
                        ${isJa ? 'gap-0' : 'gap-2'}
                    `}>
                    <span className={styles.pulseContrast}>{t('contrastContact')}</span>
                    <span>{t('me')}</span>
                </div>

            </div>

            <MarqueeBanner />

            <div className="flex flex-col gap-10 p-4 items-center justify-center">
                <div className="flex gap-5 md:flex-row flex-col">
                    {Socials.map((social, i) => (
                        <a 
                            key={`${social}-${i}`}
                            className={`${styles.linkStyles} flex flex-col`}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Contact via ${social.title}`}
                        >
                            <div className="flex flex-row gap-2">
                                <Image 
                                    src={social.icon}
                                    alt={`${social.id}-icon`}
                                    width={25}
                                    height={25}
                                    loading="lazy"
                                    className="object-contain"
                                />
                                <p className="font-dongle text-3xl mt-1">{social.title}</p>
                            </div>
                            <div className="-mt-4">{social.details}</div>
                        </a>
                    ))}
                </div>

                <div className={`flex pt-4
                        ${isJa ? 'flex-col-reverse sm:flex-row-reverse gap-0' : 'flex-col sm:flex-row gap-2'}
                        ${isEn ? 'text-2xl sm:text-3xl leading-4' : 'sm:text-xl text-base'}
                    `}>
                    <p className="text-nowrap">{t("check")}</p>
                    <div className={`flex sm:flex-nowrap flex-wrap  justify-center
                        ${isJa ? 'gap-0' : 'gap-2'}
                    `}>
                        {Others.map((other, i) => (
                            <div 
                                className={`flex ${isJa ? 'gap-0' : 'gap-2'} items-center`}
                                key={`${other}-${i}`}
                            >
                                <Link href={other.link}>
                                    <p className={`${styles.linkStyles} ${styles.pulseContrast}`}>
                                        {t(other.title)}
                                    </p>
                                </Link>
                                {/* show and separator if it's not the last item AND it exists */}
                                {i < Others.length - 1 && other.and && (
                                    <p>
                                        {isJa ? other.andJa : other.and}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </section>
    )
}