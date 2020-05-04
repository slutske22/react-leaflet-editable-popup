// Great explanation here: https://stackoverflow.com/questions/52012591/react-leaflet-create-a-custom-components
// Sample here: https://codesandbox.io/s/p5zzmnlk8j

import React from "react";
import './components/ActiveArea.css'

import { Map as MapComponent, TileLayer, Marker, LayersControl } from 'react-leaflet'
import MapContext from './Context'

import GeoSearch from './components/GeoSearch'
import MousePosition from './components/MousePosition'
import EditablePopup from 'react-leaflet-editable-popup'
import Polyline from 'react-leaflet-arrowheads'
import RandomMarkersButtonLNative from './components/RandomMarkersButtonLNative'
import { blackIcon } from './components/Icons'
import EsriLeafletLayer from './components/EsriLeafletLayer'
import EsriLeafletAuthLayer from './components/EsriLeafletAuthLayer'

import { seattlePath, center } from './constants'

const { BaseLayer, Overlay } = LayersControl



class Map extends React.Component{

  mapRef = React.createRef(null);

  componentDidMount() {
    const map = this.mapRef.current.leafletElement;
    window.map = map
    this.props.setMap(map);
  }

  render(){

   const { customLayers } = this.props


    return (

      <MapComponent 
         id="mapId" 
         center={center} 
         zoom={10} 
         maxZoom={14} 
         zoomSnap='0.5' 
         doubleClickZoom={false}
         ref={this.mapRef} >

        <TileLayer
          attribution={'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
          url={"https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}"}
          subdomains='abcd' ext='png'
        />

        {customLayers.esriLeafletLayer && <EsriLeafletLayer layerType="tiledMapLayer" url="https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_WUI_2010_01/MapServer" opacity={0.7} />}

         {customLayers.esriLeafletAuthLayer && <EsriLeafletAuthLayer layerType="imageMapLayer" url="https://landscape6.arcgis.com/arcgis/rest/services/World_Land_Cover_30m_BaseVue_2013/ImageServer" opacity={0.75} />}


        <GeoSearch 
          expanded={true} collapseAfterResult={false} useMapBounds={false} position={"topright"} 
          providers={['arcgisOnlineProvider', 'geocodeServiceProvider']} />

        <MousePosition position={'bottomleft'} />

        <Marker position={[center.lat-0.1, center.lng + 0.3]}>
          <EditablePopup editable removable open maxWidth={400}>
            <div>
              <h2>Welcome to the react-leaflet custom components library</h2>
              <section className="welcome-popup-text">This is an example page of some custom components.  You'll notice a Search bar, which is a custom component built from the <a href="https://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html#result-object" target="_blank">Esri Leaflet Geocoder</a>.  You'll also see a mouseposition coordinates custom component in the corner.  Even this popup that you're reading is a custom component which has additional features beyond a normal popup.</section>
            </div>
          </EditablePopup>
        </Marker>


        <Polyline positions={seattlePath} arrowheads={ {size: '300m', frequency: '1000m'} } >
          <EditablePopup removable editable nametag={'bike path'}>
            <div>
              <h3>Leaflet Arrowheads</h3>
              <section>This polyline uses a customized version of &lt;Polyline /&gt; which enables the use of <a href="https://github.com/slutske22/leaflet-arrowheads" target="_blank">leaflet-arrowheads</a>.</section>
            </div>
          </EditablePopup>
        </Polyline>
        
        <RandomMarkersButtonLNative position={'bottomright'} icon={blackIcon} />

      </MapComponent>


    );
  }
}

const LeafletMap = props =>  (
  <MapContext.Consumer>
    {({ setMap }) => <Map {...props} setMap={setMap} />}
  </MapContext.Consumer>
)

export default LeafletMap