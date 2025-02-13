import React from 'react';


interface GeneralPopupProps {
    title?: string
    message: string;
    onClose: () => void;
    handleAction: () => void; // () => void means Function that takes no parameters and returns nothing
}

const GeneralPopup: React.FC<GeneralPopupProps> = ({ title = "ALERT", message, onClose, handleAction }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
                <div className="flex flex-col justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-red-600">
                        {title}
                    </h2>
                    {/* <h2 className="text-xl font-semibold text-gray-800">
                        {message}
                    </h2> */}
                    {/* <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={20} />
                    </button> */}
                </div>
                <div className='w-full px-1 py-2 text-center focus:ring-2 focus:ring-indigo-500 focus:border-transparent'>

                    <h2 className="text-xl font-semibold text-gray-800">
                        {message}
                    </h2>

                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        onClick={handleAction}
                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Confirm
                    </button>
                </div>

            </div>
        </div>
    );
};

export default GeneralPopup;