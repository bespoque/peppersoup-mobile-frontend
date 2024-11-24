export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    hour12: true,
  });
};

// export const formatDateWithTimeAndDay = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleString("en-US", {
//     day: "numeric",
//     hour: "numeric",
//   });
// };
export const formatDateWithTimeAndDay = (dateString: string): string => {
  const date = new Date(dateString);
  
  let hours = date.getHours();
  const minutes = date.getMinutes();
  
  // Determine if it's AM or PM
  const period = hours >= 12 ? 'PM' : 'AM';
  
  // Convert 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours) case
  
  // Format minutes with leading zero if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  
  // Return formatted time
  return `${hours}.${formattedMinutes}${period}`;
};


export const timeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  const timeFormats = [
    { unit: 'year', value: 31536000 },
    { unit: 'month', value: 2592000 },
    { unit: 'week', value: 604800 },
    { unit: 'day', value: 86400 },
    { unit: 'hour', value: 3600 },
    { unit: 'minute', value: 60 },
  ];

  for (const { unit, value } of timeFormats) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return count === 1 ? `${count} ${unit} ago` : `${count} ${unit}s ago`;
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