import React from 'react'
import { useSelector } from 'react-redux'

import Sidebar from './Sidebar'
import { ActiveArea } from '../../../components/external/ActiveArea'
import { ExternalLeafletControl } from '../../../components/external/ExternalLeafletControl'

const UIOverlay = props => {

   const useActiveArea = useSelector(state => state.useActiveArea)
   const showActiveArea = useSelector(state => state.sidebarTab) === 'externalConrols'
   const style = showActiveArea
      ? {}
      : {border: 'none'}

   return (
      <div className="UIOverlay">
         <Sidebar map={props.map} />
         {useActiveArea && <ActiveArea style={style} map={props.map} />}
      </div>
   )

}

export default UIOverlay