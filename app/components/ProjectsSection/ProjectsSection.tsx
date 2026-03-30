import SectionIntro from "../SectionIntro";
import ProjectsPage from "./ProjectsPage";

export default function ProjectsSection () {

    return(
        <section
            id='projects'
        >
            <SectionIntro
                t1="projects.intro.t1"
                t2="projects.intro.t2"
            />
            <ProjectsPage />

        </section>
    )
}