'use client'
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import CertificatesData from "@/app/data/certificates.json"
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import { Link } from "@/i18n/navigation";

export default function CertNav () {
    const [menuOpen, setMenuOpen] = useState(false);
    const t = useTranslations('certificates');
    const CertData = CertificatesData;
    const {isEn} = useCurrentLanguage();

    return (
        <nav className="fixed top-0 w-full md:w-fit md:top-2 md:right-2 z-50 capitalize font-accent ">
            {/*md+ screens*/}
            {menuOpen ? (
                <div className="flex gap-5">
                    <div className={`flex flex-col items-end ${isEn ? "text-2xl" : ""}`}>
                        {Object.entries(CertData).map(([groupName, i]: [string, any]) => (
                            <a href={`#${groupName}`} key={`section-${groupName}-${i}`}
                                className="hover:bg-set-accent hover:text-set-black transition-all px-2">{groupName}</a>
                        ))}
                        <Link className="hover:bg-set-accent hover:text-set-black transition-all px-2" href="/certificates/all">all</Link>
                    </div>

                    <button
                        onClick={() => setMenuOpen(false)}
                        className="flex justify-start"
                    ><span className="text-4xl">⨯</span>
                    </button>
                </div>

            ) : (
                <button
                    onClick={() => setMenuOpen(true)}
                    className="hidden md:block"
                >
                    <Image 
                        src={`/images/icons/menu-burger.png`}
                        alt="menu icon"
                        width={30}
                        height={30}
                        loading="lazy"
                    />
                </button>
            )}

            {/*small screens*/}
            <div className={`w-full h-fit bg-set-black md:hidden ${isEn ? "text-2xl" : ""}`}>

                <div className="flex flex-wrap border justify-around">
                    {Object.entries(CertData).map(([groupName, i]: [string, any]) => (
                        <a href={`#${groupName}`} key={`section-${groupName}-${i}`}
                            className="hover:bg-set-accent hover:text-set-black transition-all px-2">{groupName}</a>
                    ))}
                    <Link href="/certificates/all">all</Link>
                </div>
            </div>

        </nav>
    )
}