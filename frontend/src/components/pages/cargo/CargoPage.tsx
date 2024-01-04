import {useEffect, useState} from "react";
import {Cargo} from "../../../api/models/Cargo";
import CargoApiClient from "../../../api/CargoApiClient";
import CargoItemList from "./CargoItemList";
import CargoSelectorBar from "./CargoSelectorBar";
import {useRequest} from "../../../hooks/useRequest";
import CargoHistogram from "./CargoHistogram";

const CargoPage = () => {
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
                    <CargoSelectorBar
                        cargoList={cargoList}
                        setFilterPredicate={setFilterPredicate}
                    />
                    <CargoHistogram
                        cargoList={cargoList}
                    />
                </div>
                {isCargoListLoading ?
                    <div>Loading</div>
                    :
                    <CargoItemList
                        sortedAndFilteredCargoList={sortedAndFilteredCargoList}
                        setCargo={setCargo}
                        removeCargo={removeCargo}
                        setComparator={setComparator}
                        filterPredicate={filterPredicate}
                    />
                }
            </div>
        </div>
    )
}

export default CargoPage;