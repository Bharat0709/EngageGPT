import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const parsedData = Papa.parse(text, { header: true }).data;

      const validatedData = parsedData.filter(
        (row) => row.Title && row.DateTime,
      );

      if (validatedData.length === 0) {
        message.error('No valid content found in the file.');
        return;
      }

      // Convert DateTime to AM/PM format
      const formattedData = validatedData.map((row) => {
        const date = new Date(row.DateTime);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours % 12}:${
          minutes < 10 ? '0' : ''
        }${minutes} ${period}`;

        return { ...row, Time: formattedTime };
      });

      setCalendarData(formattedData);
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

    try {
      setLoading(true);
      const fetchedData = [
        { Title: 'Topic 1', DateTime: '2025-01-02T10:00:00' },
        { Title: 'Topic 2', DateTime: '2025-01-03T14:00:00' },
      ]; // Placeholder data

      // Convert DateTime to AM/PM format
      const formattedData = fetchedData.map((row) => {
        const date = new Date(row.DateTime);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours % 12}:${
          minutes < 10 ? '0' : ''
        }${minutes} ${period}`;

        return { ...row, Time: formattedTime };
      });

      setCalendarData(formattedData);
      message.success('Google Sheet content loaded successfully!');
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch content from Google Sheet.');
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
            Download Sample CSV Template
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
          <button
            type="button"
            onClick={fetchGoogleSheetData}
            disabled={loading}
            className="mt-2 bg-gray-100 text-black  hover:bg-gray-200 w-full text-sm px-4 py-2 rounded-lg"
          >
            {loading ? 'Fetching...' : 'Fetch Content Ideas'}
          </button>
        </div>

        <div>
          {calendarData.length > 0 && (
            <ul className="mt-2">
              {calendarData.map((data, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-100 rounded-lg p-2 mb-2"
                >
                  <span className="text-sm">{data.Title}</span>
                  <span className="text-sm">
                    {data.DateTime} - {data.Time}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

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
