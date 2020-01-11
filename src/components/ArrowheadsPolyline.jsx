import React from 'react'
import { Polyline } from 'react-leaflet'
import { } from 'leaflet-arrowheads'

class ArrowheadsPolyline extends React.Component{

   componentDidMount(){
      const polyline = this.polylineRef.leafletElement
      if (this.props.arrowheads){
         polyline.arrowheads(this.props.arrowheads)
         polyline._update()
      }
   }

   render(){
      return(
         <Polyline {...this.props} ref={polylineRef => this.polylineRef = polylineRef} />
      )
   }
   
}

export default ArrowheadsPolyline