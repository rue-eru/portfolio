import SectionIntro from "../SectionIntro";
import AboutPage from "./AboutPage";

export default function AboutSection(){
    const id = `about`

    return(
        <>
            <SectionIntro
                t1={`${id}.intro.t1`}
                t2={`${id}.intro.t2`}
                id={id}
            />
            <AboutPage />
        </>
    )
}