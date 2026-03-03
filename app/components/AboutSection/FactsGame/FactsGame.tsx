'use client'

import factsData from "@/app/data/about.json"
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import MdPlusDisplay from "./MdPlusDisplay";
import SmallDisplay from "./SmallScreenDisplay";
import AchievementDisplay from "./AchievementDisplay";

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
    const [achievementTimeout, setAchievementTimeout] = useState<NodeJS.Timeout|null>(null);
    const totalFacts = factKeys.length;
    const photo = `/images/icons/cat.jpg`

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * totalFacts)
        setCurrentFactIndex(randomIndex)
        setPulledFacts([randomIndex])
    }, []);


    const clearAchievementTimeout = () => {
        if (achievementTimeout) {
            clearTimeout(achievementTimeout)
            setAchievementTimeout(null)
        }
    }

    const showAchievementWithTimer = (achievement: string, duration: number = 5000) => {
        clearAchievementTimeout();
        setCurrentAchievement(achievement)
        setShowAchievement(true)

        const timeout = setTimeout(() => {
            setShowAchievement(false)
            setAchievementTimeout(null)
        }, duration)

        setAchievementTimeout(timeout)
    }

    const pullRandomFact = () => {
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

    };

    const resetGame = () => {
        clearAchievementTimeout();
        const randomIndex = Math.floor(Math.random() * totalFacts)
        setCurrentFactIndex(randomIndex);
        setPulledFacts([randomIndex]);
        setGameComplete(false);
        setShowPrize(false);
        setShowAchievement(false);
        setShowAchievement(false);
        setStartScreen(true);
    }
    const currentFact = facts[currentFactIndex];

    //cleans up on unmount
    useEffect(() => {
        return() => {
            if (achievementTimeout) {
                clearTimeout(achievementTimeout);
            }
        }
    }, [])

    useEffect(() => {
        if (!startScreen && pulledFacts.length > 0 && !showPrize) {
        //achievement for first fact included
            const firstFact = facts[currentFactIndex]
            if (firstFact?.achievement) {
                showAchievementWithTimer(t(firstFact.achievement), 4000)
            }

    }}, [startScreen, resetGame]);


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