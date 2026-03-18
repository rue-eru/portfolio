'use client'
import CertificatesData from "@/app/data/certificates.json"
import Image from "next/image";
import { useTranslations } from "next-intl";
import { styles } from "@/app/utils/styles";
import { useState } from "react";
import SlideIn from "../animations/SlideIn";
import { Lightbox } from "./Lightbox";
import ImageArrows from "./ImageArrows";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";

export default function CertCard () {
    const {isEn} = useCurrentLanguage();
    const t = useTranslations('certificates');
    const CertData = CertificatesData;
    const [descriptionCover, setDescription] = useState<number | null>(null);
    const [imageIndex, setImageIndex] = useState<Record<string, number>>({});
    const [openImage, setOpenImage] = useState<{
        cert: any
    } | null>(null);
    const [expandedDetails, setExpandedDetails] = useState<number | null>(null);


    return(
        <div>
            {Object.entries(CertData).map(([groupName, certs]: [string, any]) => (
                <div key={groupName} id={groupName}>
                    <SlideIn className={`h-dvh hidden md:flex justify-center items-center `} direction="right">
                        <h2 className={`md:text-9xl text-4xl font-bold mb-4 capitalize ${styles.accentHeader}`}>{groupName}</h2>
                    </SlideIn>

                    {certs.map((cert: any, i: number) => (
                        <div className="flex md:flex-row flex-col md:h-dvh" key={`${cert.id}-${i}`}>
                                <SlideIn 
                                    className="md:flex-1 relative" 
                                    direction="right"
                                >
                                    <Image 
                                        src={cert.image[imageIndex[cert.id] ?? 0]}
                                        alt={cert.id}
                                        className="object-cover cursor-zoom-in h-full w-full"
                                        height={500}
                                        width={500}
                                        loading="lazy"
                                        onClick={() => 
                                            setOpenImage({
                                                cert
                                            })
                                        }
                                    />

                                    <ImageArrows 
                                        setImageIndex={setImageIndex}
                                        className="top-1/2 bg-set-black/50 rounded-2xl p-0.5"
                                        cert={cert}
                                    />
                                </SlideIn>
                            
                            <div 
                                className="md:flex-1 relative"
                                onMouseEnter={() => setDescription(cert.id)}
                                onMouseLeave={()=> setDescription(null)}
                            >
                                {descriptionCover === cert.id && (
                                    <SlideIn className={`hidden md:block w-full h-full ${styles.flexCenter} flex-col text-justify p-12 absolute top-0 z-50 bg-set-black`}>
                                        <h2 className={`text-5xl text-center font-semibold border-b-2 mb-4 p-5 ${styles.accentHeader}`}>{t(cert.title)}</h2>
                                        <p className="mt-2">{t(cert.description)}</p>
                                    </SlideIn>
                                )}

                                <SlideIn className="hidden bg-set-accent w-full h-full text-set-black lg:text-[150px] md:text-[100px] text-6xl uppercase font-accent md:flex justify-center items-center text-nowrap z-0"
                                    direction="left"
                                >
                                    <SlideIn direction="bottom" delay={1}>
                                        <p className="rotate-90 w-fit h-fit">{cert.preview}</p>
                                    </SlideIn>
                                </SlideIn>

                                <SlideIn className="md:hidden p-4">
                                    <details 
                                        className={`font-accent ${isEn ? "text-2xl" : "text-base"}`}
                                        onClick={() => setExpandedDetails(cert.id)}
                                    >
                                        <summary className={`text-center font-semibold ${expandedDetails === cert.id ? "bg-set-accent text-set-black" : ""}`}>{t(cert.title)}</summary>
                                        <p className="text-justify mt-4">{t(cert.description)}</p>
                                    </details>
                                </SlideIn>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

            {openImage && (
                <Lightbox
                    cert={openImage.cert}
                    imageIndex={imageIndex}
                    setImageIndex={setImageIndex}
                    onClose={() => setOpenImage(null)}
                />
            )}

        </div>
    )
}