import AllNav from "@/app/components/CerificateSection/AllNav";
import CertDisplayCard from "@/app/components/CerificateSection/CertDisplayCard";

export default function CertDisplayAll () {

    return (
        <section className="bg-set-black w-full h-fit min-h-dvh text-set-white font-accent p-4">
            <AllNav />
            <CertDisplayCard />
        </section>
    )
}