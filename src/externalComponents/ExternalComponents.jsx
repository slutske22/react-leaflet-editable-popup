import React from 'react'
import { MapContext } from '../App'

class ExternalComponents extends React.Component{

   componentDidMount(){
      console.log(this.props.mapReference.current.contextValue)
   }

   render(){
      return(
         <MapContext.Consumer>
            { (value) => {
               console.log(value)
            }}
         </MapContext.Consumer>

      )
   }
}

export default ExternalComponents