import React from 'react'
import { ExternalLeafletControl } from './ExternalLeafletControl'

export const ZoomControlExternal = props => (
   <ExternalLeafletControl control="zoom" {...props} />
)