// Great explanation here: https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components
// Sample here: https://codesandbox.io/s/p5zzmnlk8j

import React from "react";
import "./styles.css";

import { Map, TileLayer } from 'react-leaflet'

import GeoSearch from './components/GeoSearch'
import MousePosition from './components/MousePosition'

export default function App() {
  return (

    <Map id="mapId" center={[31.8667, -116.5964]} zoom={10} maxZoom={14} >

      <TileLayer
        attribution={'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
        url={"https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}"}
        subdomains='abcd' ext='png'
      />

      <GeoSearch 
        expanded={true} collapseAfterResult={false} useMapBounds={false} position={"topright"} 
        providers={['arcgisOnlineProvider', 'geocodeServiceProvider']} />

      <MousePosition position={'bottomleft'} />


    </Map>


  );
}

