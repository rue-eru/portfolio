'use client'

import type { FactsGameProps } from "@/app/utils/interfaces";
import { styles } from "@/app/utils/styles";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";

export default function SmallDisplay ({
    showPrize, resetGame, currentFact, pullRandomFact, pulledFacts, totalFacts, gameComplete, photo
}: FactsGameProps) {
      const t = useTranslations();
      const tGame = useTranslations("about.game-section")
      const {isEn, isJa} = useCurrentLanguage();
      const [startScreen, setStartScreen] = useState(true);
      const btnStyles = isEn ? styles.gamePhoneBtnsEN : styles.gamePhoneBtns

    return(
        <div id="smart-phone" className={`block md:hidden ${styles.flexCenter}`}>

            <div className={`bg-fuchsia-200 w-78 h-150
                border-10 rounded-2xl border-purple-300
                ${styles.flexCenter} 
            `}>
                <div className={`w-70 h-140 ${styles.overflowScreen} [&::-webkit-scrollbar-thumb]:bg-fuchsia-300/40
                `}>
                        <div className="bg-purple-400/70 rounded-full w-3 h-3 border-4 border-purple-300 absolute ml-34" />

                    {startScreen && (
                      <div 
                        className={`h-full ${styles.flexCenter} flex-col gap-10`}
                      >
                        <Image 
                          src={`/images/icons/slot-machine.gif`}
                          alt="slot machine animation"
                          width={150}
                          height={150}
                          loading="lazy"
                          className="object-contain"
                        />
                        <button
                            onClick={() => setStartScreen(false)}
                            className={btnStyles}
                        >{tGame('start')}</button>
                      </div>
                    )}

                    <div className={`${startScreen ? "hidden" : "block"}`}>

                      <div id="progress-displayer" 
                        className={`${styles.startScreenContainer} ${showPrize ? 'hidden' : "block"} ${styles.screenText}`}>
                        <Image 
                          src={`/images/icons/key.png`}
                          alt="key icon"
                          width={25}
                          height={25}
                          className={`object-contain pt-1 ${pulledFacts ? "animate-bounce duration-100": ""}`}
                          loading="lazy"
                        />
                        <span className={`${isEn ? `text-2xl` : `text-base`} pr-4`}>{pulledFacts.length} / {totalFacts}</span>
                      </div>

                          {showPrize ? (
                            <div className={`text-center pt-10 flex flex-col gap-y-4 justify-center items-center ${styles.screenText} z-10`}>
                              <h2 className={`${isEn ? 'text-4xl tracking-wide' : 'text-2xl'} font-bold text-pink-500 animate-bounce`}>{tGame('congrats')}</h2>
                              <Image 
                                src={photo}
                                alt="meet the dev"
                                width={200}
                                height={200}
                                loading="lazy"
                                className="object-cover mx-auto rounded-full"
                              />
                              <p className={`mt-2 mx-auto ${isJa ? "p-4": "text-2xl"}`}>{tGame('hi')}</p>
                                <button 
                                  onClick={resetGame}
                                  className={`${btnStyles} w-fit`}>
                                    {tGame('again')}
                                </button>
                            </div>
                          )  

                          : 
                          
                          (<p className={`text-justify px-2 text-wrap h-160 leading-7 ${styles.screenText}
                            ${isEn ? "text-2xl" : "text-sm"}
                          `}>{t(currentFact.description)}</p>)}

                        <div id="progression-bar-pull-btn" 
                            className={`w-70 -mt-35 ${styles.progressBarBG} ${showPrize ? 'hidden' : "block"} flex justify-center items-center gap-2`}>
                            <div className={`w-45 h-2 ${styles.progressBarBorder}`}>
                                <div 
                                  className={styles.progressBarColors}
                                  style={{ width: `${(pulledFacts.length / totalFacts) * 100}%` }}/>
                            </div>
                            <button 
                              onClick={pullRandomFact} disabled={gameComplete} 
                              className={`${btnStyles}`}>
                                {tGame('pull')}
                            </button>
                        </div>
                          
                      </div>
                </div>
            </div>
        </div>
    )
}