import { getJSONDataView, getShipmentDataFromProps_Safe } from "@/utils/helper"

export const ConsolidationRecommendations = (props) => { 
      const { shipmentData } = getShipmentDataFromProps_Safe(props)
    
    return getJSONDataView(shipmentData.consolidationOpportunities) 
}