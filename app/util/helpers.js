// Convert local Date to UTC Date
export const convertToUTC = (localDate) => {
    if (!localDate) return null;
    const timezoneOffset = localDate.getTimezoneOffset() * 60000; // offset in ms
    return new Date(localDate.getTime() - timezoneOffset);
};

// Get UTC start and end of day range for a given UTC date
export const getUTCDateRange = (utcDate) => {
    if (!utcDate) return { start: null, end: null };

    const year = utcDate.getUTCFullYear();
    const month = utcDate.getUTCMonth();
    const day = utcDate.getUTCDate();

    // Start of day UTC (midnight)
    const start = new Date(Date.UTC(year, month, day, 0, 0, 0, 0));

    // End of day UTC (just before midnight)
    const end = new Date(Date.UTC(year, month, day, 23, 59, 59, 999));

    return { start, end };
};

export const formatTimestamp = (seconds, nanoseconds) => {
    // Convert seconds to milliseconds
    const milliseconds = seconds * 1000;

    // Convert nanoseconds to milliseconds (1 nanosecond = 0.000001 millisecond)
    const nanoMilliseconds = nanoseconds / 1e6;

    // Total milliseconds
    const totalMilliseconds = milliseconds + nanoMilliseconds;

    // Create Date object
    const date = new Date(totalMilliseconds);

    // Format to human-readable string (local time)
    return date.toLocaleString(); // Or use toISOString() for ISO format
};
