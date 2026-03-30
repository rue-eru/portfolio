import type { Locale } from "next-intl";
import FrontPage from "../../components/FrontSection/FrontPage";
import Nav from "../../components/FrontSection/Nav";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import ContactPage from "@/app/components/ContactSection/ContactPage";
import ProjectsSection from "@/app/components/ProjectsSection/ProjectsSection";
import StackSection from "@/app/components/StackSection/StackSection";
import AboutSection from "@/app/components/AboutSection/AboutSection";

export default function MainPage ({ params }: { params: Promise<{ locale: Locale }> }) {
    // Enable static rendering
    const { locale } = use(params);
    setRequestLocale(locale); //for server components

    return(
        <main className="w-full h-full font-accent overflow-x-hidden">
            <Nav />
            <FrontPage />
            <ProjectsSection />
            <StackSection />
            <AboutSection />
            <ContactPage />
        </main>
    )
}