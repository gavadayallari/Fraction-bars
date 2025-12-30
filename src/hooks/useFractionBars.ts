import { useState, useEffect, useCallback } from "react";

type UseFractionBarsProps = {
    numerator: number;
    denominator: number;
    onCorrect: () => void;
};

export function useFractionBars({
    numerator,
    denominator,
    onCorrect,
}: UseFractionBarsProps) {
    const [matched, setMatched] = useState(false);

    useEffect(() => {
        setMatched(false);
    }, [numerator, denominator]);

    const targetValue = numerator / denominator;

    const checkMatch = useCallback(
        (rowDen: number) => {
            const pieceValue = 1 / rowDen;
            const filled = Math.round(targetValue / pieceValue);
            // It matches if the filled amount exactly equals the target value
            // And since we are dealing with discrete blocks, we check if filled blocks * value ~= target
            // But strictly speaking, "checkMatch" in the original code returned `filled <= rowDen`?
            // Actually, looking at original code:
            // const filled = Math.round(targetValue / pieceValue);
            // return filled <= rowDen;
            // This logic seems to just check if it fits in the row.
            // Let's preserve the logic for now, or improve if needed.
            // The original just calculated 'filled'.
            return filled <= rowDen;
        },
        [targetValue]
    );

    useEffect(() => {
        // simple learning completion trigger
        if (numerator > 0 && denominator > 0) {
            setMatched(true);
            onCorrect();
        }
    }, [numerator, denominator, onCorrect]);

    return {
        matched,
        targetValue,
        checkMatch,
    };
}
