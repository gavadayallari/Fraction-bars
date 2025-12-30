import FractionBlock from "./FractionBlock";

type Props = {
    rowDenominator: number;
    numerator: number;
    color: string;
};

export default function FractionRow({
    rowDenominator,
    numerator,
    color,
}: Props) {
    // COMPARISON LOGIC: Direct numerator fill
    // If numerator is 3, we fill 3 blocks (or all if > rowDenominator)
    const filledCount = numerator;

    return (
        <div className="flex flex-nowrap gap-1.5 w-full">
            {Array.from({ length: rowDenominator }).map((_, i) => (
                <FractionBlock
                    key={i}
                    filled={i < filledCount}
                    label={`1/${rowDenominator}`}
                    color={color}
                />
            ))}
        </div>
    );
}
