import type { FactsGameProps } from "@/app/utils/interfaces";
import { styles } from "@/app/utils/styles";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCurrentLanguage } from "@/app/hooks/useCurrentLang";

export default function SmallDisplay ({
    showPrize, resetGame, currentFact, pullRandomFact, pulledFacts, totalFacts, gameComplete, photo, startScreen, setStartScreen, keyJump
}: FactsGameProps) {
      const t = useTranslations();
      const tGame = useTranslations("about.game-section")
      const {isEn, isJa} = useCurrentLanguage();
      const btnStyles = isEn ? styles.gamePhoneBtnsEN : styles.gamePhoneBtns

    return(
        <div id="smart-phone" className={`block md:hidden ${styles.flexCenter}`}>
            <div className={`bg-fuchsia-200 w-78 h-150
                border-10 rounded-2xl border-purple-300
                ${styles.flexCenter} relative
            `}>
                {/* frontcamera - fixed positioning */}
                <div className="bg-purple-400/70 rounded-full w-3 h-3 border-4 border-purple-300 absolute top-2 left-1/2 transform -translate-x-1/2 z-20" />

                {/* Main screen container */}
                <div className="w-70 h-140 flex flex-col bg-purple-200/80 rounded-xl overflow-hidden relative">
                    
                    {/* SCROLLABLE CONTENT AREA */}
                    <div className="flex-1 overflow-y-auto px-2 py-4 pb-16
                        [&::-webkit-scrollbar]:w-1.5
                        [&::-webkit-scrollbar-track]:bg-purple-200
                        [&::-webkit-scrollbar-thumb]:bg-fuchsia-300/40
                        [&::-webkit-scrollbar-thumb]:rounded">
                        
                        {startScreen ? (
                            <div className="h-full flex flex-col justify-center items-center gap-10">
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
                                    className={btnStyles}>
                                    {tGame('start')}
                                </button>
                            </div>
                        ) : showPrize ? (
                            <div className={`flex flex-col gap-y-4 justify-center items-center text-center py-4 ${styles.screenText}`}>
                                <h2 className={`${isEn ? 'text-4xl tracking-wide' : 'text-2xl'} font-bold text-pink-500 animate-bounce`}>
                                    {tGame('congrats')}
                                </h2>
                                <Image 
                                    src={photo}
                                    alt="meet the dev"
                                    width={200}
                                    height={200}
                                    loading="lazy"
                                    className="object-cover mx-auto rounded-full"
                                />
                                <p className={`mt-2 mx-auto ${isEn ? "text-2xl" : "p-4"}`}>
                                    <span>{tGame('hi')}</span>
                                    <span className={isEn ? 'hidden' : 'block'}>{tGame('nice-to-meet-you')}</span>                                </p>
                                <button 
                                    onClick={resetGame}
                                    className={`${btnStyles} w-fit`}>
                                    {tGame('again')}
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* fact collection indicator sticky at top */}
                                <div className={`${styles.startScreenContainer} ${styles.screenText} mb-3 sticky top-0 bg-purple-200/80 z-10`}>
                                    <Image 
                                        src={`/images/icons/key.png`}
                                        alt="key icon"
                                        width={25}
                                        height={25}
                                        className={`object-contain transition-transform ${keyJump ? '-translate-y-2' : 'translate-y-0'}`}
                                        loading="lazy"
                                    />
                                    <span className={`${isEn ? `text-2xl` : `text-base`} pr-4`}>
                                        {pulledFacts.length} / {totalFacts}
                                    </span>
                                </div>

                                {/* scrollable fact text */}
                                <p className={`text-justify leading-7 ${styles.screenText} pb-4
                                    ${isEn ? "text-2xl" : "text-sm"}`}>
                                    {t(currentFact.description)}
                                </p>
                            </>
                        )}
                    </div>

                    {/* FIXED BOTTOM BAR */}
                    {!startScreen && !showPrize && (
                        <div className={`${styles.progressBarBG} py-3 flex justify-center items-center gap-2 absolute bottom-0 left-0 right-0 z-10`}>
                            <div className={`w-45 h-2 ${styles.progressBarBorder}`}>
                                <div 
                                    className={styles.progressBarColors}
                                    style={{ width: `${(pulledFacts.length / totalFacts) * 100}%` }}/>
                            </div>
                            <button 
                                onClick={pullRandomFact} 
                                disabled={gameComplete} 
                                className={`${btnStyles}`}>
                                {tGame('pull')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}