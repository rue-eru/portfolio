'use client'

import { Link } from "@/i18n/navigation";
import ContactData from "@/app/data/contact.json"
import Image from "next/image";
import { styles } from "@/app/utils/styles";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import MarqueeBanner from "./MarqueeBanner";

export default function ContactPage () {
    const Socials = ContactData.socials
    const Others = ContactData.others
    const {isEn} = useCurrentLanguage();

    return(
        <section 
            id="contacts"
            className="min-h-dvh bg-set-black text-set-white flex flex-col gap-10 justify-center items-center"
        >

            <div className={`${styles.flexCenter} flex flex-col md:flex-row md:gap-2 text-5xl p-4`}>
                <span>Got interested?</span>
                <div className="flex gap-2">
                    <span className="inline-block font-bold animate-pulse
      bg-linear-to-r from-lime-200 to-lime-600
      bg-clip-text text-transparent">Contact</span>
                    <span>me!</span>
                </div>

            </div>

            <MarqueeBanner />

            <div className="flex flex-col gap-10 p-4">
                <div className="flex gap-5 md:flex-row flex-col">
                    {Socials.map((social, i) => (
                        <a 
                            key={`${social}-${i}`}
                            className={`${styles.linkStyles} flex flex-col`}
                            href={social.link}
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

                <div className="flex gap-2 text-xl">
                    <p className="">You may also check my</p>
                    <div className=" flex sm:flex-nowrap flex-wrap gap-2 justify-center">
                        {Others.map((other, i) => (
                            <div className="flex gap-2">
                                <Link
                                    key={`${other}-${i}`}
                                    href={other.link}

                                >
                                    <p className={styles.linkStyles}>{other.title}</p>

                                </Link>
                                <p>{other.and}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

        </section>
    )
}