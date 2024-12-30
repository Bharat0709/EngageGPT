export const formatDate = (input) => {
  const [datePart, timePart] = input.split(', ');
  const [day, month, year] = datePart.split('/').map(Number);
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
      ? 'nd'
      : day % 10 === 3 && day !== 13
      ? 'rd'
      : 'th';

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [hours, minutes] = timePart.split(':');
  const period = hours < 12 || hours === '24' ? 'AM' : 'PM';
  const formattedHours = hours % 12 || 12;

  return `${day}${suffix} ${monthNames[month - 1]}, ${year
    .toString()
    .slice(2)} at ${formattedHours}:${minutes} ${period}`;
};
