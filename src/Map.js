import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet'
import EditablePopup from './EditablePopup'

class Map extends React.Component{


   placeRandomMarker = () => {
      const bounds = this.refs.map.leafletElement.getBounds()
      console.log(bounds)
   }

   render(){
      return (
         <LeafletMap id="mapId"  zoom={10} center={[32.96176, -117.03529]} ref={"map"}  >

            <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri' />

            <Marker position={[32.96176, -117.03529]}>
               <EditablePopup editable removable>
                  This popup should be totally editable
               </EditablePopup>
            </Marker>

            <Marker position={[32.86176, -117.03529]}>
               <Popup>
                  This popup should be totally editable
               </Popup>
            </Marker>

            <button id="placeRandomMarkerButton" onClick={ this.placeRandomMarker }>Place a Random Marker</button>   

         </LeafletMap>


      )
   }


}

export default Map