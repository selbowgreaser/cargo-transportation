import InputSelector from "../../InputSelector";
import React, {useState} from "react";
import {Cargo} from "../../../api/models/Cargo";
import {Range, RangeKeyDict} from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import CustomDateRangePicker from "../../CustomDateRangePicker";
import {formatDateRange, isInDateRange} from "../../../utils/DateUtils";

type CargoSelectorBarProps = {
    cargoList: Cargo[]
    setFilteredCargoList: (cargo: Cargo[]) => void;
}

const CargoSelectorBar: React.FC<CargoSelectorBarProps> = (
    {
        cargoList,
        setFilteredCargoList,
    }) => {
    const arrivalCities = Array.from(new Set(cargoList.map(it => it.arrivalCity)))
    const departureCities = Array.from(new Set(cargoList.map(it => it.departureCity)))
    const cargoNames = Array.from(new Set(cargoList.map(it => it.name)))

    const [selectedArrivalCity, setSelectedArrivalCity] = useState("")
    const [selectedDepartureCity, setSelectedDepartureCity] = useState("")
    const [selectedCargoName, setSelectedCargoName] = useState("")

    const [isArrivalDateRangePickerVisible, setIsArrivalDateRangePickerVisible] = useState(false);
    const [isArrivalDateRangeSelected, setIsArrivalDateRangeSelected] = useState(false);
    const [arrivalDateRange, setArrivalDateRange] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        } as Range,
    );
    const [isDepartureDateRangePickerVisible, setIsDepartureDateRangePickerVisible] = useState(false);
    const [isDepartureDateRangeSelected, setIsDepartureDateRangeSelected] = useState(false);
    const [departureDateRange, setDepartureDateRange] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        } as Range,
    );

    const handleDateRangeChange = (
        rangeKeyDict: RangeKeyDict,
        setDateRange: (newDateRange: Range) => void,
        setIsDateRangePickerVisible: (visible: boolean) => void,
        setIsDateRangeSelected: (selected: boolean) => void,
    ) => {
        const newDateRange = rangeKeyDict.selection
        setDateRange(newDateRange)

        if (newDateRange.endDate!! > newDateRange.startDate!!) {
            setIsDateRangeSelected(true)
            setIsDateRangePickerVisible(false);
        }
    }

    const handleArrivalDateRangeChange = (rangeKeyDict: RangeKeyDict) => {
        handleDateRangeChange(
            rangeKeyDict,
            setArrivalDateRange,
            setIsArrivalDateRangePickerVisible,
            setIsArrivalDateRangeSelected,
        )
    }

    const handleArrivalDateRangeClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        event.stopPropagation();
        setIsArrivalDateRangePickerVisible(!isArrivalDateRangePickerVisible);
        setIsArrivalDateRangeSelected(true)
    };

    const handleDepartureDateRangeChange = (rangeKeyDict: RangeKeyDict) => {
        handleDateRangeChange(
            rangeKeyDict,
            setDepartureDateRange,
            setIsDepartureDateRangePickerVisible,
            setIsDepartureDateRangeSelected,
        )
    }

    const handleDepartureDateRangeClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        event.stopPropagation();
        setIsDepartureDateRangePickerVisible(!isDepartureDateRangePickerVisible);
        setIsDepartureDateRangeSelected(true)
    };

    const resetSelection = () => {
        setSelectedArrivalCity("")
        setSelectedDepartureCity("")
        setSelectedCargoName("")
        setIsArrivalDateRangePickerVisible(false)
        setIsArrivalDateRangeSelected(false)
        setIsDepartureDateRangePickerVisible(false)
        setIsDepartureDateRangeSelected(false)
    }

    const isDateInSelectedRange = (
        date: string,
        isRangeSelected: boolean,
        dateRange: Range,
    ): boolean => {
        if (!isRangeSelected) {
            return true
        }
        return isInDateRange(date, dateRange)
    }

    const filterCargoList = () => {
        const updatedCargoList = cargoList.filter(it =>
            (selectedCargoName.length === 0 || it.name === selectedCargoName)
            && (selectedArrivalCity.length === 0 || it.arrivalCity === selectedArrivalCity)
            && (selectedDepartureCity.length === 0 || it.departureCity === selectedDepartureCity)
            && isDateInSelectedRange(it.arrivalDate, isArrivalDateRangeSelected, arrivalDateRange)
            && isDateInSelectedRange(it.departureDate, isDepartureDateRangeSelected, departureDateRange)
        )
        setFilteredCargoList([...updatedCargoList])
    }

    return (
        <div className="max-w-screen-md">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                <h2 className="text-stone-700 text-xl font-bold">Примените фильтры</h2>
                <p className="mt-2 text-sm">Примените фильтры чтобы найти груз</p>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="flex flex-col">
                        <InputSelector
                            data={cargoNames}
                            placeholder={"Название"}
                            selected={selectedCargoName}
                            setSelected={setSelectedCargoName}
                        />
                    </div>
                    <div className="flex flex-col">
                        <InputSelector
                            data={departureCities}
                            placeholder={"Город отправки"}
                            selected={selectedDepartureCity}
                            setSelected={setSelectedDepartureCity}
                        />
                    </div>
                    <div className="flex flex-col">
                        <InputSelector
                            data={arrivalCities}
                            placeholder={"Город прибытия"}
                            selected={selectedArrivalCity}
                            setSelected={setSelectedArrivalCity}
                        />
                    </div>
                    <CustomDateRangePicker
                        isVisible={isDepartureDateRangePickerVisible}
                        dateRange={departureDateRange}
                        onClick={handleDepartureDateRangeClick}
                        onDateRangeChange={handleDepartureDateRangeChange}
                        placeholder={isDepartureDateRangeSelected ?
                            formatDateRange(departureDateRange) : "Дата отправки"}
                    />
                    <CustomDateRangePicker
                        isVisible={isArrivalDateRangePickerVisible}
                        dateRange={arrivalDateRange}
                        onClick={handleArrivalDateRangeClick}
                        onDateRangeChange={handleArrivalDateRangeChange}
                        placeholder={isArrivalDateRangeSelected ?
                            formatDateRange(arrivalDateRange) : "Дата прибытия"}
                    />
                </div>

                <div className="mt-8 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                    <button
                        className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90"
                        onClick={resetSelection}
                    >
                        Сбросить
                    </button>
                    <button
                        className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
                        onClick={filterCargoList}
                    >
                        Найти
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CargoSelectorBar;