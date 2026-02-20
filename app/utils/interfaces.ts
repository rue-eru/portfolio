import type { ReactNode } from "react";

export type Direction = 'top' | 'bottom' | 'left' | 'right';

export interface PositionProps {
    x?: number;
    y?: number;
} 

export interface SlideInProps {
    children: ReactNode | ReactNode[];
    direction?: Direction;
    delay?: number;
    duration?: number;
    distance?: number;
    staggerDelay?: number;
    className?: string;
    once?: boolean;
}

export interface LetterByLetterProps {
    text: string;
    className?: string;
    direction?: Direction;
    staggerDelay?: number;
    distance?: number
}