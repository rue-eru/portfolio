import SectionIntro from "../SectionIntro";
import ProjectsPage from "./ProjectsPage";

export default function ProjectsSection () {
    const id = `projects`;

    return(
        <>
            <SectionIntro
                t1={`${id}.intro.t1`}
                t2={`${id}.intro.t2`}
                id={id}
            />
            <ProjectsPage />

        </>
    )
}