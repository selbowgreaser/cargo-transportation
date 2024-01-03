import {useEffect, useState} from "react";
import {Cargo} from "../../../api/models/Cargo";
import CargoApiClient from "../../../api/CargoApiClient";
import CargoItemList from "./CargoItemList";
import CargoSelectorBar from "./CargoSelectorBar";
import {useRequest} from "../../../hooks/useRequest";

const CargoPage = () => {
    const [cargoList, setCargoList] = useState<Cargo[]>([])
    const [filteredCargoList, setFilteredCargoList] = useState<Cargo[]>([])

    const [fetchCargoList, isCargoListLoading, fetchCargoListError] = useRequest(async () => {
        const cargoList = await CargoApiClient.findAllCargo()
        setCargoList([...cargoList])
        setFilteredCargoList([...cargoList])
    });

    useEffect(() => {
        fetchCargoList()
    }, [])

    return (
        <div className="flex justify-center h-screen my-24">
            <div className="w-2/3">
                <CargoSelectorBar
                    cargoList={cargoList}
                    setFilteredCargoList={setFilteredCargoList}
                />
                {isCargoListLoading ?
                    <div>Loading</div>
                    :
                    <CargoItemList
                        filteredCargoList={filteredCargoList}
                        cargoList={cargoList}
                        setCargoList={setCargoList}
                    />
                }
            </div>
        </div>
    )
}

export default CargoPage;