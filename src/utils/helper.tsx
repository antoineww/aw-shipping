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

export const getJSONDataView_BareMinimum = (data: any) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export const getJSONDataView = (data: any) => {
  return getJSONDataView_BareMinimum(data)
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
