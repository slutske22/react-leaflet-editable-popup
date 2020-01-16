// Great explanation here: https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components
// Sample here: https://codesandbox.io/s/p5zzmnlk8j

import React from "react";
import "./styles.css";

import Map from './Map'
import ExternalComponents from './externalComponents/ExternalComponents'

export const MapContext = React.createContext()

class App extends React.Component{

  mapReference = React.createRef()
  MapContext = React.createContext(this.mapReference)

  // In order to properly pass the mapReference to the ExternalComponents, the following steps have to happen:
  // 1. render runs()
  // 2.  from render(), the mapReference is established
  // 3.  componentDidMount runs
  // 4. state is set in componentDidMount that the map is loaded and the mapReference is defined
  // 5. ExternalComponents conditionally renders once state.mapLoaded is true, and receives the proper mapContext
  // I had tried this approach with redux in my firestarter project, but it was too slow and there was a delay in sending the mapReference through the redux store and back out to the components.  This reference and context method is pretty fast.

  state = { mapLoaded: false }

  componentDidMount(){
    this.setState({ mapLoaded:true })
  }

  render(){
    return (
      <MapContext.Provider value={this.mapReference}>
        <Map mapReference={this.mapReference} ref={this.props.mapReference} />
        {this.state.mapLoaded && <ExternalComponents mapReference={this.mapReference} />}
      </MapContext.Provider>
    )
  }

}

export default App