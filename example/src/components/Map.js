import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { MapContainer, TileLayer } from 'react-leaflet'
import { EsriLeafletGeoSearch } from '../../../components/esrileaflet'

const Map = props => {

   const sidebarTab = useSelector(state => state.sidebarTab)

   const map = useMemo( () => {
      return  (
         <MapContainer 
            doubleClickZoom={false}
            id="mapId"
            zoom={8}
            center={{lat: 37.773972, lng: -122.431297}}
            whenCreated={props.setMap}>
   
            <TileLayer
               url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
               attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri" />

            {sidebarTab === 'esrileaflet' && <>
               <EsriLeafletLayersControl />
               <EsriLeafletGeoSearch useMapBounds={false} />
            </>}
   
         </MapContainer>
      )
   }, [sidebarTab])

   return  map

}

export default Map