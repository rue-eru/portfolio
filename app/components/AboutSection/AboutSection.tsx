import SectionIntro from "../SectionIntro";
import AboutPage from "./AboutPage";

export default function AboutSection(){

    return(
        <section
            id="about"
        >
            <SectionIntro
                t1="about.intro.t1"
                t2="about.intro.t2"
            />
            <AboutPage />
        </section>
    )
}