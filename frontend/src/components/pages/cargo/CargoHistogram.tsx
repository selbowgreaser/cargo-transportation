import React from "react";
import ReactApexChart from 'react-apexcharts';
import {ApexOptions} from "apexcharts";
import {Cargo} from "../../../api/models/Cargo";
import {dateRange, findMaxDate, findMinDate} from "../../../utils/DateUtils";

type CargoHistogramProps = {
    cargoList: Cargo[]
}

const CargoHistogram: React.FC<CargoHistogramProps> = ({cargoList}) => {

    let dates: number[] = []
    let xAxisMaxDate = new Date().getTime()
    let xAxisMinDate = new Date().getTime()

    if (cargoList.length) {
        const minArrivalDate = findMinDate(cargoList.map(it => new Date(it.arrivalDate)));
        const maxArrivalDate = findMaxDate(cargoList.map(it => new Date(it.arrivalDate)));
        const minDepartureDate = findMinDate(cargoList.map(it => new Date(it.departureDate)));
        const maxDepartureDate = findMaxDate(cargoList.map(it => new Date(it.departureDate)));

        const minDate = findMinDate([minArrivalDate, minDepartureDate]);
        const maxDate = findMaxDate([maxArrivalDate, maxDepartureDate]);

        xAxisMaxDate = maxDate.getTime()
        const prevDate = new Date(maxDate)
        prevDate.setDate(prevDate.getDate() - 7)
        xAxisMinDate = prevDate.getTime()

        dates = dateRange(minDate, maxDate).map(it => it.getTime());
    }

    const groupCountsByDates = (keyGetter: (cargo: Cargo) => number) => {
        const map = new Map();

        cargoList.forEach(it => {
            const key = keyGetter(it)
            const count = map.get(key);
            if (!count) {
                map.set(key, 1);
            } else {
                map.set(key, count + 1);
            }
        });

        return map;
    }

    const countsByDatesInRange = (keyGetter: (cargo: Cargo) => number) => {
        const grouped = groupCountsByDates(keyGetter)

        return dates.map(it => {
            const count = grouped.get(it)
            if (count) {
                return count
            } else {
                return 0
            }
        })
    }

    const departureCountsByDay = countsByDatesInRange(cargo => new Date(cargo.departureDate).getTime())

    const arrivalCountsByDay = countsByDatesInRange(cargo => new Date(cargo.arrivalDate).getTime())

    const totalDeparted = departureCountsByDay.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0)

    const series = [
        {
            name: 'Отправлено',
            group: 'departed',
            data: departureCountsByDay
        },
        {
            name: 'Доставлено',
            group: 'arrived',
            data: arrivalCountsByDay
        }
    ]

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            height: 300,
            stacked: true,
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        },
        xaxis: {
            type: 'datetime',
            min: xAxisMinDate,
            max: xAxisMaxDate,
            categories: dates,
            labels: {
                datetimeFormatter: {
                    year: 'yyyy',
                    month: 'MMM \'yy',
                    day: 'dd MMM'
                }
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        fill: {
            opacity: 1
        },
        colors: ['#80c7fd', '#008FFB'],
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        }
    }

    return <div className="ml-12 w-1/3 bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
        <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
                <div
                    className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                </div>
                <div>
                    <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
                        {totalDeparted}
                    </h5>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Грузов всего отправлено
                    </p>
                </div>
            </div>
        </div>
        <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={300}
        />
    </div>
}

export default CargoHistogram;