import { FiClock, FiCheckCircle, FiEdit3, FiAlertCircle } from 'react-icons/fi';

// Format date and time for display
export const formatDateTime = (date, time, timeZone) => {
  if (!date || !time || !timeZone) return 'Invalid Date';

  try {
    // Convert DD-MM-YYYY format to YYYY-MM-DD for Date object compatibility
    const [day, month, year] = date.split('-');
    let formattedTimeFormat = time; // Assume time is in HH:MM:SS format

    // If time is in HH:MM format, append ":00"
    if (!time.includes(':')) {
      throw new Error('Invalid time format');
    }

    const timeParts = time.split(':');
    if (timeParts.length === 2) {
      formattedTimeFormat = `${time}:00`; // Convert HH:MM → HH:MM:SS
    }

    const formattedDateStr = `${year}-${month}-${day}T${formattedTimeFormat}`;

    // Create a Date object using the provided date and time
    const dateObj = new Date(formattedDateStr);

    // Format date as "Friday, Jan 31, 2025"
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    // Format time as "10:00 PM"
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    // Return the formatted string with the given time zone (without conversion)
    return `${formattedDate}, ${formattedTime} (${timeZone})`;
  } catch (error) {
    return 'Invalid Date';
  }
};

// Get status color for tags
export const getStatusColor = (status) => {
  switch (status) {
    case 'Scheduled':
      return 'blue';
    case 'Posted':
      return 'green';
    case 'Draft':
      return 'orange';
    case 'Failed':
      return 'red';
    default:
      return 'default';
  }
};

// Get status icon for display
export const getStatusIcon = (status) => {
  switch (status) {
    case 'Scheduled':
    case 'scheduled':
      return <FiClock className="text-blue-500" />;
    case 'Posted':
    case 'posted':
      return <FiCheckCircle className="text-green-500" />;
    case 'Draft':
    case 'drafts':
      return <FiEdit3 className="text-orange-500" />;
    case 'Failed':
    case 'failed':
      return <FiAlertCircle className="text-red-500" />;
    default:
      return <FiClock className="text-gray-500" />;
  }
};

// Get current posts based on active tab
export const getCurrentPosts = (postHistory, activeTab) => {
  switch (activeTab) {
    case 'scheduled':
      return postHistory.scheduled;
    case 'posted':
      return postHistory.posted;
    case 'drafts':
      return postHistory.drafts;
    case 'failed':
      return postHistory.failed;
    default:
      return [];
  }
};
