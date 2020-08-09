import React, { useMemo } from 'react'
import { MapContainer, TileLayer, ScaleControl, LayersControl, FeatureGroup, Marker } from 'react-leaflet'

const Map = props => {

   const map = useMemo( () => {
      return  (
         <MapContainer 
            doubleClickZoom={false}
            id="mapId"
            zoom={8}
            center={{lat: 57.8817, lng: -154.4253}}
            whenCreated={props.setMap}>
   
            <TileLayer
               url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
               attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri" />

            <ScaleControl />

            <LayersControl>
               <LayersControl.Overlay name="Marker Overlay">
                  <FeatureGroup>
                     <Marker position={{lat: 57.8817, lng: -154.4253}} />
                  </FeatureGroup>
               </LayersControl.Overlay>
            </LayersControl>
   
         </MapContainer>
      )
   }, [])

   return  map

}

export default Map