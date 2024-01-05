import CustomModal from "../../CustomModal";
import CustomDateRangePicker from "../../CustomDateRangePicker";
import {formatDateRange, formatLocalDateToISO} from "../../../utils/DateUtils";
import CustomLoader from "../../CustomLoader";
import SuccessToast from "../../SuccessToast";
import React, {useEffect, useState} from "react";
import {Cargo} from "../../../api/models/Cargo";
import {Range, RangeKeyDict} from "react-date-range";
import {useRequest} from "../../../hooks/useRequest";
import CargoApiClient from "../../../api/CargoApiClient";
import {CreateCargoFormData} from "../../models/CreateCargoFormData";
import {isDateRangeSelected} from "../../../utils/DateRangeUtils";
import ErrorToast from "../../ErrorToast";

type CargoCreateModalProps = {
    addCargo: (cargo: Cargo) => void;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

const CargoCreateModal: React.FC<CargoCreateModalProps> = (
    {
        addCargo,
        isVisible,
        setIsVisible,
    }
) => {

    const defaultFormData = {
        arrivalCity: "",
        arrivalDate: "",
        content: "",
        departureCity: "",
        departureDate: "",
        name: ""
    }

    const [formData, setFormData] = useState<CreateCargoFormData>(defaultFormData);
    const [isFormFilled, setIsFormFilled] = useState(false);

    const [isDateRangePickerVisible, setIsDateRangePickerVisible] = useState(false);
    const [isStartDateSelect, setIsStartDateSelect] = useState(false);
    const [dateRange, setDateRange] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        } as Range,
    );
    const [isSuccessToast, setIsSuccessToast] = useState(false);
    const [isFailToast, setIsFailToast] = useState(false);

    const [createCargo, isCargoCreating, error] = useRequest(async (cargo) => {
        setIsSuccessToast(false);
        const newCargo = await CargoApiClient.createCargo(cargo);
        setIsSuccessToast(true);
        addCargo(newCargo);
        handleClose();
    })

    const handleDateRangeClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        event.stopPropagation();
        setIsDateRangePickerVisible(!isDateRangePickerVisible);
    };

    const handleDateRangeChange = (rangeKeyDict: RangeKeyDict) => {
        const newDateRange = rangeKeyDict.selection;
        setDateRange(newDateRange);

        if (isDateRangeSelected(rangeKeyDict, isStartDateSelect)) {
            setIsDateRangePickerVisible(false);
            setFormData({
                ...formData,
                departureDate: formatLocalDateToISO(newDateRange.startDate!!),
                arrivalDate: formatLocalDateToISO(newDateRange.endDate!!),
            })
        }

        setIsStartDateSelect(!isStartDateSelect);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleClose = () => {
        setFormData(defaultFormData)
        setIsVisible(false);
        setIsStartDateSelect(false);
        setIsDateRangePickerVisible(false);
        setDateRange({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        } as Range);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createCargo(formData);
    }

    useEffect(() => {
        if (formData.name
            && formData.content
            && formData.departureDate
            && formData.departureCity
            && formData.arrivalDate
            && formData.arrivalCity) {
            setIsFormFilled(true);
        } else {
            setIsFormFilled(false);
        }
    }, [formData]);

    useEffect(() => {
        if (error) {
            setIsFailToast(true)
            handleClose()
        }
    }, [error]);

    return <div>
        <CustomModal
            isVisible={isVisible}
            onClose={handleClose}
        >
            <form onSubmit={handleSubmit} className="bg-white rounded-xl px-8 pt-6 pb-8 w-[700px] h-[450px]">
                <h2 className="text-xl font-bold mb-4">Добавить груз</h2>
                <p className="mb-6 text-gray-600">Заполните информацию о грузе</p>

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
                                name="departureCity"
                                id="departureCity"
                                value={formData.departureCity}
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
                                name="arrivalCity"
                                id="arrivalCity"
                                value={formData.arrivalCity}
                                onChange={handleChange}
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500 border-gray-200"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end mt-10 space-x-4">
                    <button
                        type="submit"
                        disabled={!isFormFilled}
                        className={`${isFormFilled ? "bg-blue-600 hover:opacity-90" : "bg-gray-300"} w-[140px] h-[50px] text-white font-bold py-2 px-4 rounded focus:outline-none focus:border-indigo-700`}
                    >
                        {isCargoCreating ?
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
            message="Груз успешно сохранен"
            show={isSuccessToast}
            onHide={() => setIsSuccessToast(false)}
        />
        <ErrorToast
            message="Произошла ошибка при добавлении груза"
            show={isFailToast}
            onHide={() => setIsFailToast(false)}
        />
    </div>
}

export default CargoCreateModal;