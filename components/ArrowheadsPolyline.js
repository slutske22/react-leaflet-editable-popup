import React from 'react'
import { Polyline } from 'react-leaflet'
import 'leaflet-arrowheads'

export class ArrowheadsPolyline extends React.Component{

   componentDidMount(){
      const polyline = this.polylineRef
      if (this.props.arrowheads){
         polyline.arrowheads(this.props.arrowheads)
         polyline._update()
      }
   }

   componentWillUnmount(){
      if (this.props.arrowheads){
         const polyline = this.polylineRef
         polyline.deleteArrowheads()
         polyline.remove()
      }
   }

   render(){
      return(
         <Polyline {...this.props} ref={polylineRef => this.polylineRef = polylineRef} />
      )
   }
   
}