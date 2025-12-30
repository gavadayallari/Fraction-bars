type RowConfig = {
    denominator: number;
    numerator: number; // The target numerator to display (e.g. 4 for 4/8)
    color: string;
};

type Props = {
    rows: RowConfig[];
    activeRowIndex: number;
    onSelect: (numerator: number, denominator: number, index: number) => void;
};

export default function LeftFractionPanel({ rows, activeRowIndex, onSelect }: Props) {
    return (
        <div
            className="flex flex-row md:flex-col gap-5 md:gap-3.5 p-2 md:p-6 w-full md:w-30 h-auto md:h-103 items-center justify-between md:justify-start"
            style={{
                backgroundImage: "url('images/Frame-1.png')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
            }}
        >
            {rows.map((row, index) => {
                const isActive = index === activeRowIndex;
                return (
                    <div
                        key={index}
                        className={`
            h-12 md:h-15.5 w-full flex-1 md:flex-none rounded-md text-white font-bold text-sm md:text-lg flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 transition-transform active:scale-95
            ${row.color}
            ${isActive
                                ? "ring-2 md:ring-4 ring-[#F1C40F] scale-105 md:scale-110 z-10 shadow-lg"
                                : "opacity-100 hover:scale-105"
                            }
          `}
                        style={{
                            backgroundImage: `url('images/Frame-Number-${index + 1}.png')`,
                            backgroundSize: "100% 100%",
                            backgroundRepeat: "no-repeat",
                        }}
                        onClick={() => onSelect(row.numerator, row.denominator, index)}
                    >
                        <div className="flex flex-col items-center leading-none">
                            <span>{row.numerator}</span>
                            <div className="w-full h-0.5 bg-white/60 my-0.5"></div>
                            <span>{row.denominator}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
