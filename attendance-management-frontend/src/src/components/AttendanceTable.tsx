import React, { useState } from "react";
import { format } from "date-fns";
import { AttendanceRecord } from "../types";
import ExportMenu from "./ExportMenu";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  // showUserName?: boolean;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  //pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  //calculate pagination values
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);
  //handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  //calculate what page numbers to show
  function renderPageNumbers() {
    const pageNumbers = [];
    const maxPagesToShow = 5; //at most 5 pages to display
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    //adjust start page if we are near the end
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  return (
    <div className="mt-4 flex flex-col gap-2">
      <div className="flex justify-end my-2">
        <ExportMenu
          records={records}
          fileName={`attendance-${format(selectedDate, "MMM-yyyy")}`}
        />
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          {/*  border-b border-gray-200 removed */}
          <div className="shadow-gray-300 dark:shadow-gray-50 shadow-sm overflow-hidden mt-2 p-4 text-center sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th
                    scope="col"
                    className="px-6 text-center py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Employee name
                                    </th> */}

                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    In Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Out Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Total Hours
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white  dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {currentRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900  dark:text-gray-100">
                      {/* {format(new Date(record.attendanceDate), 'dd MMM yyyy')} */}
                      {record.attendanceDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900  dark:text-gray-100">
                      {record?.user?.name || record?.name}
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.}
                                        </td> */}

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900  dark:text-gray-100">
                      {record.in_time === null ? "---" : record.in_time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900  dark:text-gray-100">
                      {record.out_time === null ? "---" : record.out_time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900  dark:text-gray-100">
                      {/* {record.duration == "" ? "-" : record.duration)} */}
                      {record.duration == null ? "---" : record.duration}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900  dark:text-gray-100">
                      {/* {record.duration == "" ? "-" : record.duration)} */}
                      {record.status == "" ? "---" : record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination controls */}
            <div className="flex items-center justify-center space-x-2 mt-6">
              {/* Previous page button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50"
              >
                Prev
              </button>

              {/* First page button(if not in view) */}
              {renderPageNumbers()[0] > 1 && (
                <>
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                      currentPage === 1
                        ? "bg-gray-900/10 dark:bg-gray-100/10 text-gray-900 dark:text-gray-100 font-medium"
                        : "hover:bg-gray-900/5 dark:hover:bg-gray-100/5 text-gray-600 dark:text-gray-400"
                    }`}
                    // className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-900/10 dark:bg-gray-100/10 text-gray-900 dark:text-gray-100"
                  >
                    1
                  </button>
                  {renderPageNumbers()[0] > 2 && (
                    <span className="px-2 text-gray-600 dark:text-gray-400">
                      ...
                    </span>
                  )}
                </>
              )}
              {/* Page number buttons */}
              {renderPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                    currentPage === pageNum
                      ? "bg-gray-900/10 dark:bg-gray-100/10 text-gray-900 dark:text-gray-100 font-medium"
                      : "hover:bg-gray-900/5 dark:hover:bg-gray-100/5 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              {/* again last check for if last page button is not in view */}
              {renderPageNumbers()[renderPageNumbers().length - 1] <
                totalPages && (
                <>
                  {renderPageNumbers()[renderPageNumbers().length - 1] <
                    totalPages - 1 && (
                    <span className="text-gray-500 dark:text-gray-400">
                      ...
                    </span>
                  )}
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-900/5 dark:hover:bg-gray-100/5 text-gray-600 dark:text-gray-400"
                  >
                    {totalPages}
                  </button>
                </>
              )}
              {/* Next page button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            {/* Current page indicator */}
            <div className="text-center my-4 text-sm text-gray-500 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
