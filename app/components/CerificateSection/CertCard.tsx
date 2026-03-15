'use client'
import CertificatesData from "@/app/data/certificates.json"
import Image from "next/image";
import { useTranslations } from "next-intl";
import { styles } from "@/app/utils/styles";
import { useState } from "react";
import SlideIn from "../animations/SlideIn";

export default function CertCard () {
    const t = useTranslations('certificates');
    const CertData = CertificatesData;
    const [descriptionCover, setDescription] = useState<number | null>(null);

    return(
        <div>
            {Object.entries(CertData).map(([groupName, certs]: [string, any]) => (
                <div key={groupName} className="">
                    <SlideIn className={`${styles.flexCenter} h-dvh`} direction="right">
                        <h2 className="text-9xl font-bold mb-4 capitalize hover:bg-set-accent hover:text-set-black hover:p-5 transition-all">{groupName}</h2>
                    </SlideIn>

                    {certs.map((cert: any, i: number) => (
                        <div className="flex md:flex-row flex-col h-dvh" key={`${cert.id}-${i}`}>
                                <SlideIn 
                                    className="flex-1" 
                                    direction="right"
                                >
                                    <Image 
                                        src={cert.image}
                                        alt={cert.id}
                                        className="object-cover cursor-zoom-in h-full w-full"
                                        height={500}
                                        width={500}
                                    />
                                </SlideIn>
                            
                            <div 
                                className="flex-1"
                                onMouseEnter={() => setDescription(i)}
                                onMouseLeave={()=> setDescription(null)}
                            >
                                {descriptionCover === i && (
                                    <SlideIn className={`w-full h-full ${styles.flexCenter} flex-col text-justify p-12`}>
                                        <p className="text-5xl text-center font-semibold border-b-2 mb-4 pb-4">{t(cert.title)}</p>
                                        <p className="mt-2">{t(cert.description)}</p>
                                    </SlideIn>
                                )}

                                <SlideIn className="bg-set-accent w-full h-full text-set-black text-[200px] uppercase font-accent flex justify-center items-center text-nowrap"
                                    direction="left"
                                >
                                    <SlideIn direction="bottom" delay={1}>
                                        <p className="rotate-90 w-fit h-fit">{cert.preview}</p>
                                    </SlideIn>
                                </SlideIn>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

        </div>
    )
}