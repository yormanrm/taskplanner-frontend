import { formatDate } from "./format-dates.function";

export function getCurrentWeek(date: Date): { start: string, end: string } {

    let start: string | Date = new Date(date);
    let end: string | Date = new Date(date);

    // Reset the number of days until Monday
    start.setDate(date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1));

    // Add the number of days until you reach Sunday
    end.setDate(date.getDate() + (date.getDay() === 0 ? 0 : 7 - date.getDay()));

    start = formatDate(start);
    end = formatDate(end);

    return { start, end };

}

export function getLastWeek(date: Date): { start: string, end: string } {

    let start: string | Date = new Date(date);
    let end: string | Date = new Date(date);

    // Reset the number of days until Monday
    start.setDate(date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1) - 7);

    // Add the number of days until you reach Sunday
    end.setDate(date.getDate() + (date.getDay() === 0 ? 0 : 7 - date.getDay()) - 7);

    start = formatDate(start);
    end = formatDate(end);

    return { start, end };

}

export function getThisMonth(date: Date): { start: string, end: string } {

    let start: string | Date = new Date(date.getFullYear(), date.getMonth(), 1);
    let end: string | Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    start = formatDate(start);
    end = formatDate(end);

    return { start, end };

}

export function getLastMonth(date: Date): { start: string, end: string } {

    let start: string | Date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    let end: string | Date = new Date(date.getFullYear(), date.getMonth(), 0);

    start = formatDate(start);
    end = formatDate(end);

    return { start, end };

}

export function getThisYear(date: Date): { start: string, end: string } {

    let start: string | Date = new Date(date.getFullYear(), 0, 1); // 1ro de enero del año en curso
    let end: string | Date = new Date(date);

    // Add the number of days until you reach Sunday
    end.setDate(date.getDate() + (date.getDay() === 0 ? 0 : 7 - date.getDay()));

    start = formatDate(start);
    end = formatDate(end);

    return { start, end };

}