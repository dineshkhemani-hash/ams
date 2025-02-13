import React from 'react';
import { format } from 'date-fns';
import { AttendanceRecord } from '../types';

interface AttendanceTableProps {
    records: AttendanceRecord[];
    // showUserName?: boolean;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records }) => {
    return (
        <div className="mt-4 flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Employee name
                                    </th> */}

                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        In Time
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Out Time
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Hours
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {records.map((record) => (
                                    <tr key={record.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {/* {format(new Date(record.attendanceDate), 'dd MMM yyyy')} */}
                                            {record.attendanceDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record?.user?.name || record?.name}
                                        </td>
                                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.}
                                        </td> */}

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.in_time === null ? "---" : record.in_time}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {record.out_time === null ? "---" : record.out_time}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {/* {record.duration == "" ? "-" : record.duration)} */}
                                            {record.duration == null ? "---" : record.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {/* {record.duration == "" ? "-" : record.duration)} */}
                                            {record.status == "" ? "---" : record.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceTable;