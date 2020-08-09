import React from 'react'

import Sidebar from './Sidebar'
import { ActiveArea } from '../../../components/external/ActiveArea'

const UIOverlay = props => {

   return (
      <div className="UIOverlay">
         <Sidebar map={props.map} />
         <ActiveArea map={props.map}>
            {/* <LeafletExternalControl map={props.map} control="zoom" /> */}
         </ActiveArea>
      </div>
   )

}

export default UIOverlay