import React, {useEffect, useState} from "react";
import {Cargo} from "../../../api/models/Cargo";
import CargoApiClient from "../../../api/CargoApiClient";
import CargoItemList from "./CargoItemList";
import CargoSelectorBar from "./CargoSelectorBar";
import {useRequest} from "../../../hooks/useRequest";
import CargoHistogram from "./CargoHistogram";
import CustomLoader from "../../CustomLoader";
import CargoCreateModal from "./CargoCreateModal";

type CargoPageProps = {
    isCreateModalOpened: boolean;
    setIsCreateModalOpened: (isOpened: boolean) => void;
}

const CargoPage: React.FC<CargoPageProps> = (
    {
        isCreateModalOpened,
        setIsCreateModalOpened,
    }) => {

    const [cargoList, setCargoList] = useState<Cargo[]>([])
    const [filterPredicate, setFilterPredicate] = useState(() => (cargo: Cargo) => true)
    const [comparator, setComparator] = useState(() => (a: Cargo, b: Cargo) => a.id - b.id)
    const [sortedAndFilteredCargoList, setSortedAndFilteredCargoList] = useState<Cargo[]>([])

    const [fetchCargoList, isCargoListLoading, error] = useRequest(async () => {
        const cargoList = await CargoApiClient.findAllCargo()
        setCargoList([...cargoList])
        setSortedAndFilteredCargoList([...cargoList])
    });

    useEffect(() => {
        fetchCargoList()
    }, [])

    const setCargo = (cargo: Cargo) => {
        const index = cargoList.findIndex(it => it.id === cargo.id);
        const updatedCargoList = [
            ...cargoList.slice(0, index),
            cargo,
            ...cargoList.slice(index + 1)
        ];
        setCargoList(updatedCargoList);
    }

    const removeCargo = (cargo: Cargo) => {
        setCargoList(cargoList.filter(it => it.id !== cargo.id))
    }

    const addCargo = (cargo: Cargo) => {
        setCargoList([...cargoList, cargo])
    }

    const filterCargoList = () => {
        const filteredCargoList = cargoList.filter(filterPredicate)
        setSortedAndFilteredCargoList([...filteredCargoList])
    }

    const sortCargoList = () => {
        const sortedCargoList = [...cargoList].sort(comparator)
        setSortedAndFilteredCargoList([...sortedCargoList])
    }

    useEffect(() => {
        filterCargoList()
    }, [cargoList, filterPredicate])

    useEffect(() => {
        sortCargoList()
    }, [cargoList, comparator])

    return (
        <div className="flex justify-center h-screen my-24">
            <div className="w-2/3">
                <div className="flex flex-row">
                    <div className="mt-auto">
                        <div className="mb-10 ml-2 text-stone-700">
                            <div className="text-3xl font-bold">
                                Список грузов
                            </div>
                            <div className="mt-2">
                                Вы можете найти нужный груз в списке или применить фильтры
                            </div>
                        </div>
                        <CargoSelectorBar
                            cargoList={cargoList}
                            setFilterPredicate={setFilterPredicate}
                        />
                    </div>
                    <CargoHistogram
                        cargoList={sortedAndFilteredCargoList}
                    />
                </div>
                {isCargoListLoading ?
                    <div className="h-[200px] flex items-center justify-center">
                        <CustomLoader/>
                    </div>
                    :
                    <CargoItemList
                        sortedAndFilteredCargoList={sortedAndFilteredCargoList}
                        setCargo={setCargo}
                        removeCargo={removeCargo}
                        setComparator={setComparator}
                        filterPredicate={filterPredicate}
                    />
                }
                <div className="mt-10">&nbsp;</div>
                <CargoCreateModal
                    addCargo={addCargo}
                    isVisible={isCreateModalOpened}
                    setIsVisible={setIsCreateModalOpened}
                />
            </div>
        </div>
    )
}

export default CargoPage;