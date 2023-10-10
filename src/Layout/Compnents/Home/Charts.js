import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto"

export const BarChart = ({chartData}) => {
    return <Bar data={chartData}/>
}
export const LineChart = ({chartData}) => {
    return <Line data={chartData}/>
}