export const WHOLE_WIDTH = 1000;

export type Fraction = {
    numerator: number;
    denominator: number;
};

export type ComparisonResult = {
    relationship: 'lt' | 'gt' | 'eq';
    reasoning: string;
};

export const FractionEngine = {
    /**
     * Calculates the width in "units" where WHOLE_WIDTH = 1000 represents 1 whole.
     */
    calculateWidth: (fraction: Fraction): number => {
        if (fraction.denominator === 0) return 0;
        return (fraction.numerator / fraction.denominator) * WHOLE_WIDTH;
    },

    /**
     * Calculates the closest snap position on the number line.
     * x: The current position (0 to WHOLE_WIDTH)
     * denominator: The current denominator (number of segments)
     */
    getSnapPosition: (x: number, denominator: number): number => {
        if (denominator === 0) return 0;
        const step = WHOLE_WIDTH / denominator;
        const snappedIndex = Math.round(x / step);
        return snappedIndex * step;
    },

    /**
     * Compares two fractions and provides reasoning suitable for Grades 4-6.
     */
    compare: (f1: Fraction, f2: Fraction): ComparisonResult => {
        const v1 = f1.numerator / f1.denominator;
        const v2 = f2.numerator / f2.denominator;
        const epsilon = 0.001;

        // Check Equivalence first: (n1 * d2) == (n2 * d1)
        if (f1.numerator * f2.denominator === f2.numerator * f1.denominator) {
            return {
                relationship: 'eq',
                reasoning: `Equivalence: ${f1.numerator}/${f1.denominator} is equal to ${f2.numerator}/${f2.denominator}. They represent the same amount.`
            };
        }

        // Same Denominator
        if (f1.denominator === f2.denominator) {
            const rel = f1.numerator < f2.numerator ? 'lt' : 'gt';
            return {
                relationship: rel,
                reasoning: `Same Denominator: Since the parts are the same size (1/${f1.denominator}), ${f1.numerator} parts is ${rel === 'lt' ? 'less' : 'more'} than ${f2.numerator} parts.`
            };
        }

        // Same Numerator
        if (f1.numerator === f2.numerator) {
            const rel = f1.denominator > f2.denominator ? 'lt' : 'gt'; // Larger denom = smaller parts
            return {
                relationship: rel,
                reasoning: `Same Numerator: We have the same number of parts. Since 1/${f1.denominator} is ${rel === 'lt' ? 'smaller' : 'larger'} than 1/${f2.denominator}, ${f1.numerator}/${f1.denominator} is ${rel === 'lt' ? 'less' : 'more'} than ${f2.numerator}/${f2.denominator}.`
            };
        }

        // General case
        const rel = v1 < v2 ? 'lt' : 'gt';
        return {
            relationship: rel,
            reasoning: `General Comparison: ${f1.numerator}/${f1.denominator} is ${rel === 'lt' ? 'less' : 'more'} than ${f2.numerator}/${f2.denominator}.`
        };
    },

    /**
     * Checks if two fractions are strictly equivalent.
     */
    isEquivalent: (f1: Fraction, f2: Fraction): boolean => {
        return f1.numerator * f2.denominator === f2.numerator * f1.denominator;
    }
};
