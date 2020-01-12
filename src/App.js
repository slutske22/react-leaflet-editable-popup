// Great explanation here: https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components
// Sample here: https://codesandbox.io/s/p5zzmnlk8j

import React from "react";
import "./styles.css";

import { Map, TileLayer, Marker } from 'react-leaflet'

import GeoSearch from './components/GeoSearch'
import MousePosition from './components/MousePosition'
import EditablePopup from './components/EditablePopup'
import Polyline from './components/ArrowheadsPolyline'


import { ensenadaBikePath } from './constants'

const centerLat = 31.8117
const centerLng = -116.6494


class App extends React.Component{

  render(){

    return (


      <Map id="mapId" center={[centerLat, centerLng]} zoom={11.5} maxZoom={14} zoomSnap='0.5' >

        <TileLayer
          attribution={'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
          url={"https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}"}
          subdomains='abcd' ext='png'
        />

        <GeoSearch 
          expanded={true} collapseAfterResult={false} useMapBounds={false} position={"topright"} 
          providers={['arcgisOnlineProvider', 'geocodeServiceProvider']} />

        <MousePosition position={'bottomleft'} />

        <Marker position={[31.80, -116.79]}>
          <EditablePopup editable removable open maxWidth="450">
            <div>
              <h3>Welcome to the react-leaflet custom components library</h3>
              <section>This is an example page of some custom components.  You'll notice a Search bar, which is a custom component built from the <a href="https://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html#result-object" target="_blank">Esri Leaflet Geocoder</a>.  You'll also see a mouseposition coordinates custom component in the corner.  Even this popup that you're reading is a custom component which has additional features beyond a normal popup.</section>
            </div>
          </EditablePopup>
        </Marker>


        <Polyline positions={ensenadaBikePath} arrowheads={ {size: '300m', frequency: '1000m'} } >
          <EditablePopup removable editable nametag={'bike path'}>
            <div>
              <h3>Leaflet Arrowheads</h3>
              <section>This polyline uses a customized version of &lt;Polyline /&gt; which enables the use of <a href="https://github.com/slutske22/leaflet-arrowheads" target="_blank">leaflet-arrowheads</a>.</section>
            </div>
          </EditablePopup>
        </Polyline>

      </Map>


    );
  }
}

export default App