// Great explanation here: https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components
// Sample here: https://codesandbox.io/s/p5zzmnlk8j

import React from "react";
import "./styles.css";

import MapProvider from './Provider'
import LeafletMap from './Map'
import ExternalComponents from './externalComponents/ExternalComponents'


class App extends React.Component{

   mapReference = React.createRef()

   state = { 
      mapLoaded: false,
      customLayers: {
         esriLeafletLayer: false,
         esriLeafletAuthLayer: false,
         dem: false,
         slope: false,
         aspect: false,
         slopeaspect: false
      }
   }

   componentDidMount(){
      this.setState({ mapLoaded:true })
   }


   toggleLayer = e => {
      const layername = e.currentTarget.getAttribute('layer')
      console.log(layername)

      this.setState({
         customLayers: {
            ...this.state.customLayers,
            [layername]: !this.state.customLayers[layername]
         }
      })
   }

  render(){
    return (
      <MapProvider>

        <LeafletMap customLayers={this.state.customLayers} />

         {this.state.mapLoaded && 
            <ExternalComponents 
               mapReference={this.mapReference} 
               customLayers={this.state.customLayers}
               toggleLayer={this.toggleLayer}
            />
         }

      </MapProvider>
    )
  }

}

export default App
