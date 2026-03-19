import CertCard from "@/app/components/CerificateSection/CertCard";
import CertNav from "@/app/components/CerificateSection/CertNav";
import {  type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function CertificatesPage({ params }: { params: Promise<{ locale: Locale }> }) {
    // Enable static rendering
    const { locale } = use(params);
    setRequestLocale(locale); //for server components

    return(
        <main className="w-full h-fit bg-set-black text-set-white">
            <CertNav />
            <section>
                <CertCard />
            </section>
        </main>
    )
}