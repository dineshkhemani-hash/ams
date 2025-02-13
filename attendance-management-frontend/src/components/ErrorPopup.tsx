import React from 'react';
import { X } from 'lucide-react';

interface ErrorPopupProps {
    message: string;
    onClose: () => void;
    position?: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ message, onClose, position }) => {
    const positionStyles = position || {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    };

    return (
        <div
            className="fixed z-50 bg-white rounded-lg shadow-xl p-4 border-l-4 border-red-500 min-w-[300px]"
            style={positionStyles}
        >
            <div className="flex justify-between items-start">
                {/* <div className="flex-1">
                    <h3 className="text-lg font-semibold text-red-600 mb-1">Error</h3>
                    <p className="text-gray-600">{message}</p>
                </div> */}
                {typeof message === 'string' ? (

                    <div className='flex-1'>
                        <h3 className="text-lg font-semibold text-red-600 mb-1">Error</h3>
                        <p className="text-gray-600">{message}</p>
                    </div>


                ) : (
                    <ul>
                        {Object.entries(message).map(([key, value]) => {
                            if (key == "message" || key == "timestamp" || key == "status") {

                            } else {
                                return (
                                    <div className='flex-1'>
                                        <h3 className="text-lg font-semibold text-red-600 mb-1">Error</h3>
                                        <p className="text-gray-600">{value}</p>
                                    </div>
                                )
                            }
                        })}
                    </ul>
                )}
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
};

export default ErrorPopup;