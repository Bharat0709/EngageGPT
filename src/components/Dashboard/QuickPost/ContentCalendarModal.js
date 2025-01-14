import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { message } from 'antd';
import { fetchSheetDetails } from '../../../network/Members';
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

  const validateCSV = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return { isValid: false, message: 'No data found in the CSV file.' };
    }

    const requiredHeaders = ['Title', 'Date', 'Time'];
    const headers = Object.keys(data[0]);
    const isValidHeader = requiredHeaders.every((header) =>
      headers.includes(header),
    );
    if (!isValidHeader) {
      return { isValid: false, message: 'Invalid headers in the CSV file.' };
    }

    const today = dayjs().startOf('day');
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(am|pm|AM|PM)$/;
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

    // Check for empty values and date validation in rows
    for (const row of data) {
      // Check for empty fields
      for (const header of requiredHeaders) {
        if (!row[header] || row[header].trim() === '') {
          return {
            isValid: false,
            message: `Empty field detected in row: ${row.Title}, column: ${header}`,
          };
        }
      }

      const rowDate = dayjs(row.Date, 'DD-MM-YYYY', true);
      if (dateRegex.test(row.Date)) {
        return {
          isValid: false,
          message: `Invalid date format or impossible date for row: ${row.Title}`,
        };
      }

      // Check if date is not before today
      if (rowDate.isBefore(today)) {
        return {
          isValid: false,
          message: `Date must be today or future date for row: ${row.Title}`,
        };
      }

      // Check for valid time format
      if (!timeRegex.test(row.Time)) {
        return {
          isValid: false,
          message: `Invalid time format for row: ${row.Title}. Expected format: HH:MM am/pm or HH:MM AM/PM`,
        };
      }
    }

    return { isValid: true };
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
          <a
            href="https://docs.google.com/spreadsheets/d/154AYzvUd6pbiu1_XndZsEb9n3zq_Es1QPBCrzSaClfg/edit?gid=0#gid=0"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm mb-2 self-center w-fit mx-auto bg-white border border-gray-300 text-black px-4 py-2 rounded-lg"
          >
            View Sample Template
          </a>
        </div>

        <div className="mb-4">
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
                  className="flex lg:items-center lg:flex-row flex-col items-start gap-2 justify-between bg-gray-100 rounded-lg p-2 mb-2"
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
