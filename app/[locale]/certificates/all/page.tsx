import AllNav from "@/app/components/CerificateSection/AllNav";
import CertDisplayCard from "@/app/components/CerificateSection/CertDisplayCard";
import CreditFooter from "@/app/components/CreditFooter";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('layout.metadata.allcertpage');
    return {
        title: t('title'),
        description: t('description'),
    };
};

export default function CertDisplayAll () {

    return (
        <section className="bg-set-black w-full h-fit min-h-dvh text-set-white font-accent">
            <div className="p-4">
                <AllNav />
                <CertDisplayCard />
            </div>
            <CreditFooter />
        </section>
    )
}