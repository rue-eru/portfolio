import SectionIntro from "../SectionIntro";
import StackPage from "./StackPage";

export default function StackSection(){
    const id = `tech`

    return(
        <>
            <SectionIntro
                t1={`${id}.intro.t1`}
                t2={`${id}.intro.t2`}
                id={id}
            />
            <StackPage />

        </>
    )
}