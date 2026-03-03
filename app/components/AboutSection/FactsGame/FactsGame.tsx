'use client'

import factsData from "@/app/data/about.json"
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import MdPlusDisplay from "./MdPlusDisplay";
import SmallDisplay from "./SmallScreenDisplay";
import AchievementDisplay from "./AchievementDisplay";
import Float from "../../animations/Float";

export default function FactsGame () {
    const t = useTranslations();
    const facts = factsData["factsgame"];
    const factKeys = Object.keys(facts);
    const [pulledFacts, setPulledFacts] = useState<number[]>([]);
    const [currentFactIndex, setCurrentFactIndex] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);
    const [showPrize, setShowPrize] = useState(false);
    const [currentAchievement, setCurrentAchievement] = useState('');
    const [showAchievement, setShowAchievement] = useState(false);
    const [startScreen, setStartScreen] = useState(true);
    const achievementTimeoutRef = useRef<NodeJS.Timeout|null>(null);
    const totalFacts = factKeys.length;
    const photo = `/images/icons/cat.jpg`

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * totalFacts)
        setCurrentFactIndex(randomIndex)
        setPulledFacts([randomIndex])
    }, []);

    // memoizes clearAchievementTimeout to prevent recreations
    const clearAchievementTimeout = () => {
        if (achievementTimeoutRef.current) {
            clearTimeout(achievementTimeoutRef.current)
            achievementTimeoutRef.current = null
        }
    }

    // useCallback is hook that caches (memoizes) a function definition between renders, returning the same instance unless dependencies change. I
    const showAchievementWithTimer = useCallback((achievement: string, duration: number = 5000) => {
        clearAchievementTimeout();
        setCurrentAchievement(achievement)
        setShowAchievement(true)

        const timeout = setTimeout(() => {
            setShowAchievement(false)
            achievementTimeoutRef.current = null
        }, duration)

       achievementTimeoutRef.current = timeout
    }, [clearAchievementTimeout]);

    const pullRandomFact = useCallback(() => {
        if (gameComplete) return

        if (pulledFacts.length >= totalFacts) {
            setGameComplete(true)
            setShowPrize(true)
            showAchievementWithTimer(t('about.facts-game.face-reveal.achievement'), 10000)            
            return
        }

        const uncollectedIndices = factKeys
            .map((_, index) => index)
            .filter(index => !pulledFacts.includes(index));

        const randomUncollectedIndex = uncollectedIndices[Math.floor(Math.random() * uncollectedIndices.length)];

        setCurrentFactIndex(randomUncollectedIndex);

        setPulledFacts([...pulledFacts, randomUncollectedIndex]);

        const newFact = facts[randomUncollectedIndex];
        if (newFact?.achievement) {
            showAchievementWithTimer(t(newFact.achievement), 5000);
        }

    }, [gameComplete, pulledFacts, totalFacts, factKeys, facts, showAchievementWithTimer, t]);

    const resetGame = useCallback(() => {
        clearAchievementTimeout();
        const randomIndex = Math.floor(Math.random() * totalFacts)
        setCurrentFactIndex(randomIndex);
        setPulledFacts([randomIndex]);
        setGameComplete(false);
        setShowPrize(false);
        setShowAchievement(false);
        setShowAchievement(false);
        setStartScreen(true);
    }, [clearAchievementTimeout, totalFacts]);

    const currentFact = facts[currentFactIndex];

    useEffect(() => {
        if (!startScreen && pulledFacts.length > 0 && !showPrize) {
        //achievement for first fact included
            const firstFact = facts[currentFactIndex]
            if (firstFact?.achievement) {
                showAchievementWithTimer(t(firstFact.achievement), 4000)
            }

    }}, [startScreen]);

    //cleans up on unmount
    useEffect(() => {
        return() => {
            if (achievementTimeoutRef.current) {
                clearTimeout(achievementTimeoutRef.current);
            }
        }
    }, []);

    return (
        <>
            {showAchievement && (
                <AchievementDisplay
                    currentAchievement={currentAchievement}
                />
            )}

                <MdPlusDisplay 
                    showPrize={showPrize}
                    resetGame={resetGame}
                    currentFact={currentFact}
                    pulledFacts={pulledFacts}
                    totalFacts={totalFacts}
                    pullRandomFact={pullRandomFact}
                    gameComplete={gameComplete}
                    photo={photo}
                    startScreen={startScreen}
                    setStartScreen={setStartScreen}
                />

            <SmallDisplay 
                showPrize={showPrize}
                resetGame={resetGame}
                currentFact={currentFact}
                pulledFacts={pulledFacts}
                totalFacts={totalFacts}
                pullRandomFact={pullRandomFact}
                gameComplete={gameComplete}
                photo={photo}
                startScreen={startScreen}
                setStartScreen={setStartScreen}
            />
        </>
    )
}