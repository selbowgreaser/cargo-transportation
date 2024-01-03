import React, {useEffect, useState} from "react";
import {Cargo} from "../../../api/models/Cargo";
import CustomModal from "../../CustomModal";
import {EditCargoFormData} from "../../models/EditCargoFormData";
import {Range, RangeKeyDict} from "react-date-range";
import {formatDateRange, formatLocalDateToISO} from "../../../utils/DateUtils";
import CustomDateRangePicker from "../../CustomDateRangePicker";
import SuccessToast from "../../SuccessToast";
import {useRequest} from "../../../hooks/useRequest";
import CargoApiClient from "../../../api/CargoApiClient";
import CustomLoader from "../../CustomLoader";

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
        } as EditCargoFormData
    }

    const [formData, setFormData] = useState<EditCargoFormData>(getFormData(cargo));
    const [isFormEdited, setIsFormEdited] = useState(false)

    const [isDateRangePickerVisible, setIsDateRangePickerVisible] = useState(false);
    const [isStartDateSelect, setIsStartDateSelect] = useState(false)
    const [dateRange, setDateRange] = useState(
        {
            startDate: new Date(cargo.departureDate),
            endDate: new Date(cargo.arrivalDate),
            key: 'selection',
        } as Range,
    );
    const [isSuccessToast, setIsSuccessToast] = useState(false);

    const [updateCargo, isCargoUpdating, error] = useRequest(async (cargo) => {
        setIsSuccessToast(false);
        await CargoApiClient.updateCargo(cargo);
        setIsSuccessToast(true);
        setCargo(cargo);
    })

    const handleDateRangeClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        event.stopPropagation();
        setIsDateRangePickerVisible(!isDateRangePickerVisible);
    };

    const handleDateRangeChange = (rangeKeyDict: RangeKeyDict) => {
        const newDateRange = rangeKeyDict.selection
        setDateRange(newDateRange)

        const startDate = newDateRange.startDate!!
        const endDate = newDateRange.endDate!!

        if ((endDate > startDate)
            || (isStartDateSelect && endDate.toLocaleDateString() === startDate.toLocaleDateString())) {
            setIsDateRangePickerVisible(false);
            setFormData({
                ...formData,
                departureDate: formatLocalDateToISO(startDate),
                arrivalDate: formatLocalDateToISO(endDate),
            })
        }

        setIsStartDateSelect(!isStartDateSelect)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        if (cargo.name === formData.name
            && cargo.content === formData.content
            && cargo.departureDate === formData.departureDate
            && cargo.departureCity === formData.departureCity
            && cargo.arrivalDate === formData.arrivalDate
            && cargo.arrivalCity === formData.arrivalCity) {
            setIsFormEdited(false)
        } else {
            setIsFormEdited(true)
        }
    }, [formData])

    const handleClose = () => {
        setFormData(getFormData(cargo))
        setIsVisible(false)
        setIsStartDateSelect(false)
        setIsDateRangePickerVisible(false)
        setDateRange({
            startDate: new Date(cargo.departureDate),
            endDate: new Date(cargo.arrivalDate),
            key: 'selection',
        } as Range)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateCargo(formData);
        setIsVisible(false)
        setIsFormEdited(false)
    }

    return <div>
        <CustomModal
            isVisible={isVisible}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit} className="bg-white rounded-xl px-8 pt-6 pb-8 w-[700px] h-[450px]">
                <h2 className="text-xl font-bold mb-4">Изменить данные</h2>
                <p className="mb-6 text-gray-600">Обновите информацию о грузе</p>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Дата отправки - дата прибытия
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
                        disabled={!isFormEdited}
                        className={`${isFormEdited ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-300"} w-[140px] h-[50px] text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-indigo-700`}
                    >
                        {isCargoUpdating ?
                            <CustomLoader/>
                            :
                            `Сохранить`
                        }
                    </button>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="w-[120px] h-[50px] bg-white hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                    >
                        Отмена
                    </button>
                </div>
            </form>
        </CustomModal>
        <SuccessToast
            message="Информация о грузе успешно обновлена!"
            show={isSuccessToast}
            onHide={() => setIsSuccessToast(false)}
        />
    </div>
}

export default CargoEditModal;