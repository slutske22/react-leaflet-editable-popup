import React from 'react'
import MapContext from '../Context'
import ActiveArea from './ActiveArea'

class ExternalComponents extends React.Component{

   render(){
      return(
         <MapContext.Consumer>
            {(value) => (<ActiveArea map={value} />)}
         </MapContext.Consumer>
      )
   }
}

export default ExternalComponents
