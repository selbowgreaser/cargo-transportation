import {Range} from "react-date-range";

export const formatDateRange = (dateRange: Range): string => {
    if (dateRange.startDate?.toLocaleDateString()!! === dateRange.endDate?.toLocaleDateString()!!) {
        return `${dateRange.startDate?.toLocaleDateString()}`
    }
    return `${dateRange.startDate?.toLocaleDateString()} - ${dateRange.endDate?.toLocaleDateString()}`
}

export const formatDateISO = (dateISO: string): string => {
    return new Date(dateISO).toLocaleDateString()
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