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
    const [imageIndex, setImageIndex] = useState<Record<string, number>>({});
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
                                    className="flex-1 relative" 
                                    direction="right"
                                >
                                    <Image 
                                        src={cert.image[imageIndex[cert.id] ?? 0]}
                                        alt={cert.id}
                                        className="object-cover cursor-zoom-in h-full w-full"
                                        height={500}
                                        width={500}
                                    />
                                    {cert.image.length > 1 && (<>
                                        <button
                                            className="absolute top-1/2 right-0"
                                            onClick={() => 
                                                setImageIndex((prev) => {
                                                    const current = prev[cert.id] ?? 0
                                                    const next = 
                                                        current === cert.image.length - 1
                                                            ? 0 
                                                            : current + 1
                                                    return {...prev, [cert.id]: next}
                                            })
                                            }
                                        >
                                            <Image 
                                                src={`/images/icons/next-arrow.png`}
                                                alt="sliding arrow image"
                                                className="object-contain opacity-50 hover:opacity-100 transition-opacity"
                                                height={50}
                                                width={50}
                                            />
                                        </button>
                                        <button
                                            className="absolute top-1/2 left-0"
                                            onClick={() => 
                                                setImageIndex((prev) => {
                                                    const current = prev[cert.id] ?? 0
                                                    const next = 
                                                        current === 0
                                                            ? cert.image.length - 1
                                                            : current - 1
                                                    return {...prev, [cert.id]: next}
                                                })
                                            }
                                        >
                                            <Image 
                                                src={`/images/icons/back-arrow.png`}
                                                alt="sliding back arrow image"
                                                className="object-contain opacity-50 hover:opacity-100 transition-opacity"
                                                height={50}
                                                width={50}
                                            />
                                        </button>
                                    </>
                                    )}
                                </SlideIn>
                            
                            <div 
                                className="flex-1 relative"
                                onMouseEnter={() => setDescription(cert.id)}
                                onMouseLeave={()=> setDescription(null)}
                            >
                                {descriptionCover === cert.id && (
                                    <SlideIn className={`w-full h-full ${styles.flexCenter} flex-col text-justify p-12 absolute top-0 z-50 bg-set-black`}>
                                        <p className="text-5xl text-center font-semibold border-b-2 mb-4 pb-4">{t(cert.title)}</p>
                                        <p className="mt-2">{t(cert.description)}</p>
                                    </SlideIn>
                                )}

                                <SlideIn className="bg-set-accent w-full h-full text-set-black text-[150px] uppercase font-accent flex justify-center items-center text-nowrap z-0"
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