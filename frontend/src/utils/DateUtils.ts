import {Range} from "react-date-range";

export const formatDateRange = (dateRange: Range): string => {
    if (dateRange.startDate?.toLocaleDateString()!! === dateRange.endDate?.toLocaleDateString()!!) {
        return `${dateRange.startDate?.toLocaleDateString()}`
    }
    return `${dateRange.startDate?.toLocaleDateString()} - ${dateRange.endDate?.toLocaleDateString()}`
}

export const formatISODateToLocalDate = (dateISO: string): string => {
    return new Date(dateISO).toLocaleDateString()
}

export const formatLocalDateToISO = (localDate: Date): string => {
    return localDate.toLocaleDateString('sv')
}

export const isInDateRange = (dateStr: string, dateRange: Range): boolean => {
    const date = new Date(dateStr)

    if (isNaN(date.getDate())) {
        return false
    }

    const startDate = dateRange.startDate!!
    const endDate = dateRange.endDate!!

    return (date > startDate && date < endDate)
        || (date.toLocaleDateString() === startDate.toLocaleDateString())
        || (date.toLocaleDateString() === endDate.toLocaleDateString())
}

export const compareDates = (date1: Date, date2: Date, isAscending: boolean = true): number => {
    let result;

    if (date1 < date2) {
        result = -1
    } else if (date1 > date2) {
        result = 1
    } else {
        result = 0
    }

    if (isAscending) {
        return result
    } else {
        return -result
    }
}