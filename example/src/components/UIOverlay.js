import React from 'react'
import { useSelector } from 'react-redux'

import Sidebar from './Sidebar'
import { ActiveArea } from '../../../components/external/ActiveArea'

const UIOverlay = props => {

   const useActiveArea = useSelector(state => state.useActiveArea)
   const openTab = useSelector(state => state.sidebarTab)
   const showActiveArea = (openTab === 'externalConrols' || openTab === 'ui') ? true : false;
   const style = showActiveArea
      ? {}
      : {border: 'none'}

   return (
      <div className="UIOverlay">
         <Sidebar map={props.map} />
         {useActiveArea && <ActiveArea className="external" style={style} map={props.map} />}
      </div>
   )

}

export default UIOverlay