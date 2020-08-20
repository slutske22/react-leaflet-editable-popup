import React from 'react'
import L from 'leaflet'

function capitalizeFirstLetter(input) { 
   return input[0].toUpperCase() + input.slice(1); 
 } 

export class ExternalLeafletControl extends React.Component {
   constructor(props){
      super(props)
      this.containerName = props.containerName || `${props.control}-control-container`
   }

   componentDidMount(){
      const control = new L.control[this.props.control](this.props)
      control.addTo(this.props.map)
      const controlContainer = control.getContainer()
      document.querySelector(`.${this.containerName}`).appendChild(controlContainer);
   }

   render(){
      return (
         <div className={`${this.props.className || ''} ${this.containerName} ${capitalizeFirstLetter(this.props.control)}Control`} />
      )
   }

}