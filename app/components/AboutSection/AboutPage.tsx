import Bio from "./Bio/Bio";
import FactsGame from "./FactsGame/FactsGame";

export default function AboutPage () {

    return(
        <div className="font-accent w-full h-auto relative">
            <FactsGame />
            <div className="bg-set-black">
                <Bio />
            </div>
        </div>
    )
}