export function getTime(date: Date): string {
    const d = new Date(date);
    let hours: number = d.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours =  hours % 12 || 12;
    const minutes: number = d.getMinutes();

    const formattedTime: string = `${hours == 0 ? '0' : ''}${hours}:${minutes <= 9 ? '0' : ''}${minutes} ${ampm}`;

    return formattedTime;
}

export function getDate(date: Date): string {
    const d = new Date(date);
    const year: number = d.getFullYear();
    const month: number = d.getMonth() + 1; // Months are zero-indexed, so we add 1
    const day: number = d.getDate();

    const formattedDate: string = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;

    return formattedDate;
}

export function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
}

export function getPositiveTimeDifferenceInSeconds(timeoutDate: Date): number {
    // Get the current date
    const currentDate: Date = new Date();

    // Calculate the difference in milliseconds
    const timeDifference: number = timeoutDate.getTime() - currentDate.getTime();

    // Check if the difference is positive
    if (timeDifference > 0) {
        // Convert milliseconds to seconds
        const seconds: number = Math.floor(timeDifference / 1000);
        return seconds;
    } else {
        // If the difference is negative or zero, return 0
        return 0;
    }
}