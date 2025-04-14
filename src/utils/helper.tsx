import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"

export const DEFAULTS_PROPS_shipmentData = {
  shipmentData: {
    totalShipments: 0,
    shipmentsByStatus: [],
    shipmentsByCarrier: [],
    shipmentsByMode: [],
    warehouseUtilization: 0,
    shipmentsByDate: [],
    consolidationOpportunities: [],
  },
}

export const getShipmentDataFromProps_Safe = (props) => ({
  ...DEFAULTS_PROPS_shipmentData,
  ...(props.shipmentData && { shipmentData: props.shipmentData }),
})

const snakeCaseToArray = (str = "") => str.split("_")
const camelCaseToArray = (str = "") => str.replace(/([A-Z])/g, " $1")
const titleCaseSentence = (words = []) => {
  return words
    .map(
      (word, index) =>
        index === 0
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize first word
          : word.toLowerCase() // Remaining words in lowercase
    )
    .join(" ") // Join words back into a sentence
}
export const camelOrSnakeToTitleCaseSentence = (str = "") => {
  let strCam = camelCaseToArray(str)
  const words = snakeCaseToArray(strCam)

  return titleCaseSentence(words).trim()
}

export const getJSONDataView_BareMinimum = (data: any) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export const getJSONDataView_ButtonGroups = (data: any) => {
  const dataObjs = Object.keys(data).map((key, i) => (
    <div className="my-2" key={`DataView_${i}`}>
      <ButtonGroup size="small" aria-label="Basic button group">
        <Button variant="contained" className="w-[20vw] ">
          {camelOrSnakeToTitleCaseSentence(key)}
        </Button>
        <Button variant="outlined" className="w-[20vw] ">
          {data[key]}
        </Button>
      </ButtonGroup>
    </div>
  ))
  return <>{dataObjs}</>
}

export const getJSONDataView = (data: any) => {
  try {
    if (!Array.isArray(data)) {
      if (Object.keys(data).length > 0) {
        return getJSONDataView_ButtonGroups(data)
      }
    } else {
      return getJSONDataView_BareMinimum(data)
    }
  } catch (error) {}
  return null
}

export const getElapsedTime = (startTime: number, endTime: number) => {
  const timeTakenMs = endTime - startTime

  const totalSeconds = Math.floor(timeTakenMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes} minute(s) and ${seconds} second(s)`
}
export const getTimestamp = () => {
  const now = new Date()

  const year = now.getFullYear().toString().slice(-2)
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const date = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")

  const timestamp = `${year}_${month}_${date}_${hours}_${minutes}_${seconds}`
  return timestamp
}

export const generateFilename = (baseFilename = "data", extension = "csv") => {
  const timestamp = getTimestamp()
  return `${baseFilename}_${timestamp}.${extension}`
}

export const downloadCSV = (data, filename = "data.csv") => {
  if (!Array.isArray(data) || data.length < 1) return

  const csvRows = []
  const headers = Object.keys(data[0])
  csvRows.push(headers.join(","))

  data.forEach((row) => {
    const values = headers.map((header) => JSON.stringify(row[header] || ""))
    csvRows.push(values.join(","))
  })

  const csvString = csvRows.join("\n")
  const blob = new Blob([csvString], { type: "text/csv" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const STATUS_TYPES_SHIPMENTS = [
  { value: "", text: "All Statuses" },
  { value: "intransit", text: "In Transit" },
  { value: "received", text: "Received" },
  { value: "delivered", text: "Delivered" },
]

export const DESTINATION_TYPES_SHIPMENTS = [
  { value: "", text: "All Destinations" },
  { value: "GUY", text: "Guyana" },
  { value: "SVG", text: "St. Vincent" },
  { value: "SLU", text: "St. Lucia" },
  { value: "BIM", text: "Barbados" },
  { value: "DOM", text: "Dominica" },
  { value: "GRD", text: "Grenada" },
  { value: "SKN", text: "St. Kitts" },
  { value: "ANU", text: "Antigua" },
  { value: "SXM", text: "St. Maarten" },
  { value: "FSXM", text: "French St. Maarten" },
]

export const CARRIERS_TYPES_SHIPMENTS = [
  { value: "", text: "All Carriers" },
  { value: "FEDEX", text: "FedEx" },
  { value: "DHL", text: "DHL" },
  { value: "USPS", text: "USPS" },
  { value: "UPS", text: "UPS" },
  { value: "AMAZON", text: "Amazon" },
]
