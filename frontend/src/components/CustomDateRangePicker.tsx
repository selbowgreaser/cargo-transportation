import {DateRangePicker, Range, RangeKeyDict} from "react-date-range";
import React from "react";
import {Combobox} from "@headlessui/react";

type CustomDateRangePickerProps = {
    isVisible: boolean;
    dateRange: Range;
    onClick: (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
    onDateRangeChange: (item: RangeKeyDict) => void;
    placeholder: string;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = (
    {
        isVisible,
        dateRange,
        onClick,
        onDateRangeChange,
        placeholder,
    }) => {
    return (
        <div>
            <Combobox>
                <div onClick={onClick} className="relative mt-1">
                    <div
                        className="relative w-full cursor-pointer overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <div
                            className="w-full outline-none border-none py-2 pl-1 leading-5 focus:ring-0">
                            <div className="flex w-full">
                                <div className="relative w-full">
                                    <div className="ml-2 text-gray-400">
                                        {placeholder}
                                    </div>
                                    <svg className="absolute inset-y-1 right-3 w-4 h-4 text-gray-400 dark:text-gray-400" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Combobox>
            <div>
                {isVisible &&
                    <div
                        onClick={e => e.stopPropagation()}
                        className="collapsable-content absolute bg-white z-10 mt-1 p-4 border border-gray-300 rounded">
                        <DateRangePicker
                            onChange={onDateRangeChange}
                            showPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            ranges={[dateRange]}
                            direction="horizontal"
                        />
                    </div>
                }
            </div>
        </div>
    )
}

export default CustomDateRangePicker;