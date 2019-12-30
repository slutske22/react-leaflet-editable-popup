import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'

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

            <button id="placeRandomMarkerButton" onClick={ this.placeRandomMarker }>Place a Random Marker</button>   

         </LeafletMap>


      )
   }


}

export default Map