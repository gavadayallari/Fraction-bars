type Props = {
    filled: boolean;
    label: string;
    color: string;
};

export default function FractionBlock({ filled, label, color }: Props) {
    return (
        <div
            className={`
        flex-1 h-10 md:h-15.5 rounded-md border border-black/10 border-b-4 border-b-black/20 flex items-center justify-center font-bold text-[10px] md:text-lg shadow-sm min-w-0 overflow-hidden
        transition-all duration-300
        ${filled ? `${color} text-white` : "bg-white text-black"}
      `}
            style={{ color: filled ? "white" : undefined }}
        >
            <div className="flex flex-col items-center leading-none">
                {/* Simple parsing of specific fractions like 1/8 to stack them?
            The image shows "1" over "8".
            Let's split label by '/'
         */}
                {label.includes("/") ? (
                    <>
                        <span>{label.split("/")[0]}</span>
                        <div className="w-full h-0.5 bg-current opacity-40 my-[1px]"></div>
                        <span>{label.split("/")[1]}</span>
                    </>
                ) : (
                    label
                )}
            </div>
        </div>
    );
}
