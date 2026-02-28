'ise client'

import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import type { FactsGameProps } from "@/app/utils/interfaces";
import { styles } from "@/app/utils/styles";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function MdPlusDisplay ({
    showPrize, resetGame, currentFact, pullRandomFact, pulledFacts, totalFacts, gameComplete
}: FactsGameProps) {
      const t = useTranslations();
      const tGame = useTranslations("about.game-section")
      const {isEn, isJa, isRu} = useCurrentLanguage();
        const [startScreen, setStartScreen] = useState(true);


    return(
      <div id="game-console" className="md:block hidden w-full h-full ">
          <div className={`${styles.flexCenter} mt-40`}>
              
              <div id="upper-part" 
                  className="absolute w-150 h-100 bg-fuchsia-100  bg- mx-auto 
                      border-2 border-pink-300 
                      rounded-tl-2xl rounded-tr-2xl
              ">
                  <div id="main-screen"
                    className={`bg-purple-200 w-130 h-90 mt-3 mx-auto border-2 border-cyan-950/20 rounded x-50  overflow-y-auto
                      [&::-webkit-scrollbar]:w-1.5
                    [&::-webkit-scrollbar-track]:bg-purple-200
                    [&::-webkit-scrollbar-thumb]:bg-pink-300
                      [&::-webkit-scrollbar-thumb]:rounded `}
                  >
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

                      </div>
                    )}
                    <div className={`${startScreen ? "hidden" : "block"}`}>

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
                            <div className={`text-center pt-8 ${styles.screenText} z-10`}>
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
                            </div>
                          )  

                          : 
                          
                          (<p className={`text-justify px-4 text-wrap h-120 ${styles.screenText}
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
                </div>
  
  
              <div id="bottom-part" className="mt-143
                  absolute w-fit h-fit 
              ">
                  <div
                      className="w-184
                          border-fuchsia-100
                          border-b-170 border-r-70 border-l-70 
                          border-r-transparent border-l-transparent"
                  />

                  <div className="flex w-150 h-25 ml-16 absolute -mt-35 ">

                      <div className={`flex-1 gap-2 rotate-4 ${styles.flexCenter}`}>
                          {/* Directional Pad */}
                          <div className="grid grid-cols-3 gap-0.5 w-24 h-24">
                              <div></div>
                              <div className="bg-fuchsia-200 rounded-t-lg border-2 border-gray-300 shadow-inner"></div>
                              <div></div>
                              <div className="bg-fuchsia-200 rounded-l-lg border-2 border-gray-300 shadow-inner"></div>
                              <div className="bg-fuchsia-200 rounded-sm border-2 border-gray-300 shadow-md"></div>
                              <div className="bg-fuchsia-200 rounded-r-lg border-2 border-gray-300 shadow-inner"></div>
                              <div></div>
                              <div className="bg-fuchsia-200 rounded-b-lg border-2 border-gray-300 shadow-inner"></div>
                              <div></div>
                          </div>
                      </div>

                      {/*small screen*/}
                      <div className={`flex-2 ${styles.flexCenter}`}>
                        <div className="bg-transparent w-60 h-20
                          border-purple-200 border-b-80 border-l-20 border-r-20
                          border-r-transparent border-l-transparent
                        "/>
                      </div>

                      {/*MAIN FUNCTIONAL BTN*/}
                      <div className={`flex-1 rotate-355 ${styles.flexCenter} ${isEn ? 'text-4xl leading-5' : 'text-base font-bold'}`}>
                      {startScreen ? (
                      <button 
                        onClick={() => setStartScreen(false)}
                        className={`${styles.gameMainBtn}`}>
                          {tGame('start')}
                      </button>
                      ) :(
                        <>
                      {showPrize ? (
                      <button 
                        onClick={resetGame}
                        className={`${styles.gameMainBtn}`}>
                          {tGame('again')}
                      </button>
                      ) : (
                      <button 
                        onClick={pullRandomFact} disabled={gameComplete} 
                        className={`${styles.gameMainBtn}`}>
                          {tGame('pull')}
                      </button>
                      )}
                        </>
                      )}
                      </div>
                  </div>
                      
                  <div className="bg-fuchsia-200 w-184 h-10 absolute rounded"></div>
              </div>
          </div>
      </div>
)}