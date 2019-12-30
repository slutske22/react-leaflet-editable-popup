import React from 'react'
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet'
import Popup from './EditablePopup'

const markerRef = React.createRef()
const markerRef2 = React.createRef()
 
class Map extends React.Component{


   placeRandomMarker = () => {
      const bounds = this.refs.map.leafletElement.getBounds()
      console.log(this.refs.marker.leafletElement)
   }

   render(){
      return (
         <LeafletMap id="mapId"  zoom={10} center={[32.96176, -117.03529]} ref={"map"}  >

            <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri' />

            <Marker position={[32.96176, -117.03529]} ref={markerRef} >
               <Popup editable removable source={markerRef}>
                  This popup should be totally editable
               </Popup>
            </Marker>

            <Marker position={[32.86176, -117.03529]} ref={markerRef2}>
               <Popup editable removable source={markerRef2}>
                  This popup should be totally editable
               </Popup>
            </Marker>

            <button id="placeRandomMarkerButton" onClick={ this.placeRandomMarker }>Place a Random Marker</button>   

         </LeafletMap>


      )
   }


}

export default Map