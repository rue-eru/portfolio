import CertClient from "@/app/components/CerificateSection/CertClient";
import {  type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function CertificatesPage({ params }: { params: Promise<{ locale: Locale }> }) {
    // Enable static rendering
    const { locale } = use(params);
    setRequestLocale(locale); //for server components

    return(
        <main className="w-full h-fit bg-set-black text-set-white font-accent overflow-x-hidden">
            <CertClient />
        </main>
    )
}