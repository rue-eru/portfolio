import { styles } from "@/app/utils/styles";
import { useTranslations } from "next-intl"
import techData from "@/app/data/tech.json"
import ListCard from "./ListCard";
import Image from "next/image";

export default function StackPage () {
    const tTech = useTranslations('tech');
    const t = useTranslations();
    const stackData = techData.stack;
    const l10nData = techData.l10n;
    
    return (
        <div 
            id="tech"
            className={`${styles.sectionWidth} flex flex-col`}
        >

            <div className="flex justify-start">
                <div className={`${styles.toolDiv}`}>
                <h1 className={`${styles.h1}`}>{tTech('stack-title')}</h1>
                        <ul className={styles.ulLiFlex}>
                            {stackData.map((tool, index) => {
                                const isNextIntl = tool.id === 'next-intl';
                                return(
                                <ListCard
                                    key={`${tool.id}-${index}`}
                                    tool={tool}
                                    index={index}
                                    imgClassName={`${isNextIntl? 'w-20' : 'w-10'}`}
                                    hideTitle={isNextIntl}
                                />
                            )})}
                        </ul>
                </div>
            </div>

            <div className="flex justify-end">
                <div className={`${styles.toolDiv}`}>
                    <h1 className={`${styles.h1}`}>{tTech('l10n-title')}</h1>
                    <ul className={styles.ulLiFlex}>
                        {l10nData.tools.map((tool, index) => (
                            <ListCard 
                                key={`${tool.id}-${index}`}
                                tool={tool}
                                index={index}
                                imgClassName="w-10"
                            />
                        ))}
                    </ul>
                    <div className=" flex flex-col gap-1 mt-1">
                        {l10nData.languages.map((lang, index) => (
                            <div
                                key={`${lang}-${index}`}
                                className={styles.liStyle}
                            >
                                <Image 
                                    src={lang.icon}
                                    alt={lang.id}
                                    className="object-cover w-7 h-7"
                                    width={20}
                                    height={20}
                                    loading="lazy"
                                />
                                <div>
                                    <span>{t(lang.level)}</span>
                                    <span> • </span>
                                    <span>{t(lang.description)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

