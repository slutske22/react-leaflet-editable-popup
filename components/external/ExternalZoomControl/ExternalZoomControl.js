import React from 'react'
import { ExternalLeafletControl } from '../ExternalLeafletControl'

const ExternalZoomControl = props => (
   <ExternalLeafletControl control="zoom" {...props} />
)

export default ExternalZoomControl