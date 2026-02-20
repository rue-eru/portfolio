// components/animations/NaturalCharReveal.tsx
'use client';

import StaggerSlide from "./StaggerSlide";

interface NaturalCharRevealProps {
    text: string;
    className?: string;
    direction?: 'top' | 'bottom' | 'left' | 'right';
    staggerDelay?: number;
    distance?: number;
}

export default function NaturalCharReveal({
    text,
    className = '',
    direction = 'bottom',
    staggerDelay = 0.03,
    distance = 20
}: NaturalCharRevealProps) {
    
    // Split into an array of characters, but preserve spaces
    const chars = text.split('');
    
    return (
        <StaggerSlide
            direction={direction}
            staggerDelay={staggerDelay}
            distance={distance}
            className={className}
        >
            {chars.map((char, index) => (
                <span 
                    key={index}
                    style={{
                        display: 'inline',
                        whiteSpace: 'pre-wrap' // Preserve spaces naturally
                    }}
                >
                    {char}
                </span>
            ))}
        </StaggerSlide>
    );
}