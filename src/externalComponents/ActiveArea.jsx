import React from 'react'
import 'leaflet-active-area'
import MapContext from '../Context'

class ActiveArea extends React.Component{

   componentDidMount(){

      console.log(this.props.map.map)

      const { map } = this.props.map

      const recenter = this.props.recenter ? true : false
      const animate = this.props.animate && this.props.recenter ? true : false
      map.setActiveArea('activeArea', recenter, animate);
   }

   render(){
      return(
         <div className="activeArea"></div>
         // <MapContext.Consumer>
         //    { value => {
         //       this.mapReference = value.mapref or whatever
         //       return{
         //          <div className="activeArea"></div>
         //       }
         //    }}
         // </MapContext.Consumer>
      )
   }
   
}

export default ActiveArea