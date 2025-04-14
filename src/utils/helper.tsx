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


export const getJSONDataView_BareMinimum = (data:any) => {
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}

export const getJSONDataView = (data:any) => {
  return getJSONDataView_BareMinimum(data)
}

