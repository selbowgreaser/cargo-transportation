import {Cargo} from "../../../api/models/Cargo";
import React from "react";
import CargoItem from "./CargoItem";

type CargoItemListProps = {
    filteredCargoList: Cargo[];
    setFilteredCargoList: (cargo: Cargo[]) => void;
    cargoList: Cargo[];
    setCargoList: (cargo: Cargo[]) => void;
}

const CargoItemList: React.FC<CargoItemListProps> = (
    {
        filteredCargoList,
        setFilteredCargoList,
        cargoList,
        setCargoList,
    }) => {

    const setCargo = (cargo: Cargo) => {
        const index = cargoList.findIndex(it => it.id === cargo.id);
        const updatedCargoList = [
            ...cargoList.slice(0, index),
            cargo,
            ...cargoList.slice(index + 1)
        ];
        setCargoList(updatedCargoList);
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
                            <a href="frontend/src/components/cargo#">
                                <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg>
                            </a>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Город прибытия
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center">
                            Дата прибытия
                            <a href="frontend/src/components/cargo#">
                                <svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg>
                            </a>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
                </thead>
                <tbody>
                {filteredCargoList.length
                    ?
                    filteredCargoList.map((cargo) => (
                        <CargoItem
                            key={cargo.id}
                            cargo={cargo}
                            setCargo={setCargo}
                        />
                    ))
                    :
                    <div>
                        No cargo found
                    </div>
                }
                </tbody>
            </table>
        </div>
    )
}

export default CargoItemList;