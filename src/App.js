// Great explanation here: https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components
// Sample here: https://codesandbox.io/s/p5zzmnlk8j

import React from "react";
import "./styles.css";

import Map from './Map'
import ExternalComponents from './externalComponents/ExternalComponents'

const MapContext = React.createContext()

class App extends React.Component{

  mapReference = React.createRef()
  MapContext = React.createContext(this.mapReference)

  componentDidMount(){
    console.log(this.mapReference)
  }

  render(){
    return (
      <MapContext.Provider value={this.mapReference}>
        <Map mapReference={this.mapReference} ref={this.props.mapReference} />
        <ExternalComponents mapReference={this.mapReference} />
      </MapContext.Provider>
    )
  }

}

export default App