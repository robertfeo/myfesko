export const formatDate = (dateString : Date) => {
    if (dateString) {
        // Create a new Date object using the date string
        const date = new Date(dateString);
        // Use Intl.DateTimeFormat to format the date as desired, e.g., 'March 10, 2024'
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    }
    return null;
};
