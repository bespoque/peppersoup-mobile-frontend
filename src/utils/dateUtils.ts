export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

export const formatDateWithTimeAndDay = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    day: "numeric",
    hour: "numeric",
  });
};

export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return interval === 1 ? `${interval} ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }

  return "just now";
};

export const formatDateTimeFromString = (dateString: string): string => {
  // Create a Date object from the input date string
  const date = new Date(dateString);

  // Get the year, month, day, hours, minutes, and seconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Return the formatted date string in "YYYY-MM-DD HH:MM:SS" format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};