'use client'

import CertificatesData from "@/app/data/certificates.json"
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import Image from "next/image";
import { Lightbox } from "./Lightbox";
import { useState } from "react";

export default function CertDisplayCard () {
    const CertData = CertificatesData;
    const {isEn} = useCurrentLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const allImages = Object.values(CertData).flatMap((certs: any) =>
      certs.flatMap((cert: any) =>
        cert.image.map((img: string, index: number) => ({
          certId: cert.id,
          cert,
          src: img,
          index
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
                <div key={groupName}>
                    <div className="flex w-full h-fit justify-center items-center gap-2">
                        <h2 className={`flex-1 ${isEn ? "text-2xl capitalize" : ""}`}>{groupName}</h2>
                        <div className="w-full h-0.5 bg-set-white"/>


                    </div >

                    <div className="flex gap-2">
                        {certs.map((cert: any) => 
                            cert.image.map((img: string, index: number) => {

                                console.log(img)

                                return(
                                <Image
                                    src={img}
                                    alt={cert.id}
                                    className="object-cover cursor-zoom-in hover:outline-2 hover:outline-set-accent transition-colors"
                                    height={100}
                                    width={100}
                                    loading="lazy"
                                    key={`${cert.id}-${index}`}
                                    onClick={() => {
                                        setCurrentIndex(currentIndex);
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
                    onClose={() => setCurrentIndex(0)}
                />
            )}
        </div>
    )
}