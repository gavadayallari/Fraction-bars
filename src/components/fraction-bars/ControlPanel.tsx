type Props = {
    numerator: number;
    denominator: number;
    setNumerator: (val: number | ((prev: number) => number)) => void;
    setDenominator: (val: number | ((prev: number) => number)) => void;
    disabled: boolean;
};

export default function ControlPanel({
    numerator,
    denominator,
    setNumerator,
    setDenominator,
    disabled,
}: Props) {
    return (
        <div
            className="w-full max-w-7xl p-4 md:p-10 rounded-xl shadow-2xl flex flex-col gap-4"
            style={{
                backgroundImage: "url('images/Frame-3.png')",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Numerator Slider */}
            <div className="flex items-center gap-3 md:gap-6">
                <span className="text-white font-bold text-sm md:text-xl w-24 md:w-36 uppercase tracking-wider">
                    Numerator
                </span>
                <div className="flex-1 relative h-6 flex items-center">
                    <input
                        type="range"
                        min={0}
                        max={20}
                        value={numerator}
                        onChange={(e) => setNumerator(+e.target.value)}
                        disabled={disabled}
                        className="w-full h-3 bg-white rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 md:[&::-webkit-slider-thumb]:w-8 md:[&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-[#F4C430] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#B8860B]"
                    />
                </div>
                <span className="text-white font-bold text-xl w-8 text-right">
                    {numerator}
                </span>
            </div>

            {/* Denominator Slider */}
            <div className="flex items-center gap-3 md:gap-6">
                <span className="text-white font-bold text-sm md:text-xl w-24 md:w-36 uppercase tracking-wider">
                    Denominator
                </span>
                <div className="flex-1 relative h-6 flex items-center">
                    <input
                        type="range"
                        min={1}
                        max={20}
                        value={denominator}
                        onChange={(e) => {
                            const newDen = +e.target.value;
                            setDenominator(newDen);
                        }}
                        disabled={disabled}
                        className="w-full h-3 bg-white rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 md:[&::-webkit-slider-thumb]:w-8 md:[&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:bg-[#F4C430] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#B8860B]"
                    />
                </div>
                <span className="text-white font-bold text-xl w-8 text-right">
                    {denominator}
                </span>
            </div>
        </div>
    );
}
