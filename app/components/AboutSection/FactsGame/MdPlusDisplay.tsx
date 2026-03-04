import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";
import type { FactsGameProps } from "@/app/utils/interfaces";
import { styles } from "@/app/utils/styles";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function MdPlusDisplay ({
    showPrize, resetGame, currentFact, pullRandomFact, pulledFacts, totalFacts, gameComplete, photo, startScreen, setStartScreen, keyJump
}: FactsGameProps) {
      const t = useTranslations();
      const tGame = useTranslations("about.game-section")
      const {isEn} = useCurrentLanguage();

    return(
      <div id="game-console" className="md:block hidden w-full h-full ">
          <div className={`${styles.flexCenter} mt-40`}>
              
              <div id="upper-part" 
                  className="absolute w-150 h-100 bg-fuchsia-100 mx-auto 
                      rounded-tl rounded-tr
              ">
                  <div id="main-screen"
                    className={`bg-purple-200 w-130 h-90 mt-3 mx-auto border-2 border-cyan-950/20 rounded flex flex-col relative`}
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

                    {!startScreen && (
                      <div className="flex flex-col h-full">
                        {/* FACT INDICATOR TOP FIXED */}
                        {!showPrize && (
                          <div id="progress-displayer" 
                            className={`${styles.startScreenContainer} ${styles.screenText} shrink-0`}>
                            <Image 
                              src={`/images/icons/key.png`}
                              alt="key icon"
                              width={25}
                              height={25}
                              className={`object-contain transition-transform ${keyJump ? '-translate-y-1' : 'translate-y-0'}`}
                              loading="lazy"
                            />
                            <span className={`pr-4 ${isEn ? 'text-2xl' : 'text-xl'}`}>{pulledFacts.length} / {totalFacts}</span>
                          </div>
                        )}

                        {/* CONTENT AREA - different for prize vs game */}
                        {showPrize ? (
                          // PRIZE VIEW - YOUR ORIGINAL STYLES PRESERVED
                          <div className={`text-center pt-4 ${styles.screenText} z-10 flex-1 overflow-y-auto`}>
                            <h2 className={`my-4 font-bold text-pink-500 animate-bounce ${isEn ? 'text-4xl' : 'text-2xl'}`}>{tGame('congrats')}</h2>
                            <Image 
                              src={photo}
                              alt="meet the dev"
                              width={200}
                              height={200}
                              loading="lazy"
                              className="object-cover mx-auto rounded-full"
                            />
                            <p className={`mt-2 mx-auto flex flex-col gap-0 ${isEn ? 'text-3xl' : ''}`}>
                              <span>{tGame('hi')}</span>
                              <span className={isEn ? 'hidden' : 'block'}>{tGame('nice-to-meet-you')}</span>
                            </p>
                          </div>
                        ) : (
                          // GAME VIEW 
                          <>
                            {/* SCROLLABLE TEXT AREA with padding for bottom bar */}
                            <div className="flex-1 overflow-y-auto px-4 pb-12
                              [&::-webkit-scrollbar]:w-1.5
                              [&::-webkit-scrollbar-track]:bg-purple-200
                              [&::-webkit-scrollbar-thumb]:bg-pink-300
                              [&::-webkit-scrollbar-thumb]:rounded">
                              <p className={`text-justify text-wrap ${styles.screenText}
                                ${isEn ? "text-2xl leading-7" : "text-lg "}
                              `}>{t(currentFact.description)}</p>
                            </div>

                            {/* PROGRESS BAR only in game mode */}
                            <div id="progression-bar" 
                                className={`w-full h-6 ${styles.progressBarBG} absolute bottom-0 left-0 right-0`}>
                              <div className={`w-96 h-2 mx-auto ${styles.progressBarBorder}`}>
                                <div 
                                  className={styles.progressBarColors}
                                  style={{ width: `${(pulledFacts.length / totalFacts) * 100}%` }}
                                />
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
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