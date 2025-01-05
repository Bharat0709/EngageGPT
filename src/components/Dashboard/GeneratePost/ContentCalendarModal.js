import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { fetchSheetDetails } from '../../../network/Members';
import Papa from 'papaparse';

const ContentCalendarModal = ({ isOpen, onClose, onSave }) => {
  const [calendarData, setCalendarData] = useState([]);
  const [googleSheetLink, setGoogleSheetLink] = useState('');
  const [loading, setLoading] = useState(false);

  const downloadCSVTemplate = () => {
    const csvContent = `"Title","Date","Time"\n"Topic 1","2025-01-02","10:00 AM"\n"Topic 2","2025-01-03","2:00 PM"\n"Topic 3","2025-01-04","9:30 AM"\n"Topic 4","2025-01-05","4:00 PM"\n"Topic 5","2025-01-06","12:00 PM"`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, 'Sample_Content_Calendar.csv');
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Sample_Content_Calendar.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const validateCSV = (data) => {
    const requiredHeaders = ['Title', 'Date', 'Time'];
    const headers = Object.keys(data[0]);

    // Check if all required headers are present
    const isValidHeader = requiredHeaders.every((header) =>
      headers.includes(header),
    );
    if (!isValidHeader) {
      return { isValid: false, message: 'Invalid headers in the CSV file.' };
    }

    // Check for empty values in rows
    for (const row of data) {
      for (const header of requiredHeaders) {
        if (!row[header]?.trim()) {
          return {
            isValid: false,
            message: 'Each row must contain non-empty values for all columns.',
          };
        }
      }
    }

    return { isValid: true };
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const parsedData = Papa.parse(text, { header: true }).data;

      // Validate the CSV structure and data
      const validation = validateCSV(parsedData);
      if (!validation.isValid) {
        message.error(validation.message);
        return;
      }

      setCalendarData(parsedData);
      message.success('Content ideas loaded successfully!');
    };
    reader.readAsText(file);
    return false;
  };

  const fetchGoogleSheetData = async () => {
    if (!googleSheetLink) {
      message.error('Please enter a valid Google Sheet link.');
      return;
    }

    // Ensure the URL is public or publicly accessible
    if (
      !googleSheetLink.startsWith('https://docs.google.com/spreadsheets/d/') ||
      googleSheetLink.endsWith('/edit')
    ) {
      message.error(
        'Google Sheet should be a public link or accessible publicly.',
      );
      return;
    }

    // Regular expression to validate the base Google Sheets link
    const sheetLinkRegex =
      /^https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+(\/.*)?$/;

    if (!sheetLinkRegex.test(googleSheetLink)) {
      message.error('Please enter a valid Google Sheet link.');
      return;
    }

    try {
      setLoading(true);
      const fetchedData = await fetchSheetDetails(googleSheetLink);

      // Handle response structure
      const { headers, rows } = fetchedData;

      if (!headers || !rows) {
        throw new Error('Invalid response format from Google Sheets API.');
      }

      // Validate headers
      const requiredHeaders = ['Title', 'Date', 'Time'];
      const isValidHeader = requiredHeaders.every((header) =>
        headers.includes(header),
      );

      if (!isValidHeader) {
        throw new Error(
          'Invalid headers in the Google Sheet. Required headers are "Title", "Date", and "Time".',
        );
      }

      const validRows = rows.filter((row) => {
        return row.length === 3;
      });
      if (validRows.length !== rows.length) {
        message.warning(
          'Some rows have been discarded as they do not contain all required columns.',
        );
      }

      if (validRows.length > 30) {
        const limitedData = validRows.slice(0, 30);
        setCalendarData(limitedData);
        message.warning(
          'You can only upload up to 30 days of calendar. The rest of the data has been discarded.',
        );
      } else {
        setCalendarData(validRows);
      }

      const formattedData = validRows.map((row) => {
        const formattedRow = {};
        headers.forEach((header, index) => {
          formattedRow[header] = row[index] || '';
        });
        return formattedRow;
      });

      setCalendarData(formattedData);
      message.success('Google Sheet content loaded successfully!');
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error.message);
      message.error(
        error.message ||
          'Failed to load Google Sheets content. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (calendarData.length === 0) {
      message.error('No content ideas to save.');
      return;
    }
    onSave(calendarData);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col p-6 rounded-xl lg:w-1/2 w-11/12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 text-xl self-end hover:text-gray-800"
          onClick={onClose}
        >
          <FiX />
        </button>
        <h2 className="text-xl text-center mb-4">Upload Content Calendar</h2>

        <div className=" flex mb-4 w-full mx-auto">
          <button
            onClick={downloadCSVTemplate}
            className="text-sm mb-2 self-center w-fit mx-auto bg-white border border-gray-300 text-black px-4 py-2 rounded-lg"
          >
            Download Sample Template
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="upload"
            className="flex items-center mt-2 justify-center text-sm bg-gray-100 hover:bg-gray-200 rounded-lg p-2 cursor-pointer"
          >
            <UploadOutlined className="mr-2" />
            Upload CSV
            <input
              type="file"
              id="upload"
              accept=".csv"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files[0])}
            />
          </label>
        </div>

        <div className="mb-4">
          <p className="text-center mb-4 text-sm text-gray-500">
            -------- OR --------
          </p>
          <input
            type="text"
            placeholder="Paste Google Sheet link here"
            value={googleSheetLink}
            onChange={(e) => setGoogleSheetLink(e.target.value)}
            className="mt-1 block w-full border border-gray-300 text-sm rounded-xl p-2"
          />
          <p className=" text-red-700 text-xs text-center m-2">
            Please note Google Sheet should be a public link or accessible
            publicly.
          </p>
          <button
            type="button"
            onClick={fetchGoogleSheetData}
            disabled={loading}
            className="mt-2 bg-gray-100 text-black  hover:bg-gray-200 w-full text-sm px-4 py-2 rounded-lg"
          >
            {loading ? 'Fetching...' : 'Fetch Content Ideas'}
          </button>
        </div>

        {calendarData.length > 0 && (
          <div className="h-52 overflow-y-scroll scrollbar-hide ">
            <ul className="mt-2">
              {calendarData.map((data, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-100 rounded-lg p-2 mb-2"
                >
                  <span className="text-sm">{data.Title}</span>
                  <span className="text-sm">
                    {data.Date} - {data.Time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="global-button-secondary rounded-xl"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="global-button-primary rounded-xl"
          >
            Save Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendarModal;
