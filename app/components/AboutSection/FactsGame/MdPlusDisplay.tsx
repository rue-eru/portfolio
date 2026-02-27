import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import type { FactsGameProps } from "@/app/utils/interfaces";
import { styles } from "@/app/utils/styles";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function MdPlusDisplay ({
    showPrize, resetGame, currentFact, pullRandomFact, pulledFacts, totalFacts, gameComplete
}: FactsGameProps) {
      const t = useTranslations();
      const tGame = useTranslations("about.game-section")
      const {isEn, isJa} = useCurrentLanguage();

    return(
      <div id="game-console" className="md:block hidden border-2 w-full h- ">
          <div className={`${styles.flexCenter} mt-40`}>
              
              <div id="upper-part" 
                  className="absolute w-150 h-100 bg-fuchsia-100  bg- mx-auto 
                      border-2 border-pink-300 
                      rounded-tl-2xl rounded-tr-2xl
              ">
                  <div id="main-screen"
                    className="bg-purple-200 w-130 h-90 mt-3 mx-auto border-2 border-cyan-950/20 rounded x-50  overflow-y-auto
                      [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-purple-200
                    [&::-webkit-scrollbar-thumb]:bg-pink-300
                      [&::-webkit-scrollbar-thumb]:rounded"
                  >
                  <div id="progress-displayer" 
                    className={`flex flex-row justify-end gap-2 transition-all ${showPrize ? 'hidden' : "block"} ${styles.screenText}`}>
                    <Image 
                      src={`/images/icons/key.png`}
                      alt="key icon"
                      width={25}
                      height={25}
                      className={`object-contain pt-1 ${pulledFacts ? "animate-bounce duration-100": ""}`}
                      loading="lazy"
                    />
                    <span className="text-xl pr-4">{pulledFacts.length} / {totalFacts}</span>
                  </div>
                      {showPrize ? (
                        <div className={`text-center p-2 ${styles.screenText} z-10`}>
                          <h2 className="text-2xl font-bold text-pink-500 animate-bounce">{tGame('congrats')}</h2>
                          <Image 
                            src={`/images/icons/cat.jpg`}
                            alt="meet the dev"
                            width={200}
                            height={200}
                            loading="lazy"
                            className="object-cover mx-auto rounded-full"
                          />
                          <p className={`mt-2 mx-auto ${isJa ? "w-80": ""}`}>{tGame('hi')}</p>
                          <button 
                            onClick={resetGame}
                            className={`mt-4 bg-pink-600 hover:bg-pink-500 transition-colors px-4 py-2 h-fit rounded text-white text-sm ${styles.screenText}`}
                          >
                            {tGame('again')}
                          </button>
                        </div>
                      )  
                      
                      : (<p className={`text-justify px-4 text-wrap h-120 ${styles.screenText}
                        ${isEn ? "" : "text-lg "}
                      `}>{t(currentFact.description)}</p>)}

                    <div id="progression-bar" 
                        className={`w-126 absolute z-40 bg-purple-200/80 h-6 -mt-44 ${showPrize ? 'hidden' : "block"}`}>
                      <div className="w-96 h-2 ml-16 bg-gray-700 rounded-full mt-2 overflow-hidden border border-gray-400  transition-all">
                        <div 
                          className="h-full bg-linear-to-r from-sky-200 to-indigo-400  duration-300 z-50"
                          style={{ width: `${(pulledFacts.length / totalFacts) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                  </div>
              </div>
  
  
              <div id="bottom-part" className="-ml-180 mt-100">
                  <div
                      className="absolute w-178 
                          border-pink-200 rounded-2xl
                          border-b-170 border-r-70 border-l-70 
                          border-r-transparent border-l-transparent z-0
                      ">
                      <div className="bg-pink-300 w-176 h-10 absolute mt-40 -ml-16.5 -z-10 rounded"></div>
                      <p>Collected: {pulledFacts.length}/{totalFacts}</p>
                      <button onClick={pullRandomFact} disabled={gameComplete} >{gameComplete ? 'COMPLETE' : 'PULL'}</button>
                  </div>
              </div>
          </div>
      </div>
)}