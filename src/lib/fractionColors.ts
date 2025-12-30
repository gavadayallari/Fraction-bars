export const getFractionColor = (denominator: number): string => {
    switch (denominator) {
        case 8:
            return "bg-[#2ECC71]"; // Green
        case 6:
            return "bg-[#3498DB]"; // Blue
        case 12:
            return "bg-[#E74C3C]"; // Red
        case 4:
            return "bg-[#22D3EE]"; // Cyan
        case 10:
            return "bg-[#9B59B6]"; // Purple
        default:
            return "bg-[#F39C12]"; // Orange/Fallback
    }
};
