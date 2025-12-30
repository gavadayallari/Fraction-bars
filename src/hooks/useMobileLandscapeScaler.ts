import { useEffect, useState } from "react";

// Design dimensions from reference image/desktop layout
// Adjusted slightly to ensure 16:9ish ratio fits well within 1100x700
const DESKTOP_DESIGN_WIDTH = 1100;
const DESKTOP_DESIGN_HEIGHT = 700;

export const useMobileLandscapeScaler = () => {
    const [style, setStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const isLandscape = width > height;

            // Broader check for mobile/tablet devices in landscape
            // Covers iPhone SE (small), Galaxy S8+ (long), Surface Duo (wide)
            // Cap at 1024px width for "mobile/tablet" behaviour in landscape
            // Or height < 600 which covers standard mobile heights (360-450) and tablets usually > 600
            const isMobileOrTablet = width <= 1024 || (height <= 600 && isLandscape);

            if (isLandscape && isMobileOrTablet) {
                // Determine scale factor based on BOTH dimensions to ensure fit
                const scaleX = width / DESKTOP_DESIGN_WIDTH;
                const scaleY = height / DESKTOP_DESIGN_HEIGHT;

                // Use the smaller scale to ensure NO clipping (letterboxing will happen)
                // 0.95 safety margin accounts for safe-area insets / notches without querying env()
                const scale = Math.min(scaleX, scaleY) * 0.95;

                setStyle({
                    width: `${DESKTOP_DESIGN_WIDTH}px`,
                    height: `${DESKTOP_DESIGN_HEIGHT}px`,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    // Force GPU acceleration with translate3d for smooth rotation
                    transform: `translate3d(-50%, -50%, 0) scale(${scale})`,
                    transformOrigin: "center center",
                    overflow: "visible",
                    display: "flex",
                    flexDirection: "column",
                    // Reset margins/padding that might interfere
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                });
            } else {
                // Reset to default responsive behavior for Desktop / Portrait
                setStyle({
                    width: '100%',
                    height: '100%',
                });
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);

        // Initial Calculation
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        };
    }, []);

    return style;
};
