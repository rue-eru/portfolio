import type { Locale } from "next-intl";
import FrontPage from "../../components/FrontSection/FrontPage";
import Nav from "../../components/FrontSection/Nav";
import ProjectsPage from "../../components/ProjectsSection/ProjectsPage";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";

export default function MainPage ({ params }: { params: Promise<{ locale: Locale }> }) {
    // Enable static rendering
    const { locale } = use(params);
    setRequestLocale(locale); //for server components

    return(
        <>
            <Nav />
            <main className="w-full h-full">

                <FrontPage />
                <ProjectsPage />
            </main>
        </>
    )
}