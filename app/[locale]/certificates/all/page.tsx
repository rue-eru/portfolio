import AllNav from "@/app/components/CerificateSection/AllNav";
import CertDisplayCard from "@/app/components/CerificateSection/CertDisplayCard";
import CreditFooter from "@/app/components/CreditFooter";

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