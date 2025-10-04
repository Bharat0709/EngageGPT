import { useState, useEffect } from 'react';
import {
  FiX,
  FiCalendar,
  FiLink,
  FiUpload,
  FiClock,
  FiFile,
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
} from 'react-icons/fi';
import { useNotifications } from '@components/Common/Notification';
import { fetchSheetDetails } from '@services/Members';
import dayjs from 'dayjs';

const ContentCalendarModal = ({
  selectedProfileName,
  isOpen,
  onClose,
  onSave,
}) => {
  const message = useNotifications();
  const [calendarData, setCalendarData] = useState([]);
  const [googleSheetLink, setGoogleSheetLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState(null);
  const [validationSuccess, setValidationSuccess] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCalendarData([]);
      setGoogleSheetLink('');
      setValidationErrors(null);
      setValidationSuccess(false);
    }
  }, [isOpen]);

  const validateCSV = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return { isValid: false, message: 'No data found in the sheet.' };
    }

    const requiredHeaders = ['Title', 'Date', 'Time'];
    const headers = Object.keys(data[0]);
    const isValidHeader = requiredHeaders.every((header) =>
      headers.includes(header),
    );
    if (!isValidHeader) {
      return {
        isValid: false,
        message: `Missing required headers: ${requiredHeaders
          .filter((h) => !headers.includes(h))
          .join(', ')}`,
      };
    }

    const today = dayjs().startOf('day');
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(am|pm|AM|PM)$/;
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

    // Check for empty values and date validation in rows
    for (const [index, row] of data.entries()) {
      // Check for empty fields
      for (const header of requiredHeaders) {
        if (!row[header] || row[header].trim() === '') {
          return {
            isValid: false,
            message: `Empty ${header.toLowerCase()} in row ${index + 1}: "${
              row.Title || 'Untitled'
            }"`,
            rowIndex: index,
          };
        }
      }

      const rowDate = dayjs(row.Date, 'DD-MM-YYYY', true);
      if (!dateRegex.test(row.Date)) {
        return {
          isValid: false,
          message: `Invalid date format in row ${index + 1}: "${
            row.Title
          }". Use DD-MM-YYYY format.`,
          rowIndex: index,
        };
      }

      // Check if date is not before today
      if (rowDate.isBefore(today)) {
        return {
          isValid: false,
          message: `Past date detected in row ${index + 1}: "${
            row.Title
          }". Only use today or future dates.`,
          rowIndex: index,
        };
      }

      // Check for valid time format
      if (!timeRegex.test(row.Time)) {
        return {
          isValid: false,
          message: `Invalid time format in row ${index + 1}: "${
            row.Title
          }". Use HH:MM am/pm format.`,
          rowIndex: index,
        };
      }
    }

    return { isValid: true };
  };

  const fetchGoogleSheetData = async () => {
    // Reset validation states
    setValidationErrors(null);
    setValidationSuccess(false);

    if (!googleSheetLink?.trim()) {
      setValidationErrors('Please enter a valid Google Sheet link');
      return;
    }

    if (!googleSheetLink.includes('docs.google.com/spreadsheets')) {
      setValidationErrors(
        'The URL provided does not appear to be a Google Sheet link',
      );
      return;
    }

    try {
      setLoading(true);
      const fetchedData = await fetchSheetDetails(googleSheetLink);

      if (!fetchedData?.headers || !Array.isArray(fetchedData.rows)) {
        throw new Error(
          'Invalid response format from the sheet. Check permissions and sheet structure.',
        );
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
        setValidationErrors(validation.message);
        return;
      }

      // Limit to 30 entries
      const limitedData = formattedData.slice(0, 30);
      setCalendarData(limitedData);
      setValidationSuccess(true);

      if (formattedData.length > 30) {
        message.warning(
          'Only the first 30 entries have been loaded to ensure optimal performance.',
        );
      }
    } catch (error) {
      setValidationErrors(
        error.message ||
          'Failed to load sheet content. Ensure the sheet is publicly accessible.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (calendarData.length === 0) {
      setValidationErrors('No content ideas to save. Please fetch data first.');
      return;
    }

    try {
      setIsSaving(true);
      await onSave(calendarData);
      setCalendarData([]);
      onClose();
    } catch (error) {
      setValidationErrors('Error saving data. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white flex flex-col rounded-2xl shadow-xl lg:h-3/4 overflow-y-scroll scrollbar-hide  lg:w-2/3 w-11/12 max-w-4xl overflow-hidden">
        {/* Header */}
        <div className="bg-indigo-50 px-6 py-4 flex justify-between items-center border-b border-indigo-100">
          <div className="flex items-center gap-3">
            <FiCalendar className="text-indigo-600 text-xl" />
            <h2 className="text-xl font-bold text-indigo-800">
              Upload Content Calendar
            </h2>
          </div>
          <button
            className="text-gray-500 hover:text-gray-800 hover:bg-indigo-100 p-2 rounded-full transition-colors"
            onClick={onClose}
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Profile info */}
          <div className="mb-2 bg-indigo-50 p-4 rounded-lg flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <span className="font-semibold text-indigo-700">
                {selectedProfileName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium  mb-0">Scheduling content for</p>
              <h3 className="text-lg mt-1 mb-0 font-bold text-indigo-800">
                {selectedProfileName}
              </h3>
            </div>
          </div>

          {/* Template link */}
          <div className="mb-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h3 className="font-medium text-yellow-800 mb-2 flex items-center gap-2">
              <FiFile /> Need a template?
            </h3>
            <p className="text-yellow-700 text-sm mb-3">
              Use our sample template to format your content calendar correctly
              with the required fields.
            </p>
            <a
              href="https://docs.google.com/spreadsheets/d/154AYzvUd6pbiu1_XndZsEb9n3zq_Es1QPBCrzSaClfg/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm inline-flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-100 text-yellow-800 px-4 py-2 rounded-lg transition-colors"
            >
              <FiUpload size={16} /> View Sample Template
            </a>
          </div>

          {/* Google Sheet Input */}
          <div className="mb-6">
            <label
              htmlFor="googleSheetLink"
              className="block text-sm mb-2 font-medium text-gray-700"
            >
              Google Sheet URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLink className="text-gray-400" />
              </div>
              <input
                id="googleSheetLink"
                type="text"
                placeholder="Paste your Google Sheet link here"
                value={googleSheetLink}
                onChange={(e) => setGoogleSheetLink(e.target.value)}
                className="pl-10 pr-2 py-2 text-sm block w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 flex items-center gap-1">
              <FiAlertCircle size={14} />
              Sheet must be set to "Anyone with the link can view"
            </p>
          </div>

          {/* Validation Messages */}
          {validationErrors && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 flex items-center gap-2">
                <FiAlertCircle /> {validationErrors}
              </p>
            </div>
          )}

          {validationSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 flex items-center gap-2">
                <FiCheckCircle /> Content loaded successfully!
              </p>
            </div>
          )}

          {/* Fetch Button */}
          <button
            type="button"
            onClick={fetchGoogleSheetData}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg mb-6 ${
              loading
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-sky-900 hover:bg-indigo-700 text-white'
            } transition-colors`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" /> Fetching Data...
              </>
            ) : (
              <>
                <FiUpload /> Load Content Ideas
              </>
            )}
          </button>

          {/* Content Preview */}
          {calendarData.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiCalendar /> Content Preview ({calendarData.length} items)
              </h3>
              <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg bg-gray-50">
                <ul className="divide-y divide-gray-200">
                  {calendarData.map((data, index) => (
                    <li key={index} className="p-3 hover:bg-gray-100">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">
                            {data.Title}
                          </h4>
                          {data.Description && (
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {data.Description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <FiCalendar size={14} /> {data.Date}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiClock size={14} /> {data.Time}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={calendarData.length === 0 || isSaving}
            className={`px-5 py-2 font-medium rounded-lg flex items-center gap-2 ${
              calendarData.length === 0 || isSaving
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
            } transition-colors`}
          >
            {isSaving ? (
              <>
                <FiLoader className="animate-spin" /> Saving...
              </>
            ) : (
              'Save Calendar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentCalendarModal;
