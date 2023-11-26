import React from "react";
import {Cargo} from "../../../api/models/Cargo";
import {formatDateISO} from "../../../utils/DateUtils";

type CargoItemProps = {
    cargo: Cargo;
    setCargo: (cargo: Cargo) => void;
}

const CargoItem: React.FC<CargoItemProps> = ({cargo, setCargo}) => {
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
                {formatDateISO(cargo.departureDate)}
            </td>
            <td className="px-6 py-4">
                {cargo.arrivalCity}
            </td>
            <td className="px-6 py-4">
                {formatDateISO(cargo.arrivalDate)}
            </td>
            <td className="px-6 py-4 text-right">
                <a href="frontend/src/components/cargo#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
            </td>
        </tr>
    )
}

export default CargoItem;