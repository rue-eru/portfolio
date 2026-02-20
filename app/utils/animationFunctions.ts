import { Direction, type PositionProps } from "./interfaces";

export  const getInitialPosition = (
    distance: number = 50, 
    direction: Direction
): PositionProps => {
    const positions: Record<Direction, PositionProps> = {
        top: { y: -distance},
        bottom: { y: distance},
        left: { x: -distance},
        right: { x: distance},
    };
    return positions[direction] || positions.bottom;
};

export const getTransition = (
    duration: number = 0.5,
    delay: number = 0,
    ease: string = 'easeOut'
) => ({
    duration, delay, ease
});

export const getViewportOptions = (
    once: boolean = true,
    amount: number = 0.3
) => ({
    once, amount
})