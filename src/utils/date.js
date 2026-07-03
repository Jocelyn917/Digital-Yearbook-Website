export function formatDate(dateValue) {
  if (!dateValue) return '';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${dateValue}T00:00:00`));
}

export function formatTime(timeValue) {
  if (!timeValue) return '';
  const [hour, minute] = timeValue.split(':');
  return new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(2026, 0, 1, Number(hour), Number(minute)));
}

export function sortUpcoming(items) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return [...items]
    .filter((item) => new Date(`${item.date}T00:00:00`) >= today)
    .sort((a, b) => `${a.date}${a.time || ""}`.localeCompare(`${b.date}${b.time || ""}`));
}
