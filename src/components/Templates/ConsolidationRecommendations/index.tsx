import { getShipmentDataFromProps_Safe } from "@/utils/helper"

export const ConsolidationRecommendations = (props) => { 
      const { shipmentData } = getShipmentDataFromProps_Safe(props)
    
    return <pre>{JSON.stringify(shipmentData.consolidationOpportunities, null, 2)}</pre>
 }