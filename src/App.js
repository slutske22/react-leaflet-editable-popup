// Great explanation here: https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components
// Sample here: https://codesandbox.io/s/p5zzmnlk8j

import React from "react";
import "./styles.css";

import MapProvider from './Provider'
import LeafletMap from './Map'
import ExternalComponents from './externalComponents/ExternalComponents'


class App extends React.Component{

  mapReference = React.createRef()

  state = { mapLoaded: false }

  componentDidMount(){
    this.setState({ mapLoaded:true })

  }

  render(){
    return (
      <MapProvider>

        <LeafletMap  />

        {this.state.mapLoaded && <ExternalComponents mapReference={this.mapReference} />}

      </MapProvider>
    )
  }

}

export default App
