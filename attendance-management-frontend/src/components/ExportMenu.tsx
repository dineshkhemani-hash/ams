import React, { useState } from "react";
import { Download, ChevronDown } from "lucide-react";
import { AttendanceRecord } from "../types";

interface ExportMenuProps {
  records: AttendanceRecord[];
  fileName?: string;
}

const ExportMenu: React.FC<ExportMenuProps> = ({
  records,
  fileName = "attendance",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const exportToCSV = () => {
    const headers = ["Date", "Employee", "In Time", "Out Time", "Total Hours"];
    const data = records.map((record) => [
      record.attendanceDate,
      record?.user?.name || record?.name,
      record.in_time,
      record.out_time || "--",
      record.duration || "--",
    ]);

    const csvContent = [
      headers.join(","),
      ...data.map((row) => row.join(",")),
    ].join("\n");

    downloadFile(csvContent, "text/csv", `${fileName}.csv`);
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(records, null, 2);
    downloadFile(jsonContent, "application/json", `${fileName}.json`);
  };

  const exportToExcel = () => {
    console.log(records);
    // Create a simple Excel-compatible XML
    const xmlContent = `
      <?xml version="1.0"?>
      <?mso-application progid="Excel.Sheet"?>
      <Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet">
        <Worksheet>
          <Table>
            <Row>
              <Cell><Data Type="String">Date</Data></Cell>
              <Cell><Data Type="String">Employee</Data></Cell>
              <Cell><Data Type="String">In Time</Data></Cell>
              <Cell><Data Type="String">Out Time</Data></Cell>
              <Cell><Data Type="String">Total Hours</Data></Cell>
            </Row>
            ${records
              .map(
                (record) => `
              <Row>
                <Cell><Data Type="String">${record.attendanceDate}</Data></Cell>
                <Cell><Data Type="String">${
                  record?.user?.name || record?.name
                }</Data></Cell>
                <Cell><Data Type="String">${record.in_time}</Data></Cell>
                <Cell><Data Type="String">${
                  record.out_time || "--"
                }</Data></Cell>
                <Cell><Data Type="String">${
                  record?.duration || "--"
                }</Data></Cell>
              </Row>
            `
              )
              .join("")}
          </Table>
        </Worksheet>
      </Workbook>
    `;
    downloadFile(xmlContent, "application/vnd.ms-excel", `${fileName}.xls`);
  };

  const downloadFile = (content: string, type: string, filename: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
      >
        <Download className="h-4 w-4 mr-2" />
        Export
        <ChevronDown className="h-4 w-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1" role="menu">
            <button
              onClick={() => {
                exportToCSV();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              Export as CSV
            </button>
            <hr />
            <button
              onClick={() => {
                exportToJSON();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              Export as JSON
            </button>
            <hr />
            <button
              onClick={() => {
                exportToExcel();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              Export as Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportMenu;
