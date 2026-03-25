'use client'

import CertificatesData from "@/app/data/certificates.json"
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import Image from "next/image";
import { Lightbox } from "./Lightbox";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function CertDisplayCard () {
    const CertData = CertificatesData;
    const {isEn} = useCurrentLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('certificates.nav')

    const allImages = Object.values(CertData).flatMap((certs: any) =>
      certs.flatMap((cert: any) =>
        cert.image.map((img: string, index: number) => ({
          certId: cert.id,
          cert,
          src: img,
          index,
          screen: cert.screen,
        }))
      )
    )

    const imageToGlobalIndex = new Map<string, number>();

    allImages.forEach((item, i) => {
      imageToGlobalIndex.set(`${item.certId}-${item.index}`, i);
    });

    return(
        <div>
            {Object.entries(CertData).map(([groupName, certs]: [string, any]) => (
                <div key={groupName} className="flex flex-col gap-4">
                    <div className="flex w-full h-fit justify-center items-center gap-2 mt-4">
                        <h2 className={`flex-1 text-nowrap ${isEn ? "text-2xl capitalize" : ""}`}>{t(groupName)}</h2>
                        <div className="w-full h-0.5 bg-set-white"/>


                    </div >

                    <div className="flex flex-wrap gap-2">
                        {certs.map((cert: any) => 
                            cert.image.map((img: string, index: number) => {

                                console.log(img)

                                return(
                                <Image
                                    src={img}
                                    alt={cert.id}
                                    className="object-cover cursor-zoom-in hover:outline-2 hover:outline-set-accent transition-colors"
                                    height={150}
                                    width={150}
                                    loading="lazy"
                                    key={`${cert.id}-${index}`}
                                    onClick={() => {
                                        const globalIndex = imageToGlobalIndex.get(`${cert.id}-${index}`)!;
                                        setCurrentIndex(globalIndex);
                                        setIsOpen(true);
                                    }}
                                />                                
                            )
                        })

                        )}
                    </div>

                </div>
            ))}

            {isOpen && (
                <Lightbox
                    images={allImages}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </div>
    )
}