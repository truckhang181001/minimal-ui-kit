import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function fInstant(dataString, isEndDate) {
  const date = new Date(dataString);
  // Set the time to midnight (00:00:00) of the same date
  date.setHours(isEndDate ? 24 : 0, 0, 0, 0);
  // Convert to ISO string (UTC)
  return date.toISOString();
}
