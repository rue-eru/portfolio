import { styles } from "@/app/utils/styles";
import Bio from "./Bio/Bio";
import FactsGame from "./FactsGame/FactsGame";

export default function AboutPage () {

    return(
        <div className={styles.sectionWidth} id="about">
            <FactsGame />
            <Bio />
        </div>
    )
}