import React from 'react';

const OrientationGuard: React.FC = () => {
    return (
        <div className="orientation-guard-overlay">
            <div className="orientation-content">
                <div className="phone-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-icon">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                        <path d="M12 18h.01"></path>
                    </svg>
                </div>
                <p className="orientation-message"> Rotate your device to landscape for the best experience. </p>
            </div>
        </div>
    );
};

export default OrientationGuard;
