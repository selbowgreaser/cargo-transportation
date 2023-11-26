import {Range} from "react-date-range";

export const formatDateRange = (dateRange: Range): string => {
    if (dateRange.startDate?.getDate() === dateRange.endDate?.getDate()) {
        return `${dateRange.startDate?.toLocaleDateString()}`
    }
    return `${dateRange.startDate?.toLocaleDateString()} - ${dateRange.endDate?.toLocaleDateString()}`
}

export const formatDateISO = (dateISO: string): string => {
    return new Date(dateISO).toLocaleDateString()
}

export const isInDateRange = (dateStr: string, dateRange: Range): boolean => {
    const date = new Date(dateStr).getDate()

    if (isNaN(date)) {
        return false
    }

    const startDate = dateRange.startDate?.getDate()!!
    const endDate = dateRange.endDate?.getDate()!!

    return date >= startDate && date <= endDate
}