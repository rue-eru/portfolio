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

            <div className="flex flex-col">
                <p className="flex-1">You may also check</p>
                <div className="flex-1 flex gap-2.5 justify-center">
                    {Others.map((other, i) => (
                        <Link
                            key={`${other}-${i}`}
                            href={other.link}
                            className={styles.linkStyles}
                        >
                            <p>{other.title}</p>
                        </Link>
                    ))}
                </div>
            </div>

            <MarqueeBanner />

            <div className="flex gap-5">
                {Socials.map((social, i) => (
                    <a 
                        key={`${social}-${i}`}
                        className={styles.linkStyles}
                        href={social.link}
                    >
                        <Image 
                            src={social.icon}
                            alt={`${social.id}-icon`}
                            width={25}
                            height={25}
                            loading="lazy"
                            className="object-contain"
                        />
                        <p className="font-dongle text-3xl mt-1">{social.title}</p>
                    </a>
                ))}
            </div>

        </section>
    )
}