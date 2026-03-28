import LangSwitch from "../components/LangSwitch";
import { styles } from "../utils/styles";

export default function Home() {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center front-page font-dongle">
      <main className="h-full ">

        <div className="lg:-mt-20 sm:mt-10 mt-55">
          <div className="uppercase lg:text-[250px] md:text-[190px] sm:text-[140px] text-[80px] flex justify-start flex-col">
            <h1 className="lg:-mt-20 md:-mt-10 sm:-mt-5 -mt-60">frontend &</h1>
            <h1 className="lg:-mt-50 md:-mt-30 sm:-mt-20 -mt-15">translation</h1>
          </div>

          <hr className={styles.divider}></hr>
          <div className="flex justify-start gap-5 w-60 mt-5">
            <h2 className="text-6xl">start</h2>
            <LangSwitch />
          </div>
        </div>
      </main>
    </div>
  );
}
