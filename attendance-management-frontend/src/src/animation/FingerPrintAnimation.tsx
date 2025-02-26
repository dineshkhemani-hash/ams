import React, { useEffect, useState } from 'react';

interface FingerprintAnimationProps {
    isScanning: boolean;
    onComplete: () => void;
    duration?: number; // Duration in milliseconds
}

const FingerprintAnimation: React.FC<FingerprintAnimationProps> = ({
    isScanning,
    onComplete,
    duration = 2000 // Default 2 seconds
}) => {
    const [scanProgress, setScanProgress] = useState(0);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isScanning) {
            setScanProgress(0);
            intervalId = setInterval(() => {
                setScanProgress(prev => {
                    const nextProgress = prev + 2;
                    if (nextProgress >= 100) {
                        clearInterval(intervalId);
                        onComplete();
                        return 100;
                    }
                    return nextProgress;
                });
            }, duration / 50);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isScanning, duration, onComplete]);

    // Calculate color based on progress
    const scanColor = `rgb(${Math.round(255 - (scanProgress * 2.55))}, ${Math.round(scanProgress * 2.55)}, 100)`;

    if (!isScanning) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 relative overflow-hidden">
                <div className="relative w-32 h-32 mx-auto">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Background pattern */}
                        <path
                            d="M12 1C6.477 1 2 5.477 2 11v2c0 5.523 4.477 10 10 10s10-4.477 10-10v-2c0-5.523-4.477-10-10-10zm0 2c4.418 0 8 3.582 8 8v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2c0-4.418 3.582-8 8-8zm0 2c-3.314 0-6 2.686-6 6v2c0 3.314 2.686 6 6 6s6-2.686 6-6v-2c0-3.314-2.686-6-6-6zm0 2c2.21 0 4 1.79 4 4v2c0 2.21-1.79 4-4 4s-4-1.79-4-4v-2c0-2.21 1.79-4 4-4zm0 2c-1.105 0-2 .895-2 2v2c0 1.105.895 2 2 2s2-.895 2-2v-2c0-1.105-.895-2-2-2z"
                            className="fill-gray-200 dark:fill-gray-600"
                        />
                        {/* Scanned pattern */}
                        <path
                            d="M12 1C6.477 1 2 5.477 2 11v2c0 5.523 4.477 10 10 10s10-4.477 10-10v-2c0-5.523-4.477-10-10-10zm0 2c4.418 0 8 3.582 8 8v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2c0-4.418 3.582-8 8-8zm0 2c-3.314 0-6 2.686-6 6v2c0 3.314 2.686 6 6 6s6-2.686 6-6v-2c0-3.314-2.686-6-6-6zm0 2c2.21 0 4 1.79 4 4v2c0 2.21-1.79 4-4 4s-4-1.79-4-4v-2c0-2.21 1.79-4 4-4zm0 2c-1.105 0-2 .895-2 2v2c0 1.105.895 2 2 2s2-.895 2-2v-2c0-1.105-.895-2-2-2z"
                            style={{
                                fill: scanColor,
                                clipPath: `inset(0 0 ${100 - scanProgress}% 0)`,
                                transition: 'clip-path 100ms linear',
                            }}
                        />
                    </svg>

                    {/* Scanning line */}
                    <div
                        className="absolute left-0 w-full h-1"
                        style={{
                            top: `${scanProgress}%`,
                            background: `linear-gradient(180deg, ${scanColor} 0%, transparent 100%)`,
                            boxShadow: `0 0 10px ${scanColor}`,
                            transition: 'all 100ms linear',
                        }}
                    />
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                        Scanning Fingerprint...
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                        Please keep your finger on the scanner
                    </p>
                </div>

                <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-200"
                        style={{
                            width: `${scanProgress}%`,
                            backgroundColor: scanColor,
                            boxShadow: `0 0 8px ${scanColor}`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default FingerprintAnimation