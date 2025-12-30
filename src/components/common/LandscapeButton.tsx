import React from 'react';

const LandscapeButton: React.FC = () => {
    return (
        <button
            className="landscape-action-button"
            aria-label="Landscape Action"
            onClick={() => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(err => {
                        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                    });
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                }
            }}
        >
            <img
                src="images/Button-landscape.png"
                alt="Landscape Action"
                draggable={false}
            />
        </button>
    );
};

export default LandscapeButton;
