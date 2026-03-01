import type { Locale } from "next-intl";
import FrontPage from "../../components/FrontSection/FrontPage";
import Nav from "../../components/FrontSection/Nav";
import ProjectsPage from "../../components/ProjectsSection/ProjectsPage";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import StackPage from "@/app/components/StackSection/StackPage";
import AboutPage from "@/app/components/AboutSection/AboutPage";

export default function MainPage ({ params }: { params: Promise<{ locale: Locale }> }) {
    // Enable static rendering
    const { locale } = use(params);
    setRequestLocale(locale); //for server components

    return(
        <>
            <main className="w-full h-full font-accent">
                <Nav />
                <FrontPage />
                <ProjectsPage />
                <StackPage />
                <AboutPage />
            </main>
        </>
    )
}