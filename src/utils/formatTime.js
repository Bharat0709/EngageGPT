export const formatTo12Hour = (timeStr) => {
  const [hour, minute] = timeStr.split(':');
  const date = new Date();
  date.setHours(+hour);
  date.setMinutes(+minute);

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export const convertTo24Hour = (time12h) => {
  const [time, ampm] = time12h.split(' ');
  const [hours, minutes] = time.split(':');
  let hour24 = parseInt(hours);

  if (ampm === 'PM' && hour24 !== 12) {
    hour24 += 12;
  } else if (ampm === 'AM' && hour24 === 12) {
    hour24 = 0;
  }

  return `${String(hour24).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}`;
};
