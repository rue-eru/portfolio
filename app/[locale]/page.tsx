import LangSwitch from "../components/LangSwitch";
import { styles } from "../utils/styles";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center front-page">
      <main className=" h-full">

        <div className="-mt-20">
          <div className="uppercase text-[250px] flex justify-start flex-col">
            <h1 className="-mt-20">frontend &</h1>
            <h1 className="-mt-50">translation</h1>
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
