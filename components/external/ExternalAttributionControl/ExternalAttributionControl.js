import React from 'react'
import { ExternalLeafletControl } from '../ExternalLeafletControl'
import './ExternalAttributionControl.scss'

const ExternalAttributionControl = props => (
   <ExternalLeafletControl 
      className={`ExternalAttributionControl ${props.className || ''}`} 
      control="attribution" {...props} />
)

export default ExternalAttributionControl