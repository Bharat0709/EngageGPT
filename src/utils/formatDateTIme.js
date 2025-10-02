export const formatDateTimeForAPI = (dateTime) => {
  if (!dateTime) return { date: null, time: null };

  const day = String(dateTime.getDate()).padStart(2, '0');
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const year = dateTime.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  const hours = String(dateTime.getHours()).padStart(2, '0');
  const minutes = String(dateTime.getMinutes()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;

  return { date: formattedDate, time: formattedTime };
};
