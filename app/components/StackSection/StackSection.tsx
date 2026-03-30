import SectionIntro from "../SectionIntro";
import StackPage from "./StackPage";

export default function StackSection(){

    return(
        <section
            id="tech"
        >
            <SectionIntro
                t1="tech.intro.t1"
                t2="tech.intro.t2"
            />
            <StackPage />

        </section>
    )
}