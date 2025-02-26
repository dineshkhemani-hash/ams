import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';

interface MonthPickerProps {
    selectedYear: number;
    selectedMonth: number;
    // onChange: () => void;
    onChange: React.Dispatch<React.SetStateAction<{ year: number, month: number }>>;

}

const MonthPicker: React.FC<MonthPickerProps> = ({ selectedYear, selectedMonth, onChange }) => {
    const [disableNext, setDisableNext] = useState(true);

    const handlePreviousMonth = () => {
        // const newDate = new Date(selectedMonth.setMonth(selectedMonth - 1));
        // console.log(new Date(selectedMonth.setMonth(selectedMonth - 1)).getMonth());
        onChange((prev) => {
            let newYear = prev.year;
            let newMonth = prev.month - 1;
            if (newMonth < 1) {// if jan then go to december
                newMonth = 12;
                newYear -= 1;
            }

            setDisableNext(false);
            return { year: newYear, month: newMonth };
        })
    };

    const handleNextMonth = () => {

        const currentYear = new Date().getUTCFullYear();
        const currentMonth = new Date().getUTCMonth() + 1;
        onChange(prev => {
            let newYear = prev.year;
            let newMonth = prev.month + 1;

            // If month exceeds December, wrap to January and advance year.
            if (newMonth > 12) {
                newMonth = 1;
                newYear += 1;
            }
            // If the new selection is beyond current date, do not allow it.
            if (newMonth > currentMonth && newYear == currentYear) {
                // newMonth = selectedMonth;
                // newYear = selectedYear;
                setDisableNext(true);
                return { year: currentYear, month: currentMonth };
            }
            setDisableNext(false);


            return { year: newYear, month: newMonth };
        })
    }
    // const newDate = new Date(selectedDate.setMonth(selectedDate.getMonth() + 1));
    // console.log(new Date(selectedDate.setMonth(selectedDate.getMonth() + 1)).getMonth());
    // onChange(newDate);
    function formateDate(year, month) {
        const date = new Date(year, month - 1);
        const formattedDate = date.toLocaleString('default', { month: "long", year: "numeric" })
        return formattedDate;
    }
    return (
        <div className="flex items-center space-x-4 ">
            <button
                onClick={handlePreviousMonth}
                className="p-2 hover:bg-gray-100 rounded-full dark:bg-gray-100 dark:hover:bg-gray-400"
            >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <span className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                {/* {format(selectedDate, 'MMMM yyyy')} */}
                {formateDate(selectedYear, selectedMonth)}
                {/* {format(selectedYear, "yyyy")} */}
            </span>
            <button
                onClick={handleNextMonth}
                className={`p-2  rounded-full ${disableNext ? 'bg-gray-50 dark:bg-gray-800' : 'dark:bg-gray-100 dark:hover:bg-gray-400'}`}
                disabled={disableNext}
            >
                <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
        </div>
    );
};

export default MonthPicker;