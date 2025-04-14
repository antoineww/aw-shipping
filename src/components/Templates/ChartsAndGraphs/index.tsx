import { getShipmentDataFromProps_Safe } from "@/utils/helper"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js"
import { Bar, Pie, Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

export const ChartsAndGraphs = (props) => {
  const { shipmentData } = getShipmentDataFromProps_Safe(props)
  const carrierChartData = {
    labels: shipmentData.shipmentsByCarrier.map((item) => item.carrier),
    datasets: [
      {
        label: "Shipments by Carrier",
        data: shipmentData.shipmentsByCarrier.map((item) => item._count),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  }

  const modeChartData = {
    labels: shipmentData.shipmentsByMode.map((item) => item.mode),
    datasets: [
      {
        label: "Volume by Mode",
        data: shipmentData.shipmentsByMode.map((item) => item._sum.volume),
        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(75, 192, 192, 0.5)"],
      },
    ],
  }

  const warehouseChartData = {
    labels: shipmentData.shipmentsByDate.map((item) =>
      new Date(item.arrival_date).toLocaleDateString()
    ),
    datasets: [
      {
        label: "Daily Shipments/Packages",
        data: shipmentData.shipmentsByDate.map((item) => item._count),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  return (
    <div className="overflow-x-auto whitespace-nowrap">
      <div className="inline-block w-[40vw] h-[60vh] ">
        <Bar data={carrierChartData} />
      </div>
      <div className="inline-block w-[40vw] h-[30vw] ">
        <Pie data={modeChartData} />
      </div>
      <div className="inline-block w-[40vw] h-[60vh] ">
        <Line data={warehouseChartData} />
      </div>
    </div>
  )
}
