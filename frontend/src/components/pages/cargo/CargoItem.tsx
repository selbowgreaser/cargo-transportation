import React, {useState} from "react";
import {Cargo} from "../../../api/models/Cargo";
import {formatISODateToLocalDate} from "../../../utils/DateUtils";
import CargoEditModal from "./CargoEditModal";
import {Dropdown} from 'flowbite-react';
import CargoDeleteModal from "./CargoDeleteModal";

type CargoItemProps = {
    cargo: Cargo;
    setCargo: (cargo: Cargo) => void;
    removeCargo: (cargo: Cargo) => void;
    isToastVisible: boolean;
    setIsToastVisible: (isVisible: boolean) => void;
}

const CargoItem: React.FC<CargoItemProps> = (
    {
        cargo,
        setCargo,
        removeCargo,
        isToastVisible,
        setIsToastVisible,
    }) => {
    const [isEditModalOpened, setIsEditModalOpened] = useState(false);
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {cargo.name}
            </th>
            <td className="px-6 py-4">
                {cargo.content}
            </td>
            <td className="px-6 py-4">
                {cargo.departureCity}
            </td>
            <td className="px-6 py-4">
                {formatISODateToLocalDate(cargo.departureDate)}
            </td>
            <td className="px-6 py-4">
                {cargo.arrivalCity}
            </td>
            <td className="px-6 py-4">
                {formatISODateToLocalDate(cargo.arrivalDate)}
            </td>
            <td className="px-6 py-4 text-right">
                <Dropdown
                    dismissOnClick={true}
                    label=""
                    renderTrigger={() =>
                        <svg className="w-3 h-3 text-gray-500 dark:text-white cursor-pointer" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                        </svg>
                    }>
                    <Dropdown.Item onClick={() => setIsEditModalOpened(true)}>
                        Изменить
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setIsDeleteModalOpened(true)}>
                        Удалить
                    </Dropdown.Item>
                </Dropdown>
            </td>
            <CargoEditModal
                cargo={cargo}
                setCargo={setCargo}
                isVisible={isEditModalOpened}
                setIsVisible={setIsEditModalOpened}
            />
            <CargoDeleteModal
                cargo={cargo}
                removeCargo={removeCargo}
                isVisible={isDeleteModalOpened}
                setIsVisible={setIsDeleteModalOpened}
                isToastVisible={isToastVisible}
                setIsToastVisible={setIsToastVisible}
            />
        </tr>
    )
}

export default CargoItem;