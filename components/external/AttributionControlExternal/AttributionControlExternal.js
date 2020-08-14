import React from 'react'
import { ExternalLeafletControl } from '../ExternalLeafletControl'
import './AttributionControlExternal.scss'

const AttributionControlExternal = props => (
   <ExternalLeafletControl 
      className={`ExternalAttributionControl ${props.className || ''}`} 
      control="attribution" {...props} />
)

export default AttributionControlExternal