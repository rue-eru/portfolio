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
    const totalFacts = factKeys.length;
    const photo = `/images/icons/cat.jpg`

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * totalFacts)
        setCurrentFactIndex(randomIndex)
        setPulledFacts([randomIndex])
    }, []);

    const pullRandomFact = () => {
        if (gameComplete) return

        if (pulledFacts.length >= totalFacts) {
            setGameComplete(true)
            setShowPrize(true)

            setCurrentAchievement(t('about.facts-game.face-reveal.achievement'));
            setShowAchievement(true);
            setTimeout(() => {
                setShowAchievement(false)
            }, 10000)            
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
            setCurrentAchievement(t(newFact.achievement));
            setShowAchievement(true);

            setTimeout(() => {
                setShowAchievement(false);
            }, 5000);
        }

    };

    const resetGame = () => {
        const randomIndex = Math.floor(Math.random() * totalFacts)
        setCurrentFactIndex(randomIndex);
        setPulledFacts([randomIndex]);
        setGameComplete(false);
        setShowPrize(false);
        setShowAchievement(false);
    }
    const currentFact = facts[currentFactIndex];

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
            />
        </>
    )
}