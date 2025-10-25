// utils/dateUtils.js
export const dateUtils = {
  // Get start of day
  startOfDay: (date = new Date()) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  },

  // Get end of day
  endOfDay: (date = new Date()) => {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  },

  // Add days to date
  addDays: (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  },

  // Get time ago string
  getTimeAgo: (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return \\ min ago\;
    if (diffInSeconds < 86400) return \\ hours ago\;
    if (diffInSeconds < 2592000) return \\ days ago\;
    
    return new Date(date).toLocaleDateString();
  },

  // Format for API
  formatForAPI: (date) => {
    return new Date(date).toISOString();
  },

  // Check if date is today
  isToday: (date) => {
    const today = new Date();
    const checkDate = new Date(date);
    return checkDate.toDateString() === today.toDateString();
  },

  // Check if date is this week
  isThisWeek: (date) => {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    const checkDate = new Date(date);
    return checkDate >= weekStart && checkDate <= weekEnd;
  },

  // Get business days between two dates
  getBusinessDaysBetween: (startDate, endDate) => {
    let count = 0;
    const current = new Date(startDate);
    while (current <= endDate) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  },
};

export default dateUtils;
