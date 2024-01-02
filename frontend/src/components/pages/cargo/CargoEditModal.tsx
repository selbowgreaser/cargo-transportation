import React, {useState} from "react";
import {Cargo} from "../../../api/models/Cargo";
import CustomModal from "../../CustomModal";
import {EditCargoFormData} from "../../models/EditCargoFormData";
import {Range, RangeKeyDict} from "react-date-range";
import {formatDateRange} from "../../../utils/DateUtils";
import CustomDateRangePicker from "../../CustomDateRangePicker";

type CargoEditModalProps = {
    cargo: Cargo;
    setCargo: (cargo: Cargo) => void;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

const CargoEditModal: React.FC<CargoEditModalProps> = (
    {
        cargo,
        setCargo,
        isVisible,
        setIsVisible,
    }) => {

    const getFormData = (cargo: Cargo): EditCargoFormData => {
        return {
            id: cargo.id,
            name: cargo.name,
            content: cargo.content,
            departureCity: cargo.departureCity,
            departureDate: cargo.departureDate,
            arrivalCity: cargo.arrivalCity,
            arrivalDate: cargo.arrivalDate,
        }
    }

    const [formData, setFormData] = useState<EditCargoFormData>(getFormData(cargo));

    const [isDateRangePickerVisible, setIsDateRangePickerVisible] = useState(false);
    const [dateRange, setDateRange] = useState(
        {
            startDate: new Date(cargo.arrivalDate),
            endDate: new Date(cargo.departureDate),
            key: 'selection',
        } as Range,
    );

    const handleDateRangeClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        event.stopPropagation();
        setIsDateRangePickerVisible(!isDateRangePickerVisible);
    };

    const handleDateRangeChange = (rangeKeyDict: RangeKeyDict) => {
        const newDateRange = rangeKeyDict.selection
        setDateRange(newDateRange)

        if (newDateRange.endDate!! > newDateRange.startDate!!) {
            setIsDateRangePickerVisible(false);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleClose = () => {
        setFormData(getFormData(cargo))
        setIsVisible(false)
    }

    return <div>
        <CustomModal
            isVisible={isVisible}
            onClose={handleClose}
        >
            <form onSubmit={() => console.log("here")} className="bg-white rounded-xl px-8 pt-6 pb-8 w-[700px] h-[450px]">
                <h2 className="text-xl font-bold mb-4">Изменить данные</h2>
                <p className="mb-6 text-gray-600">Обновите информацию о грузе</p>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Даты прибытия / отправки
                            </label>
                            <CustomDateRangePicker
                                isVisible={isDateRangePickerVisible}
                                dateRange={dateRange}
                                onClick={handleDateRangeClick}
                                onDateRangeChange={handleDateRangeChange}
                                placeholder={formatDateRange(dateRange)}
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Название
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 border-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Содержимое
                            </label>
                            <input
                                type="text"
                                name="content"
                                id="content"
                                value={formData.content}
                                onChange={handleChange}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 border-gray-200"
                            />
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Город отправки
                            </label>
                            <input
                                type="text"
                                name="arrivalCity"
                                id="arrivalCity"
                                value={formData.arrivalCity}
                                onChange={handleChange}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 border-gray-200"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Город прибытия
                            </label>
                            <input
                                type="text"
                                name="departureCity"
                                id="departureCity"
                                value={formData.departureCity}
                                onChange={handleChange}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 border-gray-200"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end mt-10 space-x-4">
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-indigo-700"
                    >
                        Сохранить
                    </button>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </CustomModal>
    </div>
}

export default CargoEditModal;