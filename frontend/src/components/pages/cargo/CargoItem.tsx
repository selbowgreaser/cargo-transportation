import React, {useState} from "react";
import {Cargo} from "../../../api/models/Cargo";
import {formatISODateToLocalDate} from "../../../utils/DateUtils";
import CargoEditModal from "./CargoEditModal";

type CargoItemProps = {
    cargo: Cargo;
    setCargo: (cargo: Cargo) => void;
}

const CargoItem: React.FC<CargoItemProps> = ({cargo, setCargo}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
                <button
                    className="font-medium text-blue-600 dark:text-blue-500 cursor-pointer"
                    onClick={() => setIsEditModalOpen(true)}
                >
                    Edit
                </button>
            </td>
            <CargoEditModal
                cargo={cargo}
                setCargo={setCargo}
                isVisible={isEditModalOpen}
                setIsVisible={setIsEditModalOpen}
            />
        </tr>
    )
}

export default CargoItem;