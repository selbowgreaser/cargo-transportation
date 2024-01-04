import {Cargo} from "../../../api/models/Cargo";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import CargoItem from "./CargoItem";
import {compareDates} from "../../../utils/DateUtils";
import CustomLoader from "../../CustomLoader";

type CargoItemListProps = {
    sortedAndFilteredCargoList: Cargo[];
    setCargo: (cargo: Cargo) => void;
    removeCargo: (cargo: Cargo) => void;
    setComparator: Dispatch<SetStateAction<(a: Cargo, b: Cargo) => number>>;
    filterPredicate: (cargo: Cargo) => void;
}

enum SortingState {
    NOT_SELECTED,
    ASCENDING,
    DESCENDING,
}

const CargoItemList: React.FC<CargoItemListProps> = (
    {
        sortedAndFilteredCargoList,
        setCargo,
        removeCargo,
        setComparator,
        filterPredicate,
    }) => {

    const [isToastVisible, setIsToastVisible] = useState(false);
    const [departureDateSortingState, setDepartureDateSortingState] = useState(SortingState.NOT_SELECTED)
    const [arrivalDateSortingState, setArrivalDateSortingState] = useState(SortingState.NOT_SELECTED)

    const byDepartureDateComparator = (a: Cargo, b: Cargo) => {
        const isAscending = departureDateSortingState === SortingState.ASCENDING
        return compareDates(new Date(a.departureDate), new Date(b.departureDate), isAscending)
    }

    const byArrivalDateComparator = (a: Cargo, b: Cargo) => {
        const isAscending = arrivalDateSortingState === SortingState.ASCENDING
        return compareDates(new Date(a.arrivalDate), new Date(b.arrivalDate), isAscending)
    }

    useEffect(() => {
        if (departureDateSortingState !== SortingState.NOT_SELECTED) {
            setComparator(() => byDepartureDateComparator)
            setArrivalDateSortingState(SortingState.NOT_SELECTED)
        }
    }, [departureDateSortingState])

    useEffect(() => {
        if (arrivalDateSortingState !== SortingState.NOT_SELECTED) {
            setComparator(() => byArrivalDateComparator)
            setDepartureDateSortingState(SortingState.NOT_SELECTED)
        }
    }, [arrivalDateSortingState])

    useEffect(() => {
        setDepartureDateSortingState(SortingState.NOT_SELECTED)
        setArrivalDateSortingState(SortingState.NOT_SELECTED)
    }, [filterPredicate])

    const switchSortingState = (
        sortingState: SortingState,
        setSortingState: (sortingState: SortingState) => void
    ) => {
        if (sortingState === SortingState.NOT_SELECTED || sortingState === SortingState.ASCENDING) {
            setSortingState(SortingState.DESCENDING)
        } else {
            setSortingState(SortingState.ASCENDING)
        }
    }

    return (
        <div className="relative mt-8 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Название
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/4">
                        Содержимое
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Город отправки
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                            Дата отправки
                            <div
                                className="cursor-pointer"
                                onClick={() => switchSortingState(departureDateSortingState, setDepartureDateSortingState)}
                            >
                                {departureDateSortingState === SortingState.NOT_SELECTED
                                    ?
                                    <svg className="mx-2 h-4 w-4 text-black" width="24" height="24" viewBox="0 0 24 24"
                                         strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z"/>
                                        <path d="M3 9l4-4l4 4m-4 -4v14"/>
                                        <path d="M21 15l-4 4l-4-4m4 4v-14"/>
                                    </svg>
                                    :
                                    departureDateSortingState === SortingState.DESCENDING
                                        ?
                                        <svg className="mx-2 h-4 w-4 text-black" width="24" height="24" viewBox="0 0 24 24"
                                             strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <line x1="12" y1="5" x2="12" y2="19"/>
                                            <line x1="16" y1="15" x2="12" y2="19"/>
                                            <line x1="8" y1="15" x2="12" y2="19"/>
                                        </svg>
                                        :
                                        <svg className="mx-2 h-4 w-4 text-black" width="24" height="24" viewBox="0 0 24 24"
                                             strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <line x1="12" y1="5" x2="12" y2="19"/>
                                            <line x1="16" y1="9" x2="12" y2="5"/>
                                            <line x1="8" y1="9" x2="12" y2="5"/>
                                        </svg>
                                }
                            </div>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Город прибытия
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                            Дата прибытия
                            <div
                                className="cursor-pointer"
                                onClick={() => switchSortingState(arrivalDateSortingState, setArrivalDateSortingState)}
                            >
                                {arrivalDateSortingState === SortingState.NOT_SELECTED
                                    ?
                                    <svg className="mx-2 h-4 w-4 text-black" width="24" height="24" viewBox="0 0 24 24"
                                         strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z"/>
                                        <path d="M3 9l4-4l4 4m-4 -4v14"/>
                                        <path d="M21 15l-4 4l-4-4m4 4v-14"/>
                                    </svg>
                                    :
                                    arrivalDateSortingState === SortingState.DESCENDING
                                        ?
                                        <svg className="mx-2 h-4 w-4 text-black" width="24" height="24" viewBox="0 0 24 24"
                                             strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <line x1="12" y1="5" x2="12" y2="19"/>
                                            <line x1="16" y1="15" x2="12" y2="19"/>
                                            <line x1="8" y1="15" x2="12" y2="19"/>
                                        </svg>
                                        :
                                        <svg className="mx-2 h-4 w-4 text-black" width="24" height="24" viewBox="0 0 24 24"
                                             strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                                             strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z"/>
                                            <line x1="12" y1="5" x2="12" y2="19"/>
                                            <line x1="16" y1="9" x2="12" y2="5"/>
                                            <line x1="8" y1="9" x2="12" y2="5"/>
                                        </svg>
                                }
                            </div>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedAndFilteredCargoList.length
                    ?
                    sortedAndFilteredCargoList.map((cargo) => (
                        <CargoItem
                            key={cargo.id}
                            cargo={cargo}
                            setCargo={setCargo}
                            removeCargo={removeCargo}
                            isToastVisible={isToastVisible}
                            setIsToastVisible={setIsToastVisible}
                        />
                    ))
                    :
                    <div/>
                }
                {
                    sortedAndFilteredCargoList.length === 1 && <div className="mb-20"/>
                }
                </tbody>
            </table>
            {!sortedAndFilteredCargoList.length &&
                <div className="h-[200px] flex items-center justify-center">
                    Грузы не найдены
                </div>
            }
        </div>
    )
}

export default CargoItemList;