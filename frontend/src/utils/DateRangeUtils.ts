import {RangeKeyDict} from "react-date-range";

export const isDateRangeSelected = (
    rangeKeyDict: RangeKeyDict,
    isStartDateSelect: boolean,
) => {
    const dateRange = rangeKeyDict.selection
    const startDate = dateRange.startDate!!
    const endDate = dateRange.endDate!!

    return (endDate > startDate)
        || (isStartDateSelect && endDate.toLocaleDateString() === startDate.toLocaleDateString())
}