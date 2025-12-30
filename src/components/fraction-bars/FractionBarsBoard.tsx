import FractionRow from "./FractionRow";


type RowConfig = {
    denominator: number;
    numerator: number;
    color: string;
};

type Props = {
    numerator: number;
    denominator: number;
    disabled: boolean;
    rows: RowConfig[];
};

export default function FractionBarsBoard({
    rows,
}: Props) {


    return (
        <div
            className="flex flex-col gap-2 md:gap-3 p-2 md:p-7 rounded-xl shadow-2xl w-full flex-1 min-h-[300px] md:min-h-[400px] items-center justify-center"
            style={{
                backgroundImage: "url('images/Frame-2.png')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
            }}
        >


            {/* REFERENCE ROWS */}
            {rows.map((row, index) => (
                <FractionRow
                    key={index}
                    numerator={row.numerator}
                    rowDenominator={row.denominator}
                    color={row.color}
                />
            ))}
        </div>
    );
}
