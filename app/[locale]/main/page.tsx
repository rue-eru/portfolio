import FrontPage from "../../components/FrontSection/FrontPage";
import Nav from "../../components/FrontSection/Nav";
import ContactPage from "@/app/components/ContactSection/ContactPage";
import ProjectsSection from "@/app/components/ProjectsSection/ProjectsSection";
import StackSection from "@/app/components/StackSection/StackSection";
import AboutSection from "@/app/components/AboutSection/AboutSection";

export default function MainPage () {

    return(
        <div className="relative">

            <Nav />

            <main className="w-full h-dvh font-accent 
                overflow-x-hidden overflow-y-scroll
                [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                bg-[url('/images/bg/131376-grey-and-white-polygon-pattern-abstract-background-vector-image.jpg')]
                bg-cover bg-center bg-no-repeat bg-fixed
                snap-y snap-mandatory 
            ">
                <FrontPage />
                <ProjectsSection />
                <StackSection />
                <AboutSection />
                <ContactPage />
            </main>

        </div>
    )
}

