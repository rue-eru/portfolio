import CertClient from "@/app/components/CerificateSection/CertClient";
import CreditFooter from "@/app/components/CreditFooter";
import type { Metadata } from "next";
import {  type Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('layout.metadata.certpage');
    return {
        title: t('title'),
        description: t('description'),
    };
};

export default function CertificatesPage({ params }: { params: Promise<{ locale: Locale }> }) {
    // Enable static rendering
    const { locale } = use(params);
    setRequestLocale(locale); //for server components

    return(
        <main className="w-full h-fit bg-set-black text-set-white font-accent overflow-x-hidden">
            <CertClient />
            <CreditFooter />
        </main>
    )
}