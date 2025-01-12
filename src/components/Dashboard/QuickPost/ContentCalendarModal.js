import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { fetchSheetDetails } from '../../../network/Members';
import Papa from 'papaparse';
import dayjs from 'dayjs';

const ContentCalendarModal = ({
  selectedProfileName,
  isOpen,
  onClose,
  onSave,
}) => {
  const [calendarData, setCalendarData] = useState([]);
  const [googleSheetLink, setGoogleSheetLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const downloadCSVTemplate = () => {
    const csvContent = `"Title","Date","Time"\n"Topic 1","2025-01-02","10:00 AM"\n"Topic 2","2025-01-03","2:00 PM"\n"Topic 3","2025-01-04","9:30 AM"\n"Topic 4","2025-01-05","4:00 PM"\n"Topic 5","2025-01-06","12:00 PM"`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Sample_Content_Calendar.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } finally {
      URL.revokeObjectURL(url); // Clean up URL object
    }
  };

  const validateCSV = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return { isValid: false, message: 'No data found in the CSV file.' };
    }

    const requiredHeaders = ['Title', 'Date', 'Time'];
    const headers = Object.keys(data[0]);

    // Check if all required headers are present
    const isValidHeader = requiredHeaders.every((header) =>
      headers.includes(header),
    );
    if (!isValidHeader) {
      return { isValid: false, message: 'Invalid headers in the CSV file.' };
    }

    const today = dayjs().startOf('day');

    // Check for empty values and date validation in rows
    for (const row of data) {
      const rowDate = dayjs(row.Date, 'DD-MM-YYYY');
      if (!rowDate.isValid()) {
        return {
          isValid: false,
          message: `Invalid date format for row: ${row.Title}`,
        };
      }

      // Check if date is not before today
      if (rowDate.isBefore(today)) {
        return {
          isValid: false,
          message: `Date must be today or future date for row: ${row.Title}`,
        };
      }
    }

    return { isValid: true };
  };

  const handleFileUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const parsedData = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        }).data;

        // Validate the CSV structure and data
        const validation = validateCSV(parsedData);
        if (!validation.isValid) {
          message.error(validation.message);
          return;
        }

        // Limit to 30 entries
        const limitedData = parsedData.slice(0, 30);
        setCalendarData(limitedData);

        if (parsedData.length > 30) {
          message.warning('Only the first 30 entries have been loaded.');
        } else {
          message.success('Content ideas loaded successfully!');
        }
      } catch (error) {
        message.error(
          'Failed to parse CSV file. Please check the file format.',
        );
      }
    };

    reader.onerror = () => {
      message.error('Error reading file. Please try again.');
    };

    reader.readAsText(file);
  };

  const fetchGoogleSheetData = async () => {
    if (!googleSheetLink?.trim()) {
      message.error('Please enter a valid Google Sheet link.');
      return;
    }

    try {
      setLoading(true);
      const fetchedData = await fetchSheetDetails(googleSheetLink);

      if (!fetchedData?.headers || !Array.isArray(fetchedData.rows)) {
        throw new Error('Invalid response format from Google Sheets API.');
      }

      const { headers, rows } = fetchedData;

      // Transform rows to match CSV format
      const formattedData = rows.map((row) => {
        const formattedRow = {};
        headers.forEach((header, index) => {
          formattedRow[header] = row[index]?.toString().trim() || '';
        });
        return formattedRow;
      });

      // Validate the formatted data
      const validation = validateCSV(formattedData);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }

      // Limit to 30 entries
      const limitedData = formattedData.slice(0, 30);
      setCalendarData(limitedData);

      if (formattedData.length > 30) {
        message.warning('Only the first 30 entries have been loaded.');
      } else {
        message.success('Google Sheet content loaded successfully!');
      }
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error);
      message.error(error.message || 'Failed to load Google Sheets content.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (calendarData.length === 0) {
      message.error('No content ideas to save.');
      return;
    }
    setIsSaving(true);
    await onSave(calendarData);
    setCalendarData([]);
    onClose();
    setIsSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col p-6 rounded-xl lg:w-3/4= w-11/12 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-gray-500 text-xl self-end hover:text-gray-800"
          onClick={onClose}
        >
          <FiX />
        </button>
        <h2 className="text-xl text-center mb-4">
          Upload Content Calendar <span> for {selectedProfileName}</span>
        </h2>

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
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendarModal;
